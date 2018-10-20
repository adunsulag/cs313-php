import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'dac-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.scss']
})
export class ClientEditComponent implements OnInit {
  public hasLoaded:boolean;
  public _client:any;
  constructor(private route:ActivatedRoute, private router:Router, private clientsService:ClientService) { 
    this._client = {
      logs: [],
      appointments: []
    };
  }

  ngOnInit() {
    this.hasLoaded = false;
    this.route.params.subscribe(params => {
      if (!params['id'] || isNaN(+params['id'])) {
        this.router.navigate(['/page-not-found']);
        return;
      }
      let clientId = +params['id'];
      this.clientsService.get(clientId).then((client) => {
        this._client = client;
        this.hasLoaded = true;
      })
      .catch((error) => {
        console.error(error);
        this.hasLoaded = true;
      })
    });
  }

  public get editItem() {
    return this._client || { logs: [], appointments: []};
  }

}
