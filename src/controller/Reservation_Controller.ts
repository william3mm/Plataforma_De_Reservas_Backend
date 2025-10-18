import Reservation from "../models/Reservation.js";

import User from "../models/User.js";

import Service from "../models/Service.js";

import checkCliente from "../validator/checkCliente.js";

export default class ReservationController {
  static async create(req: any, res: any) {
    try {
      checkCliente(req);

      const { servicoId } = req.body;

      const clienteId = req.userID;

      const servico = await Service.findByPk(servicoId);

      if (!servico) {
        return res.status(404).json({ message: "Serviço não encontrado" });
      }

      const cliente = await User.findByPk(clienteId);
      const prestador = await User.findByPk(servico.prestadorId);

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

      const reserva = await Reservation.create({
        clienteId,
        servicoId,
        valor: servico.preco,
        status: "CONFIRMADA",
      });

      return res.status(201).json({ data: reserva });
    } catch (error: any) {
      console.error("Erro ao criar reserva:", error);
      return res
        .status(500)
        .json({ message: error.message || "Erro interno do servidor" });
    }
  }

  static async list(req: any, res: any) {
    try {
      const userId = req.userID;
      const tipo = req.tipo;

      let where: any = {};

      if (tipo === "CLIENTE") {
        where.clienteId = userId;
      } else if (tipo === "PRESTADOR") {
        const servicos = await Service.findAll({
          where: { prestadorId: userId },
        });
        where.servicoId = servicos.map((servico: any) => servico.id);
      }

      const reservas = await Reservation.findAll({ where });
      return res.json({ data: reservas });
    } catch (error: any) {
      console.error("Erro ao listar reservas:", error);
      return res
        .status(500)
        .json({ message: error.message || "Erro interno do servidor" });
    }
  }

  static async cancel(req: any, res: any) {
    try {
      checkCliente(req);

      const { reservaId } = req.body;

      const clienteId = req.userID;

      const reserva = await Reservation.findByPk(reservaId);

      if (!reserva) {
        return res.status(404).json({ message: "Reserva não encontrada" });
      }

      // We check if the client is the one who have created the reservation

      if (reserva.clienteId !== clienteId) {
        return res.status(403).json({
          message: "Você não tem permissão para cancelar esta reserva",
        });
      }

      const cliente = await User.findByPk(clienteId);

      const prestador = await User.findByPk(
        reserva.servicoId
          ? (
              await Service.findByPk(reserva.servicoId)
            )?.prestadorId
          : undefined
      );

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
    } catch (error: any) {
      console.error("Erro ao cancelar reserva:", error);
      return res
        .status(500)
        .json({ message: error.message || "Erro interno do servidor" });
    }
  }
}
