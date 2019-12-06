import { ItemPedidoDTO } from "./item-pedido.dto";
import { RefDTO } from "./ref.dto";
import { PagamentoDTO } from "./pagameno.dto";

export interface PedidoDTO {
    cliente: RefDTO;
    enderecoDeEntrega: RefDTO;
    pagamento: PagamentoDTO;
    itens: ItemPedidoDTO[]; /**itens recebe um lista ItemPedidoDTO  */
}