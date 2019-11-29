import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CredenciaisDTO } from "../../models/credencias.dto";
import { API_CONFIG } from "../../config/api.config";

@Injectable()
export class AuthService {
constructor(public http: HttpClient) {

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

}