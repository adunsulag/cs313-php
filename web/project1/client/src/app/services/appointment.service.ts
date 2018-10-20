import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class AppointmentService {

  constructor(private httpService:HttpService) { }

  list() {
    return this.httpService.get("appointments.list").then((resp) => {
      let data = resp.json() as any[];
      return data;
    });
  }

  get(appointmentId:number) {
    return Promise.resolve({
      'id': 2,
      'clientName': 'Jeremiah',
      'clientID': 1,
      'therapistID': 1,
      'therapistName': 'Sam',
      'startDate': '2018-10-17 14:28:42.987779',
      'endDate': '2018-10-17 15:28:42.987779',
      'status': 'pending',      
    });
  }

}
