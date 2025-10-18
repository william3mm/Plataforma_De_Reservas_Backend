import { Request } from "express";

export interface AuthRequest<
  P = { id: string },
  ResBody = any,
  ReqBody = { nome: string; descricao: string; preco: number },
  ReqQuery = any
> extends Request<P, ResBody, ReqBody, ReqQuery> {
  userID: number;
  tipo?: string;
}
