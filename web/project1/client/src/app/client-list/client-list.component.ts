import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'dac-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  public clients:any;

  constructor(private clientService:ClientService) { 
    this.clients = [];
  }

  ngOnInit() {
    this.clientService.list().then((clients) => {
      console.log(clients);
      this.clients = clients;
    });
  }

}
