import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credencias.dto';

@IonicPage() 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  /*Declarando a Classe CredenciaisDTO com os atributos vazios */ 
  creds : CredenciaisDTO = {
    email: "",
    senha: ""
}

  constructor(public navCtrl: NavController, public menu: MenuController) {

  }
/* ionViewWillEnter desabitar o menu quando acessado*/ 
  ionViewWillEnter() {
      this.menu.swipeEnable(false);
} 
/* ionViewDidLeave ficar habitado o menu na pagina principal*/ 
  ionViewDidLeave() {
    this.menu.swipeEnable(true);
}
  /*Declarando metado login para acessar a pagina CategoriasPages*/ 
  login() {
    console.log(this.creds);
    this.navCtrl.setRoot('CategoriasPage');
  }

}
