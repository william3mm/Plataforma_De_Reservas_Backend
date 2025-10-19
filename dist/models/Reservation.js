"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Reservation extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.User, { foreignKey: "clienteId", as: "cliente" });
        this.belongsTo(models.Service, { foreignKey: "servicoId", as: "servico" });
    }
    static initModel(sequelize) {
        Reservation.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            clienteId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "User",
                    key: "id",
                },
                onDelete: "CASCADE",
            },
            servicoId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "Service",
                    key: "id",
                },
                onDelete: "CASCADE",
            },
            valor: {
                type: sequelize_1.DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            status: {
                type: sequelize_1.DataTypes.ENUM("PENDENTE", "CONFIRMADA", "CANCELADA"),
                defaultValue: "PENDENTE",
            },
        }, {
            sequelize,
            tableName: "reservations",
            modelName: "Reservation",
            timestamps: true,
        });
    }
}
exports.default = Reservation;
