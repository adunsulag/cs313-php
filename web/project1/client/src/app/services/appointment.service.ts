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
    return this.httpService.get("appointments.get", {id: appointmentId}).then((resp) => {
      let data = resp.json() as any[];
      return data;
    });
  }

  save(appointment:any) {
    return this.httpService.get("appointments.save", appointment).then((resp) => {
      let data = resp.json() as any[];
      return data;
    });
  }

}
