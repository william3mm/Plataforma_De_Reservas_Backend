"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = checkPrestador;
function checkPrestador(req) {
    if (req.tipo !== "PRESTADOR") {
        throw new Error("Acesso negado: apenas prestadores podem executar esta ação");
    }
}
