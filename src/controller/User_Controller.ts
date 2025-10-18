import { Request, Response } from "express";
import { Op } from "sequelize";
import bcrypt from "bcrypt";
import User from "../models/User";
import { UserType } from "../types/User";

export default class UserController {
  static async create(req: Request, res: Response) {
    try {
      const { nome, email, nif, senha, tipo } = req.body;

      if (!nome || !email || !nif || !senha || !tipo) {
        return res
          .status(400)
          .json({ message: "Todos os campos são obrigatórios" });
      }

      if (![UserType.CLIENTE, UserType.PRESTADOR].includes(tipo)) {
        return res.status(400).json({ message: "Tipo de usuário inválido" });
      }

      const existingUser = await User.findOne({
        where: { [Op.or]: [{ email }, { nif }] },
      });

      if (existingUser) {
        return res.status(400).json({ message: "Email ou NIF já cadastrado" });
      }

      const user = await User.create({
        nome,
        email,
        nif,
        senha,
        tipo,
        saldo: 0,
      });

      return res.status(201).json({
        data: {
          id: user.id,
          nome: user.nome,
          email: user.email,
          nif: user.nif,
          tipo: user.tipo,
          saldo: user.saldo,
        },
      });
    } catch (error: any) {
      console.error("Erro ao criar usuário:", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
}
