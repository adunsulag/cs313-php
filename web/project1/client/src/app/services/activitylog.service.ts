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
  search(filter:{entity?:string, entityID?:number, action?:string}) {
    return this.httpService.get("activitylog.list", {entity:filter.entity, entityID: filter.entityID, action: filter.action}).then((resp) => {
      let data = resp.json() as any[];
      return data;
    });
  }

}
