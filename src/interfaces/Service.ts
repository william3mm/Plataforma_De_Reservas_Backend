export interface ServiceAttributes {
  id?: number;
  nome: string;
  descricao: string;
  preco: number;
  prestadorId: number;
  createdAt?: Date;
  updatedAt?: Date;
}
