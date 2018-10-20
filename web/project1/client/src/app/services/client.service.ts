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
    return Promise.resolve({
      id: 1
      ,name: "Bob"
      ,logs: [{
        'date' : '2018-10-17 12:28:41.760026',
        'tableName' : 'Client',
        'tableID' : 1,
        'action' : 'INSERT',
        'notes' : 'Jason was created.',
        'systemUserEmail' : 'stephen+test1@nielson.org',

      }]
      ,appointments: [
        {
          'id': 2,
          'clientName': 'Jeremiah',
          'clientID': 1,
          'therapistID': 1,
          'therapistName': 'Sam',
          'startDate': '2018-10-17 14:28:42.987779',
          'endDate': '2018-10-17 15:28:42.987779',
          'status': 'pending',      
        }
      ]
    });
  }
}
