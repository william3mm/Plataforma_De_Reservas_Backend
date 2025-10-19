"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Service_js_1 = __importDefault(require("../models/Service.js"));
const User_js_1 = __importDefault(require("../models/User.js"));
const checkPrestador_js_1 = __importDefault(require("../validator/checkPrestador.js"));
// Função de guarda de tipo para erros (pode ser reutilizada)
function isErrorWithMessage(error) {
    return (typeof error === "object" &&
        error !== null &&
        "message" in error &&
        typeof error.message === "string");
}
class ServiceController {
    // Usamos AuthRequest em vez de Request
    static async create(req, res) {
        try {
            // O erro de 'checkPrestador' foi corrigido usando AuthRequest
            (0, checkPrestador_js_1.default)(req);
            const { nome, descricao, preco } = req.body;
            if (!nome || !descricao || !preco) {
                throw new Error("Todos os campos são obrigatórios");
            }
            const prestadorId = req.userID;
            const service = await Service_js_1.default.create({
                nome,
                descricao,
                preco,
                prestadorId,
            });
            return res.status(201).json({ data: service });
        }
        catch (error) {
            // Usamos a função de guarda para tratar o erro com segurança
            const message = isErrorWithMessage(error)
                ? error.message
                : "Erro desconhecido";
            return res.status(400).json({ message });
        }
    }
    // Repetir a correção para update
    static async update(req, res) {
        try {
            (0, checkPrestador_js_1.default)(req);
            const { id } = req.params;
            const { nome, descricao, preco } = req.body;
            const prestadorId = req.userID;
            if (!nome && !descricao && !preco) {
                return res
                    .status(400)
                    .json("É necessário fornecer algum dado para actualizar");
            }
            if (preco <= 0) {
                return res
                    .status(400)
                    .json("O valor do campo preço não pode ser negativo");
            }
            const service = await Service_js_1.default.findOne({ where: { id, prestadorId } });
            if (!service)
                throw new Error("Serviço não encontrado ou sem permissão");
            await service.update({ nome, descricao, preco });
            return res.json(service);
        }
        catch (error) {
            const message = isErrorWithMessage(error)
                ? error.message
                : "Erro desconhecido";
            return res.status(400).json({ message });
        }
    }
    // Repetir a correção para delete
    static async delete(req, res) {
        try {
            (0, checkPrestador_js_1.default)(req);
            const { id } = req.params;
            const prestadorId = req.userID;
            const service = await Service_js_1.default.findOne({ where: { id, prestadorId } });
            if (!service)
                throw new Error("Serviço não encontrado ou sem permissão");
            await service.destroy();
            return res.json({ message: "Serviço removido com sucesso" });
        }
        catch (error) {
            const message = isErrorWithMessage(error)
                ? error.message
                : "Erro desconhecido";
            return res.status(400).json({ message });
        }
    }
    static async list(req, res) {
        try {
            const id = req.userID;
            const tipo = req.tipo;
            // Let's check if the user is a client or a worker
            const user = await User_js_1.default.findOne({ where: { id, tipo } });
            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado" });
            }
            const services = await Service_js_1.default.findAll({
                include: [
                    {
                        model: User_js_1.default,
                        as: "prestador",
                        attributes: ["id", "nome", "email"],
                    },
                ],
            });
            return res.status(200).json({ services });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
    }
    static async myservices(req, res) {
        try {
            (0, checkPrestador_js_1.default)(req);
            const id = req.userID;
            const services = await Service_js_1.default.findAll({
                where: { prestadorId: id },
                attributes: ["id", "nome", "preco", "descricao"],
            });
            if (!services) {
                return res.status(400).json({ message: "Nenhum serviço criado" });
            }
            return res.status(200).json({ services });
        }
        catch (error) { }
    }
}
exports.default = ServiceController;
