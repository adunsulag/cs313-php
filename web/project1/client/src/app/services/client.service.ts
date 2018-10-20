import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class ClientService {

  constructor(private httpService:HttpService) { }

  list() {
    return this.httpService.get("clients.list").then((resp) => {
      let data = resp.json() as any[];
      return data;
    });
  }

  get(clientId:number) {
    return this.httpService.get("clients.get", {id: clientId}).then((resp) => {
      let data = resp.json() as any;
      return data;
    });
  }
}
