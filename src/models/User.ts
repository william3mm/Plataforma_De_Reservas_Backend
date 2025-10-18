import { DataTypes, Model, Sequelize } from "sequelize";
import bcrypt from "bcrypt";
import { UserType } from "../types/User";
import { UserAttributes } from "../interfaces/User";

export default class User
  extends Model<UserAttributes>
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

  static initModel(sequelize: Sequelize): typeof User {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        nome: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        nif: {
          type: DataTypes.STRING(20),
          allowNull: false,
          unique: true,
        },
        email: {
          type: DataTypes.STRING(100),
          allowNull: false,
          unique: true,
          validate: {
            isEmail: {
              msg: "EMAIL INVÁLIDO",
            },
          },
        },
        senha: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        saldo: {
          type: DataTypes.DECIMAL(10, 2),
          defaultValue: 0.0,
          allowNull: false,
        },
        tipo: {
          type: DataTypes.ENUM(UserType.CLIENTE, UserType.PRESTADOR),
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
            if (user.changed("senha")) {
              user.senha = await bcrypt.hash(user.senha, 8);
            }
          },
        },
      }
    );

    return User;
  }
}
