"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = checkCliente;
function checkCliente(req) {
    if (req.tipo !== "CLIENTE") {
        throw new Error("Acesso negado: apenas clientes podem executar esta ação");
    }
}
