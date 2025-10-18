import { Model, DataTypes, Sequelize as SequelizeInstance } from "sequelize";
import { ReservationAttributes } from "../interfaces/Reservation.js";

export default class Reservation
  extends Model<ReservationAttributes, Partial<ReservationAttributes>>
  implements ReservationAttributes
{
  public id!: number;
  public clienteId!: number;
  public servicoId!: number;
  public valor!: number;
  public status!: "PENDENTE" | "CONFIRMADA" | "CANCELADA";

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
    this.belongsTo(models.User, { as: "cliente", foreignKey: "clienteId" });
    this.belongsTo(models.Service, { as: "servico", foreignKey: "servicoId" });
  }

  static initModel(sequelize: SequelizeInstance) {
    Reservation.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        clienteId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "User",
            key: "id",
          },
          onDelete: "CASCADE",
        },
        servicoId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "Service",
            key: "id",
          },
          onDelete: "CASCADE",
        },
        valor: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        status: {
          type: DataTypes.ENUM("PENDENTE", "CONFIRMADA", "CANCELADA"),
          defaultValue: "PENDENTE",
        },
      },
      {
        sequelize,
        tableName: "reservations",
        modelName: "Reservation",
        timestamps: true,
      }
    );
  }
}
