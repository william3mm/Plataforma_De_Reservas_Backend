"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = login;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_js_1 = __importDefault(require("../models/User.js"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const env_js_1 = __importDefault(require("../config/env.js"));
async function login(emailOrNif, senha) {
    if (!emailOrNif || !senha) {
        throw new Error("Todos os campos para login são obrigatórios");
    }
    const where = emailOrNif.includes("@")
        ? { email: emailOrNif }
        : { nif: emailOrNif };
    const user = await User_js_1.default.findOne({ where });
    if (!user) {
        throw new Error("Usuário não encontrado");
    }
    const senhaValida = await bcrypt_1.default.compare(senha, user.senha);
    if (!senhaValida) {
        throw new Error("Senha inválida");
    }
    const payload = { id: user.id, tipo: user.tipo };
    //@ts-ignore
    const token = jsonwebtoken_1.default.sign(payload, env_js_1.default.JWT_SECRET, {
        expiresIn: env_js_1.default.TOKEN_EXPIRATION_USUARIO || "1d",
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
