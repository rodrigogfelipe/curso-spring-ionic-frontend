import { Injectable } from "@angular/core";
import { StorageService } from "../storage.service";
import { Cart } from "../../models/cart";
import { ProdutoDTO } from "../../models/produto.dto";

@Injectable()
export class CartService {

    constructor(public storage: StorageService) {
}

    /*createOrClearCar para criar a carrinho vazio */
    createOrClearCart() : Cart {
        let cart: Cart = {items: []};
        this.storage.setCart(cart);
        return cart;
    }
    /*getCart */
    getCart() : Cart {
        let cart: Cart = this.storage.getCart();
        if (cart == null) {
        cart = this.createOrClearCart();
    }
        return cart;


    }

    /*addProduto adicinando o produto no carrinho*/ 
    addProduto(produto: ProdutoDTO) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if (position == -1) {
            cart.items.push({quantidade: 1, produto: produto});
    }
        this.storage.setCart(cart);
        return cart;
    }
    /**Remover os produtos */
    removeProduto(produto: ProdutoDTO) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if (position != -1) {
            cart.items.splice(position, 1);
    }

        this.storage.setCart(cart);
        return cart;
    }
    /**imcrementar produtos em quantidades */
    increaseQuantity(produto: ProdutoDTO) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if (position != -1) {
            cart.items[position].quantidade++;

    }

        this.storage.setCart(cart);
        return cart;


    }
     /**decrementar produtos em quantidades */
    decreaseQuantity(produto: ProdutoDTO) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if (position != -1) {
            cart.items[position].quantidade--;
        if (cart.items[position].quantidade < 1) {
            cart = this.removeProduto(produto);

        }
    }
        this.storage.setCart(cart);
        return cart;
}
    /**Calcular o total dos produtos que estão no carrinho */
    total() : number {
        let cart = this.getCart();
        let sum = 0;
        for (var i=0; i<cart.items.length; i++) {
             sum += cart.items[i].produto.preco * cart.items[i].quantidade;
    }
        return sum;


    }
}