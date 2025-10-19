"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = authMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authMiddleware(secret) {
    return (req, res, next) => {
        const authorization = req.headers.authorization;
        if (!authorization) {
            return res.status(401).json({ success: false, message: "SEM PERMISSÃO" });
        }
        const token = authorization.split(" ")[1];
        try {
            const dados = jsonwebtoken_1.default.verify(token, secret);
            req.userID = dados.id;
            req.tipo = dados.tipo;
            next();
        }
        catch (error) {
            return res
                .status(401)
                .json({ success: false, message: error.message || "TOKEN INVÁLIDO" });
        }
    };
}
