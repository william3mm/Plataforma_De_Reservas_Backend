import login from "../service/Auth_Service.js";

export default class AuthController {
  static async login(req: any, res: any) {
    const { emailOrNif, senha } = req.body;

    try {
      const result = await login(emailOrNif, senha);
      return res.json(result);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }
}
