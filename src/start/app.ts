import "../database/Database.js";
import express from "express";
import User_Routes from "../routes/User_Routes/create.js";
import Auth_Routes from "../routes/Auth_Routes/login.js";
import Services_Routes from "../routes/Services_Routes/index.js";
class App {
  app: any;
  constructor() {
    this.app = express();
    this.Middlewares();
    this.Routes();
  }

  Middlewares() {
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use(express.json());
  }

  Routes() {
    //this.app.use("/services/", Routes.Service_Routes);
    this.app.use("/register", User_Routes);
    this.app.use("/login", Auth_Routes);
    this.app.use("/services", Services_Routes);
  }
}

export default new App().app;
