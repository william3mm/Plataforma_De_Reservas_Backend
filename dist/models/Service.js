"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Service extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.User, { foreignKey: "prestadorId", as: "prestador" });
    }
    static initModel(sequelize) {
        Service.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            nome: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            descricao: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
            },
            preco: {
                type: sequelize_1.DataTypes.DECIMAL,
                allowNull: false,
                validate: {
                    min: 1,
                },
            },
            prestadorId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "User",
                    key: "id",
                },
                onDelete: "CASCADE",
            },
            createdAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                field: "created_at",
            },
            updatedAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                field: "updated_at",
            },
        }, {
            sequelize,
            tableName: "services",
            modelName: "Service",
            timestamps: true,
        });
    }
}
exports.default = Service;
