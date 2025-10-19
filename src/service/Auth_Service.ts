import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import ENV from "../config/env.js";
import { JwtPayload } from "../interfaces/Jwt_Payload.js";

export default async function login(emailOrNif: string, senha: string) {
  if (!emailOrNif || !senha) {
    throw new Error("Todos os campos para login são obrigatórios");
  }
  const where = emailOrNif.includes("@")
    ? { email: emailOrNif }
    : { nif: emailOrNif };

  // CORREÇÃO: Usar (User as any) para resolver o erro TS2339
  const user = await (User as any).findOne({ where });

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  const senhaValida = await bcrypt.compare(senha, user.senha);

  if (!senhaValida) {
    throw new Error("Senha inválida");
  }

  const payload: JwtPayload = { id: user.id, tipo: user.tipo };

  //@ts-ignore
  const token = jwt.sign(payload, ENV.JWT_SECRET, {
    expiresIn: ENV.TOKEN_EXPIRATION_USUARIO || "1d",
  });

  return {
    id: user.id,
    nome: user.nome,
    email: user.email,
    nif: user.nif,
    tipo: user.tipo,
    saldo: user.saldo,
    token,
  };
}
