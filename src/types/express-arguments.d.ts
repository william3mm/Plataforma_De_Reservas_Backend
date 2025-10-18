declare module "express-serve-static-core" {
  interface Request {
    userID: number;
    tipo?: string;
  }
}
