import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router, private apiService: ApiService) { }

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

}
