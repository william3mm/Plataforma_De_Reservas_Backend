"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_js_1 = __importDefault(require("./app.js"));
try {
    app_js_1.default.listen(3004, () => console.log("ouvindo..."));
}
catch (err) {
    console.error("Erro ao iniciar o servidor:", err);
}
