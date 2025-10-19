import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { JwtPayload } from "../interfaces/Jwt_Payload.js";

export default function authMiddleware(secret: string) {
  return (req: any, res: any, next: any) => {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({ success: false, message: "SEM PERMISSÃO" });
    }

    const token = authorization.split(" ")[1];

    try {
      const dados = jwt.verify(token, secret) as JwtPayload;
      req.userID = dados.id;
      req.tipo = dados.tipo;
      next();
    } catch (error: any) {
      return res
        .status(401)
        .json({ success: false, message: error.message || "TOKEN INVÁLIDO" });
    }
  };
}
