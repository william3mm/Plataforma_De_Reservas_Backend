"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const User_js_1 = __importDefault(require("../models/User.js"));
const User_js_2 = require("../types/User.js");
class UserController {
    static async create(req, res) {
        try {
            const { nome, email, nif, senha, tipo } = req.body;
            if (!nome || !email || !nif || !senha || !tipo) {
                return res
                    .status(400)
                    .json({ message: "Todos os campos são obrigatórios" });
            }
            if (![User_js_2.UserType.CLIENTE, User_js_2.UserType.PRESTADOR].includes(tipo)) {
                return res.status(400).json({ message: "Tipo de usuário inválido" });
            }
            const existingUser = await User_js_1.default.findOne({
                where: { [sequelize_1.Op.or]: [{ email }, { nif }] },
            });
            if (existingUser) {
                return res.status(400).json({ message: "Email ou NIF já cadastrado" });
            }
            const user = await User_js_1.default.create({
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
        }
        catch (error) {
            console.error("Erro ao criar usuário:", error);
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
    }
}
exports.default = UserController;
