import { Injectable } from "@angular/core";
import { LocalUser } from "../models/local_user";
import { STORAGE_KEYS } from "../config/storage_keys.config";
import { Cart } from "../models/cart";

@Injectable()
/**Salvando os dados do usuário logado no localStorage  */
export class StorageService {
    /*Pegar a chave com LocalUser STORAGE_KEYS.localUser*/ 
    getLocalUser() : LocalUser {
    let usr = localStorage.getItem(STORAGE_KEYS.localUser); /**Retorna o valor (string) correspondente à chave, ou null caso a chave não exista  */
    if (usr == null) {
    return null;
}
    else {
        return JSON.parse(usr);
    }
}
/*setLocalUser armazenar o valor da chave*/ 
setLocalUser(obj : LocalUser) {
    if (obj == null) {
    localStorage.removeItem(STORAGE_KEYS.localUser);/**Remove o item do localStorage, caso ele exista  */
}
    else {
        localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj)); /**Define um item no localStorage com a chave e valor dados  */

        }
    }
    /**, criar métodos para obter e salvar o carrinho em localStorage  */
    getCart() : Cart {
        let str = localStorage.getItem(STORAGE_KEYS.cart);
        if (str != null) {
            return JSON.parse(str);
    }
        else {
            return null;
        }


    }
    setCart(obj : Cart) {
        if (obj != null) {
        localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(obj));
    } 

        else {
            localStorage.removeItem(STORAGE_KEYS.cart);
        }


    }

}