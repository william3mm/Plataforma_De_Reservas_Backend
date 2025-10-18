export default function checkCliente(req: any) {
  if (req.tipo !== "CLIENTE") {
    throw new Error("Acesso negado: apenas clientes podem executar esta ação");
  }
}
