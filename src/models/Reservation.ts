kimport * as SequelizePackage from "sequelize";
import * as DataTypes from "sequelize";
import { ReservationAttributes } from "../interfaces/Reservation.js";
import { Model, InferAttributes, InferCreationAttributes } from "sequelize";

type SequelizeInstance = SequelizePackage.Sequelize;

export default class Reservation
  extends Model<
    InferAttributes<Reservation>,
    InferCreationAttributes<Reservation>
  >
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
    (this as any).belongsTo(models.User, {
      foreignKey: "clienteId",
      as: "cliente",
    });
    (this as any).belongsTo(models.Service, {
      foreignKey: "servicoId",
      as: "servico",
    });
  }

  static initModel(sequelize: SequelizeInstance) {
    (Reservation as any).init(
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
}import * as SequelizePackage from "sequelize";
import * as DataTypes from "sequelize";
import { ReservationAttributes } from "../interfaces/Reservation.js";
import { Model, InferAttributes, InferCreationAttributes } from "sequelize";

type SequelizeInstance = SequelizePackage.Sequelize;

export default class Reservation
  extends Model<
    InferAttributes<Reservation>,
    InferCreationAttributes<Reservation>
  >
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
    (this as any).belongsTo(models.User, {
      foreignKey: "clienteId",
      as: "cliente",
    });
    (this as any).belongsTo(models.Service, {
      foreignKey: "servicoId",
      as: "servico",
    });
  }

  static initModel(sequelize: SequelizeInstance) {
    (Reservation as any).init(
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

