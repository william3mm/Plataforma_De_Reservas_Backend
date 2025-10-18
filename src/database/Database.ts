import { Sequelize } from "sequelize";
import User from "../models/User.js";
import Service from "../models/Service.js";
import Reservation from "../models/Reservation.js";
import databaseconfig from "../config/database.js";

const models = [User, Service, Reservation];

export const sequelize = new Sequelize(databaseconfig);

models.forEach((model) => model.initModel(sequelize));

models.forEach((model) => {
  if ("associate" in model) {
    model.associate(sequelize.models);
  }
});
