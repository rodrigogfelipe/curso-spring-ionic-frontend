import { Injectable } from "@angular/core";
import { LocalUser } from "../models/local_user";
import { STORAGE_KEYS } from "../config/storage_keys.config";

@Injectable()
export class StorageService {
    /*Pegar a chave com LocalUser STORAGE_KEYS.localUser*/ 
    getLocalUser() : LocalUser {
    let usr = localStorage.getItem(STORAGE_KEYS.localUser);
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
    localStorage.removeItem(STORAGE_KEYS.localUser);
}
    else {
        localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));

        }
    }

}