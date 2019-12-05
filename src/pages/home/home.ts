import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credencias.dto';
import { AuthService } from '../../services/domain/auth.service';

@IonicPage() 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
/*home.ts e responsavel por envio de dados */
export class HomePage {
  
  /*Declarando a Classe CredenciaisDTO com os atributos vazios */ 
  creds : CredenciaisDTO = {
    email: "",
    senha: ""
}

constructor(
  public navCtrl: NavController, 
  public menu: MenuController,
  /*Declarando a Classe AuthService*/ 
  public auth: AuthService) {

}
/* ionViewWillEnter desabitar o menu quando acessado*/ 
  ionViewWillEnter() {
      this.menu.swipeEnable(false);
} 
/* ionViewDidLeave ficar habitado o menu na pagina principal*/ 
  ionViewDidLeave() {
    this.menu.swipeEnable(true);
}

  /*implementar o evento ionViewDidEnter para chamar o refresh token */ 
ionViewDidEnter() {
    this.auth.refreshToken()
    .subscribe(response => {
    this.auth.successfulLogin(response.headers.get('Authorization'));
    this.navCtrl.setRoot('CategoriasPage');
  
  },
    error => {});  
}
  /* Chamar authenticate no método login*/ 
  login() {
    this.auth.authenticate(this.creds)
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('CategoriasPage');
    },
      error => {});    

  }

  signup() {
      this.navCtrl.push('SignupPage');
    }

}
