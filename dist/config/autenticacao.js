"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.autenticaUsuario = void 0;
const Auth_Middleware_js_1 = __importDefault(require("../middlewares/Auth_Middleware.js"));
function verificaEnv(nomeDaEnv) {
    const valor = process.env[nomeDaEnv];
    if (!valor)
        throw new Error(`VARIÁVEL DE AMBIENTE ${nomeDaEnv} NÃO DEFINIDA`);
    return valor;
}
exports.autenticaUsuario = (0, Auth_Middleware_js_1.default)(verificaEnv(""));
