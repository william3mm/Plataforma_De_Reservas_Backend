import dotenv from "dotenv";
import { Options } from "sequelize";

dotenv.config();

const databaseconfig: Options = {
  dialect: "mariadb",

  host: process.env.DATABASE_HOST!,

  port: Number(process.env.DATABASE_PORT),

  username: process.env.DATABASE_USERNAME!,

  password: process.env.DATABASE_PASSWORD!,

  database: process.env.DATABASE_NAME!,

  define: {
    timestamps: true,
  },

  dialectOptions: {
    timezone: "+01:00",
    connectTimeout: 10000,
  },

  timezone: "+01:00",
};

export default databaseconfig;
