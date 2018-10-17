import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class ActivitylogService {

  constructor(private httpService:HttpService) { }

  list() {
    return this.httpService.get("activitylog.list").then((resp) => {
      let data = resp.json() as any[];
      return data;
    });
  }
  search(entity:string) {
    return this.httpService.get("activitylog.list", {entity:entity}).then((resp) => {
      let data = resp.json() as any[];
      return data;
    });
  }

}
