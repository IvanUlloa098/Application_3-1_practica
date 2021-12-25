import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  public contacts : any

  constructor(private apiService: ApiService) { }

  async ngOnInit() {
    this.contacts = await this.apiService.listContacts()
  }

}
