export default function checkPrestador(req: Request) {
  // @ts-ignore
  if (req.tipo !== "PRESTADOR") {
    throw new Error(
      "Acesso negado: apenas prestadores podem executar esta ação"
    );
  }
}
