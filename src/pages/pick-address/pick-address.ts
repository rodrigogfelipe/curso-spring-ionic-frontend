import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';
import { StorageService } from '../../services/storage.service';
import { ClienteService } from '../../services/domain/cliente.service';
import { PedidoDTO } from '../../models/pedido.dto';
import { CartService } from '../../services/domain/cat.service';


@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
/**Em PickAddressPage, atualizar o carregamento dos endereços do cliente logado  */
export class PickAddressPage {

  items: EnderecoDTO[];
  pedido: PedidoDTO;

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public storage: StorageService,
      public clienteService: ClienteService,
      public cartService: CartService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
        this.clienteService.findByEmail(localUser.email)
      .subscribe(response => {
          this.items = response['enderecos'];

          let cart = this.cartService.getCart();
            this.pedido = {
              cliente: {id: response['id']},
              enderecoDeEntrega: null,
              pagamento: null,
              itens : cart.items.map(x => {return {quantidade: x.quantidade, produto: {id: x.produto.id}}})

        }
    },
      error => {
      if (error.status == 403) {
        this.navCtrl.setRoot('HomePage');

          }

        });

    }

      else {
        this.navCtrl.setRoot('HomePage');

    }

  }
  /**Em PaymentPage, no método nextPage, mostrar o pedido no console  */
  nextPage(item: EnderecoDTO) {
    this.pedido.enderecoDeEntrega = {id: item.id};
    this.navCtrl.push('PaymentPage', {pedido: this.pedido}); /**Em PickAddressPage, fazer a navegação para PaymentPage  */
  }

}

  
