import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CredenciaisDTO } from "../../models/credencias.dto";
import { API_CONFIG } from "../../config/api.config";
import { LocalUser } from "../../models/local_user";
import { StorageService } from "../storage.service";
import { JwtHelper } from 'angular2-jwt';
import { CartService } from "./cat.service";

@Injectable()
export class AuthService {

    /*jwtHelper */ 
    jwtHelper: JwtHelper = new JwtHelper();
    constructor(
        public http: HttpClient, 
        public storage: StorageService,
        public cartService: CartService) {

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
/*Metado refreshToken */ 
refreshToken() {
    return this.http.post(
    `${API_CONFIG.baseUrl}/auth/refresh_token`, 
    {},
    {
        observe: 'response',
        responseType: 'text'

        });

}
/*Metado successfulLogin */ 
successfulLogin(authorizationValue : string) {
    let tok = authorizationValue.substring(7);
    let user : LocalUser = {
        token: tok,
        email: this.jwtHelper.decodeToken(tok).sub /*jwtHelper pegar o email do token*/ 
};
    this.storage.setLocalUser(user);
    this.cartService.createOrClearCart();

}
/*logout() remove do storage o usuário*/ 
logout() {
    this.storage.setLocalUser(null);
    }

}