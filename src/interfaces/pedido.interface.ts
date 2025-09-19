import { Produto } from './produto.interface';

export interface Pedido {
  pedido_id: number;
  produtos: Produto[];
}
