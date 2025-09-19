import { Caixa } from './caixa.interface';

export interface PedidoProcessado {
  pedido_id: number;
  caixas: Caixa[];
}
