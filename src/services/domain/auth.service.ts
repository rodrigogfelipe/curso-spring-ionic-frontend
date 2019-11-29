import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CredenciaisDTO } from "../../models/credencias.dto";
import { API_CONFIG } from "../../config/api.config";
import { LocalUser } from "../../models/local_user";
import { StorageService } from "../storage.service";

@Injectable()
export class AuthService {
    constructor(public http: HttpClient, public storage: StorageService) {

}
/*authenticate recebe como argumento CredenciasDTO return API login*/ 
authenticate(creds : CredenciaisDTO) {
    return this.http.post(
        `${API_CONFIG.baseUrl}/login`, 
    creds,
    {
         observe: 'response',
        responseType: 'text'
    });
}
/*Metado successfulLogin */ 
successfulLogin(authorizationValue : string) {
    let tok = authorizationValue.substring(7);
    let user : LocalUser = {
        token: tok
};
    this.storage.setLocalUser(user);

}
/*logout() remove do storage o usuário*/ 
logout() {
    this.storage.setLocalUser(null);


    }

}