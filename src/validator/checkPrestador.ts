export default function checkPrestador(req: any) {
  if (req.tipo !== "PRESTADOR") {
    throw new Error(
      "Acesso negado: apenas prestadores podem executar esta ação"
    );
  }
}
