import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { StorageService } from "../storage.service";
import { Observable } from "rxjs";
import { ClienteDTO } from "../../models/cliente.dto";
import { API_CONFIG } from "../../config/api.config";

@Injectable()
export class ClienteService {
    constructor(public http: HttpClient, public storage: StorageService) {
}
/*Metado findByEmail recebe o email e o ClienteDTO */ 
    findByEmail(email: string) : Observable<ClienteDTO> {
        return this.http.get<ClienteDTO>(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
}

/* Metado getImageFromBucket buscar as imagens no bucket da awd amazon formato JPG*/
    getImageFromBucket(id : string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
        return this.http.get(url, {responseType : 'blob'});
    }
/*Metado para inserir clientes*/ 
insert(obj : ClienteDTO) {
    return this.http.post(
     `${API_CONFIG.baseUrl}/clientes`, 
    obj,
    { 
        observe: 'response', 
        responseType: 'text'
            }
        ); 
    }
}