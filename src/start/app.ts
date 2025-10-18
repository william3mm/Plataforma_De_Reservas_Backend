import "../database/Database.js";
import express from "express";
import cors from "cors";
import User_Routes from "../routes/User_Routes/create.js";
import Auth_Routes from "../routes/Auth_Routes/login.js";
import Services_Routes from "../routes/Services_Routes/index.js";
import Reservation_Routes from "../routes/Reservation_Routes/index.js";

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
    this.app.use(
      cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
      })
    );
  }

  Routes() {
    //this.app.use("/services/", Routes.Service_Routes);
    this.app.use("/register", User_Routes);
    this.app.use("/auth/login", Auth_Routes);
    this.app.use("/services", Services_Routes);
    this.app.use("/reservations", Reservation_Routes);
  }
}

export default new App().app;
