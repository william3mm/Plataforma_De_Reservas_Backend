import { Request, Response } from "express";
import login from "../service/Auth_Service";

export default class AuthController {
  static async login(req: Request, res: Response) {
    const { emailOrNif, senha } = req.body;

    try {
      const result = await login(emailOrNif, senha);
      return res.json(result);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }
}
