import User from "../models/User.js";
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

  static async me(req: any, res: any) {
    try {
      const userId = req.userID;
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      console.log(user.nome);
      return res.json({
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
      console.error(error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
}
