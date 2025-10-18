export interface ReservationAttributes {
  id?: number;
  clienteId: number;
  servicoId: number;
  valor: number;
  status: "PENDENTE" | "CONFIRMADA" | "CANCELADA";
  createdAt?: Date;
  updatedAt?: Date;
}
