import * as SequelizePackage from "sequelize";
import type { Optional } from "sequelize";
import bcrypt from "bcrypt";
import { UserType } from "../types/User.js";
import { UserAttributes } from "../interfaces/User.js";

import { DataType } from "sequelize/types/data-types";
const { Model } = SequelizePackage;

export default class User
  extends Model<UserAttributes, Optional<UserAttributes, "id" | "saldo">>
  implements UserAttributes
{
  public id!: number;
  public nome!: string;
  public nif!: string;
  public email!: string;
  public senha!: string;
  public saldo!: number;
  public tipo!: UserType;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public isPasswordValid(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.senha);
  }

  static initModel(sequelize: SequelizePackage.Sequelize): typeof User {
    (User as any).init(
      {
        id: {
          type: SequelizePackage.DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        nome: {
          type: SequelizePackage.DataTypes.STRING(100),
          allowNull: false,
        },
        nif: {
          type: SequelizePackage.DataTypes.STRING(20),
          allowNull: false,
          unique: true,
        },
        email: {
          type: SequelizePackage.DataTypes.STRING(100),
          allowNull: false,
          unique: true,
          validate: {
            isEmail: {
              msg: "EMAIL INVÁLIDO",
            },
          },
        },
        senha: {
          type: SequelizePackage.DataTypes.STRING(255),
          allowNull: false,
        },
        saldo: {
          type: SequelizePackage.DataTypes.DECIMAL(10, 2),
          defaultValue: 0.0,
          allowNull: false,
        },
        tipo: {
          type: SequelizePackage.DataTypes.ENUM(
            UserType.CLIENTE,
            UserType.PRESTADOR
          ),
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "users",
        modelName: "User",
        hooks: {
          beforeCreate: async (user: User) => {
            user.senha = await bcrypt.hash(user.senha, 8);
          },
          beforeUpdate: async (user: User) => {
            if ((user as any).changed("senha")) {
              user.senha = await bcrypt.hash(user.senha, 8);
            }
          },
        },
      }
    );

    return User;
  }
}
