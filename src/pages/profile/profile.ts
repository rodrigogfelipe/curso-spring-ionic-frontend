import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { API_CONFIG } from '../../config/api.config';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente: ClienteDTO;

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public storage: StorageService,
      public clienteService: ClienteService) {
}
  /* criar um atributo email e carregá-lo do storage */
  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
          .subscribe(response => {
          this.cliente = response;
          this.getImageIfExists();

},    /*realizar o redirecionamento para HomePage em caso de erro 403 */ 
      error => {
          if (error.status == 403) {
          this.navCtrl.setRoot('HomePage');
    }

});

}

else {
      this.navCtrl.setRoot('HomePage');

    }
}

/*Incluir lógica para obter a URL da imagem no bucket S3, se ela existir */
getImageIfExists() {
    this.clienteService.getImageFromBucket(this.cliente.id)
      .subscribe(response => {
        this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;

  },

    error => {});

  }
}
