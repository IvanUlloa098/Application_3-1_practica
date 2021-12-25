import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Contact } from './domain/contact';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  saveContact(contacto: Contact) {
    const options = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    
    const params = new HttpParams()
    .set('nombre', contacto.nombre)
    .set('numero', contacto.numero);

    return this.http.post<any>(environment.WS_PATH + "/crearcontacto/", params.toString(), options)

  }

  listContacts() {
    
    return this.http.get<any>(environment.WS_PATH + "/listarcontactos/").toPromise()
  }

}
