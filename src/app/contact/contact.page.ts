import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InAppBrowser, InAppBrowserOptions } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { alertController } from '@ionic/core';
import { ApiService } from '../api.service';
import { Contact } from '../domain/contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  nombre: string
  numero: string
  response: string
  contacto: Contact = new Contact()

  url = "http://localhost:8083/"
  options : InAppBrowserOptions = {
    location : 'yes',//Or 'no' 
    hidden : 'no', //Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes',//Android only ,shows browser zoom controls 
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only 
    closebuttoncaption : 'Close', //iOS only
    disallowoverscroll : 'no', //iOS only 
    toolbar : 'yes', //iOS only 
    enableViewportScale : 'no', //iOS only 
    allowInlineMediaPlayback : 'no',//iOS only 
    presentationstyle : 'pagesheet',//iOS only 
    fullscreen : 'yes',//Windows only    
  };

  constructor(private router: Router, private apiService: ApiService, private theInAppBrowser: InAppBrowser) { }

  ngOnInit() {
  }

  async guardar() {
    if(this.nombre && this.numero){
      this.contacto.nombre = this.nombre
      this.contacto.numero = this.numero
      
      this.apiService.saveContact(this.contacto).subscribe(data => {})

      const alert = await alertController.create({
        header: 'Alerta',
        message: 'Datos guardados',
        buttons: ['OK']
      });
      await alert.present();

    } else {
      const alert = await alertController.create({
        header: 'Alerta',
        message: 'EROOR: Servidor no disponible',
        buttons: ['OK']
      });
      await alert.present();
    }
    
  }

  navegar() {
    this.router.navigate(['list'])
  }

  resources() {
    let target = "_self";
    this.theInAppBrowser.create(this.url,target,this.options);
  }

}
