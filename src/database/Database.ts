// Exemplo: src/database/index.ts (ou onde você inicializa o Sequelize)
import { Sequelize } from "sequelize";
import User from "../models/User";
import Service from "../models/Service";
import databaseconfig from "../config/database";

const models = [User, Service];

export const sequelize = new Sequelize(databaseconfig);

models.forEach((model) => model.initModel(sequelize));
