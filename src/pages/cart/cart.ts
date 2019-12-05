import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartItem } from '../../models/cart-item';
import { CartService } from '../../services/domain/cat.service';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';
import { ProdutoDTO } from '../../models/produto.dto';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
    items: CartItem[];

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        public cartService: CartService,
        public produtoService: ProdutoService) {
}

  ionViewDidLoad() {
    let cart = this.cartService.getCart();
    this.items = cart.items;
    this.loadImageUrls();
}
/**Configuração do bucket para captura as imagens na amazon */
loadImageUrls() {
    for (var i=0; i<this.items.length; i++) {
    let item = this.items[i];
    this.produtoService.getSmallImageFromBucket(item.produto.id)
      .subscribe(response => {
        item.produto.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.produto.id}-small.jpg`;
  },

      error => {});
    }
  }  
  /**Remove os prosutos do carrinho */
  removeItem(produto: ProdutoDTO) {
    this.items = this.cartService.removeProduto(produto).items;


  }
/**incrementando a quantidade de produtos no carrinho */
  increaseQuantity(produto: ProdutoDTO) {
      this.items = this.cartService.increaseQuantity(produto).items;


  }
  /**Decrementado a quantidade de produtos no carrinho */
  decreaseQuantity(produto: ProdutoDTO) {
    this.items = this.cartService.decreaseQuantity(produto).items;


  }

/**Somando os valores dos produtos */
  total() : number {
      return this.cartService.total();


  }  
  /* implementar a função para continuar comprando */ 
  goOn() {
    this.navCtrl.setRoot('CategoriasPage');
    }

  checkout() {
      this.navCtrl.push('PickAddressPage');
  }
}

