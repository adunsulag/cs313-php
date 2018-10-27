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
  save(client:{id?:number, name:string}) {
    return this.httpService.post("clients.save", {id: client.id, name: client.name})
    .then((resp) => {
      // return the most up to date client here.
      let data = resp.json() as any;
      return data;
    });
  }
}
