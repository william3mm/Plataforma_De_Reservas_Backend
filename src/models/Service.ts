import { Model, DataTypes, Sequelize as SequelizeInstance } from "sequelize";
import { ServiceAttributes } from "../interfaces/Service";
import User from "./User";

export default class Service
  extends Model<ServiceAttributes, Partial<ServiceAttributes>>
  implements ServiceAttributes
{
  public id!: number;
  public nome!: string;
  public descricao!: string;
  public preco!: number;
  public prestadorId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initModel(sequelize: SequelizeInstance) {
    Service.init(
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
        },
        prestadorId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: User,
            key: "id",
          },
          onDelete: "CASCADE",
        },
      },
      {
        sequelize,
        tableName: "services",
        modelName: "Service",
      }
    );

    Service.belongsTo(User, { foreignKey: "prestadorId", as: "prestador" });
  }
}
