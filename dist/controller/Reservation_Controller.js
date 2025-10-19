"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Reservation_js_1 = __importDefault(require("../models/Reservation.js"));
const User_js_1 = __importDefault(require("../models/User.js"));
const Service_js_1 = __importDefault(require("../models/Service.js"));
const checkCliente_js_1 = __importDefault(require("../validator/checkCliente.js"));
class ReservationController {
    static async create(req, res) {
        try {
            (0, checkCliente_js_1.default)(req);
            const { servicoId } = req.body;
            const clienteId = req.userID;
            const servico = await Service_js_1.default.findByPk(servicoId);
            if (!servico) {
                return res.status(404).json({ message: "Serviço não encontrado" });
            }
            const cliente = await User_js_1.default.findByPk(clienteId);
            const prestador = await User_js_1.default.findByPk(servico.prestadorId);
            if (!cliente || !prestador) {
                return res
                    .status(404)
                    .json({ message: "Cliente ou prestador não encontrado" });
            }
            // We check the balance on the account of the client
            if (cliente.saldo < Number(servico.preco)) {
                return res.status(400).json({ message: "Saldo insuficiente" });
            }
            // We update the balance
            cliente.saldo -= Number(servico.preco);
            prestador.saldo += Number(servico.preco);
            await cliente.save();
            await prestador.save();
            // We now create the reservation
            const reserva = await Reservation_js_1.default.create({
                clienteId,
                servicoId,
                valor: servico.preco,
                status: "CONFIRMADA",
            });
            return res.status(201).json({ data: reserva });
        }
        catch (error) {
            console.error("Erro ao criar reserva:", error);
            return res
                .status(500)
                .json({ message: error.message || "Erro interno do servidor" });
        }
    }
    static async list(req, res) {
        try {
            const userId = req.userID;
            const tipo = req.tipo;
            let where = {};
            if (tipo === "CLIENTE") {
                where.clienteId = userId;
            }
            else if (tipo === "PRESTADOR") {
                const servicos = await Service_js_1.default.findAll({
                    where: { prestadorId: userId },
                });
                where.servicoId = servicos.map((servico) => servico.id);
            }
            const reservas = await Reservation_js_1.default.findAll({
                where,
                include: [
                    { model: User_js_1.default, as: "cliente", attributes: ["id", "nome", "email"] },
                    {
                        model: Service_js_1.default,
                        as: "servico",
                        attributes: ["id", "nome", "preco"],
                        include: [
                            {
                                model: User_js_1.default,
                                as: "prestador",
                                attributes: ["id", "nome", "email"],
                            },
                        ],
                    },
                ],
            });
            // 🚨 Transformamos no formato desejado
            // const formatted = reservas.map((r) => ({
            //   id: r.id,
            //   valor: r.valor,
            //   status: r.status,
            //   cliente: {
            //     id: r.cliente.id,
            //     nome: r.cliente.nome,
            //     email: r.cliente.email,
            //     nif: r.cliente.nif,
            //     tipo: r.cliente.tipo,
            //     saldo: r.cliente.saldo,
            //   },
            //   servico: {
            //     id: r.servico.id,
            //     nome: r.servico.nome,
            //     preco: r.servico.preco,
            //     prestador: {
            //       id: r.servico.prestador.id,
            //       nome: r.servico.prestador.nome,
            //       email: r.servico.prestador.email,
            //     },
            //   },
            // }));
            // return res.json({ data: formatted });
            return res.json({ data: reservas });
        }
        catch (error) {
            console.error("Erro ao listar reservas:", error);
            return res
                .status(500)
                .json({ message: error.message || "Erro interno do servidor" });
        }
    }
    static async cancel(req, res) {
        try {
            (0, checkCliente_js_1.default)(req);
            const { reservaId } = req.body;
            const clienteId = req.userID;
            const reserva = await Reservation_js_1.default.findByPk(reservaId);
            if (!reserva) {
                return res.status(404).json({ message: "Reserva não encontrada" });
            }
            // We check if the client is the one who have created the reservation
            if (reserva.clienteId !== clienteId) {
                return res.status(403).json({
                    message: "Você não tem permissão para cancelar esta reserva",
                });
            }
            const cliente = await User_js_1.default.findByPk(clienteId);
            const prestador = await User_js_1.default.findByPk(reserva.servicoId
                ? (await Service_js_1.default.findByPk(reserva.servicoId))?.prestadorId
                : undefined);
            if (!cliente || !prestador) {
                return res
                    .status(404)
                    .json({ message: "Cliente ou prestador não encontrado" });
            }
            // We give the money back to the client
            cliente.saldo += Number(reserva.valor);
            prestador.saldo -= Number(reserva.valor);
            await cliente.save();
            await prestador.save();
            // We update the status of the reservation
            reserva.status = "CANCELADA";
            await reserva.save();
            return res.json({
                message: "Reserva cancelada com sucesso",
                data: reserva,
            });
        }
        catch (error) {
            console.error("Erro ao cancelar reserva:", error);
            return res
                .status(500)
                .json({ message: error.message || "Erro interno do servidor" });
        }
    }
}
exports.default = ReservationController;
