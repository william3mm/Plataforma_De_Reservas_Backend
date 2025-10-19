"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_js_1 = require("../types/User.js");
class User extends sequelize_1.Model {
    isPasswordValid(password) {
        return bcrypt_1.default.compare(password, this.senha);
    }
    static initModel(sequelize) {
        User.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            nome: {
                type: sequelize_1.DataTypes.STRING(100),
                allowNull: false,
            },
            nif: {
                type: sequelize_1.DataTypes.STRING(20),
                allowNull: false,
                unique: true,
            },
            email: {
                type: sequelize_1.DataTypes.STRING(100),
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: {
                        msg: "EMAIL INVÁLIDO",
                    },
                },
            },
            senha: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
            },
            saldo: {
                type: sequelize_1.DataTypes.DECIMAL(10, 2),
                defaultValue: 0.0,
                allowNull: false,
            },
            tipo: {
                type: sequelize_1.DataTypes.ENUM(User_js_1.UserType.CLIENTE, User_js_1.UserType.PRESTADOR),
                allowNull: false,
            },
        }, {
            sequelize,
            tableName: "users",
            modelName: "User",
            hooks: {
                beforeCreate: async (user) => {
                    user.senha = await bcrypt_1.default.hash(user.senha, 8);
                },
                beforeUpdate: async (user) => {
                    if (user.changed("senha")) {
                        user.senha = await bcrypt_1.default.hash(user.senha, 8);
                    }
                },
            },
        });
        return User;
    }
}
exports.default = User;
