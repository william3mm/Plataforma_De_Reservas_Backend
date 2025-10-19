import * as SequelizePackage from "sequelize";
import { ServiceAttributes } from "../interfaces/Service.js";

const { DataTypes, Model, Sequelize } = SequelizePackage;
type SequelizeInstance = SequelizePackage.Sequelize;

export default class Service
  extends Model<ServiceAttributes, Partial<ServiceAttributes>>
  implements ServiceAttributes
{
  static associate(models: any) {
    (this as any).belongsTo(models.User, {
      foreignKey: "prestadorId",
      as: "prestador",
    });
  }
  public id!: number;
  public nome!: string;
  public descricao!: string;
  public preco!: number;
  public prestadorId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initModel(sequelize: SequelizeInstance) {
    (Service as any).init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        nome: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        descricao: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        preco: {
          type: DataTypes.DECIMAL,
          allowNull: false,
          validate: {
            min: 1,
          },
        },
        prestadorId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "User",
            key: "id",
          },
          onDelete: "CASCADE",
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          field: "created_at",
        },

        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          field: "updated_at",
        },
      },

      {
        sequelize,
        tableName: "services",
        modelName: "Service",
        timestamps: true,
      }
    );
  }
}
