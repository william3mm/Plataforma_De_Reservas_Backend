"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const User_js_1 = __importDefault(require("../models/User.js"));
const Service_js_1 = __importDefault(require("../models/Service.js"));
const Reservation_js_1 = __importDefault(require("../models/Reservation.js"));
const database_js_1 = __importDefault(require("../config/database.js"));
const models = [User_js_1.default, Service_js_1.default, Reservation_js_1.default];
exports.sequelize = new sequelize_1.Sequelize(database_js_1.default);
models.forEach((model) => model.initModel(exports.sequelize));
models.forEach((model) => {
    if ("associate" in model) {
        model.associate(exports.sequelize.models);
    }
});
