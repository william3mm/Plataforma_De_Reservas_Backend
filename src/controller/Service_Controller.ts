import Service from "../models/Service.js";
import User from "../models/User.js";
import checkPrestador from "../validator/checkPrestador.js";

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
  static async create(req: any, res: any) {
    try {
      checkPrestador(req);

      const { nome, descricao, preco } = req.body;

      if (!nome || !descricao || !preco) {
        throw new Error("Todos os campos são obrigatórios");
      }

      const prestadorId = req.userID;

      const service = await (Service as any).create({
        nome,
        descricao,
        preco,
        prestadorId,
      });
      return res.status(201).json({ data: service });
    } catch (error) {
      const message = isErrorWithMessage(error)
        ? error.message
        : "Erro desconhecido";
      return res.status(400).json({ message });
    }
  }

  static async update(req: any, res: any) {
    try {
      checkPrestador(req);

      const { id } = req.params;
      const { nome, descricao, preco } = req.body;
      const prestadorId = req.userID;

      if (!nome && !descricao && !preco) {
        return res
          .status(400)
          .json("É necessário fornecer algum dado para actualizar");
      }

      if (preco <= 0) {
        return res
          .status(400)
          .json("O valor do campo preço não pode ser negativo");
      }

      const service = await (Service as any).findOne({
        where: { id, prestadorId },
      });

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

  static async delete(req: any, res: any) {
    try {
      checkPrestador(req);

      const { id } = req.params;
      const prestadorId = req.userID;

      const service = await (Service as any).findOne({
        where: { id, prestadorId },
      });

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

  static async list(req: any, res: any) {
    try {
      const id = req.userID;
      const tipo = req.tipo;

      const user = await (User as any).findOne({ where: { id, tipo } });

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      const services = await (Service as any).findAll({
        include: [
          {
            model: User,
            as: "prestador",
            attributes: ["id", "nome", "email"],
          },
        ],
      });

      return res.status(200).json({ services });
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  static async myservices(req: any, res: any) {
    try {
      checkPrestador(req);

      const id = req.userID;
      const services = await (Service as any).findAll({
        where: { prestadorId: id },
        attributes: ["id", "nome", "preco", "descricao"],
      });

      if (!services) {
        return res.status(400).json({ message: "Nenhum serviço criado" });
      }

      return res.status(200).json({ services });
    } catch (error) {}
  }
}
