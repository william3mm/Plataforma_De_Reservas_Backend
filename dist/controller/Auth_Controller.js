"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_js_1 = __importDefault(require("../models/User.js"));
const Auth_Service_js_1 = __importDefault(require("../service/Auth_Service.js"));
class AuthController {
    static async login(req, res) {
        const { emailOrNif, senha } = req.body;
        try {
            const result = await (0, Auth_Service_js_1.default)(emailOrNif, senha);
            return res.json(result);
        }
        catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }
    static async me(req, res) {
        try {
            const userId = req.userID;
            const user = await User_js_1.default.findByPk(userId, {
                attributes: ["id", "nome", "email", "tipo", "saldo"],
            });
            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado" });
            }
            return res.json({ user });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
    }
}
exports.default = AuthController;
