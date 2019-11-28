import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CategoriaDTO } from "../../models/categoria.dto";
import { Observable } from "rxjs/Observable";
import { API_CONFIG } from "../../config/api.config";

/* Classe CategoriaService tem a função para fazer a requisição do HttpClient */ 
@Injectable()
export class CategoriaService {
        constructor(public http: HttpClient) {
}
    /*findAll() responsavel por retorna a lista da Classe CategoriaDTO */ 
    findAll() : Observable<CategoriaDTO[]>  {
        return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias`);
     }


}