import { UserType } from "../types/User.js";

export interface UserAttributes {
  id?: number;
  nome: string;
  nif: string;
  email: string;
  senha: string;
  saldo: number;
  tipo: UserType;
}
