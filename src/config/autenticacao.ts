import authMiddleware from "../middlewares/Auth_Middleware.js";

function verificaEnv(nomeDaEnv: string) {
  const valor = process.env[nomeDaEnv];

  if (!valor) throw new Error(`VARIÁVEL DE AMBIENTE ${nomeDaEnv} NÃO DEFINIDA`);

  return valor;
}

export const autenticaUsuario = authMiddleware(verificaEnv(""));
