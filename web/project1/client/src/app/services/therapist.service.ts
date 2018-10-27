import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class TherapistService {

  constructor(private httpService:HttpService) { }

  list() {
    return this.httpService.get("therapists.list").then((resp) => {
      let data = resp.json() as any[];
      return data;
    });
  }

  get(therapistId:number) {
    return this.httpService.get("therapists.get", {id: therapistId}).then((resp) => {
      let data = resp.json() as any;
      return data;
    });
  }

  save(therapist:{id?:number, name:string}) {
    return this.httpService.post("therapists.save", {id: therapist.id, name: therapist.name})
    .then((resp) => {
      // return the most up to date client here.
      let data = resp.json() as any;
      return data;
    });
  }
}
