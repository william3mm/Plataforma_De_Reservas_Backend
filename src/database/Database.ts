import { Sequelize } from "sequelize";
import User from "../models/User.js";
import Service from "../models/Service.js";

import databaseconfig from "../config/database.js";

const models = [User, Service];

export const sequelize = new Sequelize(databaseconfig);

models.forEach((model) => model.initModel(sequelize));
