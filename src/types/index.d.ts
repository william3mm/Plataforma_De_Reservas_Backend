import "express";
import { UserType } from "../types/User"; // ajuste o caminho para seu enum

declare module "express-serve-static-core" {
  interface Request {
    userID?: number;
    tipo?: UserType | string;
  }
}
