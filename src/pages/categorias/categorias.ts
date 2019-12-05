import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaService } from '../../services/domain/categoria.service';
import { CategoriaDTO } from '../../models/categoria.dto';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})

export class CategoriasPage {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  /*Item recebe uma lista da CategoriaDTO*/ 
  items: CategoriaDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public categoriaService: CategoriaService) {

  }
    ionViewDidLoad() {
        this.categoriaService.findAll()
          .subscribe(response => {
            this.items = response;
      },

      error => {});

  }
  /** acrescentar um método showProdutos() para abrir a página de produtos.showProdutos, incluir o código da categoria como parâmetro da chamada de push   */
  showProdutos(categoria_id : string) {
    this.navCtrl.push('ProdutosPage', {categoria_id: categoria_id});
    }

}
