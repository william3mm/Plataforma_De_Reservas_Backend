import Service from "../models/Service";
import checkPrestador from "../validator/checkPrestador";
import { Response } from "express";

// Função de guarda de tipo para erros (pode ser reutilizada)
function isErrorWithMessage(error: unknown): error is { message: string } {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as { message: unknown }).message === "string"
  );
}

export default class ServiceController {
  // Usamos AuthRequest em vez de Request
  static async create(req: any, res: Response) {
    try {
      // O erro de 'checkPrestador' foi corrigido usando AuthRequest
      checkPrestador(req);

      const { nome, descricao, preco } = req.body;

      if (!nome || !descricao || !preco) {
        throw new Error("Todos os campos são obrigatórios");
      }

      // req.userID agora é reconhecido pelo TypeScript!
      const prestadorId = req.userID;

      const service = await Service.create({
        nome,
        descricao,
        preco,
        prestadorId,
      });
      return res.status(201).json(service);
    } catch (error) {
      // Usamos a função de guarda para tratar o erro com segurança
      const message = isErrorWithMessage(error)
        ? error.message
        : "Erro desconhecido";
      return res.status(400).json({ message });
    }
  }

  // Repetir a correção para update
  static async update(req: any, res: Response) {
    try {
      checkPrestador(req);

      const { id } = req.params;
      const { nome, descricao, preco } = req.body;
      const prestadorId = req.userID;

      const service = await Service.findOne({ where: { id, prestadorId } });

      if (!service) throw new Error("Serviço não encontrado ou sem permissão");

      await service.update({ nome, descricao, preco });

      return res.json(service);
    } catch (error) {
      const message = isErrorWithMessage(error)
        ? error.message
        : "Erro desconhecido";
      return res.status(400).json({ message });
    }
  }

  // Repetir a correção para delete
  static async delete(req: any, res: Response) {
    try {
      checkPrestador(req);

      const { id } = req.params;
      const prestadorId = req.userID;

      const service = await Service.findOne({ where: { id, prestadorId } });

      if (!service) throw new Error("Serviço não encontrado ou sem permissão");

      await service.destroy();

      return res.json({ message: "Serviço removido com sucesso" });
    } catch (error) {
      const message = isErrorWithMessage(error)
        ? error.message
        : "Erro desconhecido";
      return res.status(400).json({ message });
    }
  }
}
