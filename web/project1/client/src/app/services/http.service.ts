import { Injectable } from '@angular/core';
import { Headers, Http,Request, RequestOptionsArgs,RequestOptions } from "@angular/http";
import { environment } from '../../environments/environment';

@Injectable()
export class HttpService {

  constructor(private _$http:Http) { }

  public generateUrl(path:string) {
      // TODO: stephen I think this will have an error if the path already contained a query parameter... 
      // we need to find a better way to do this.
      let url = environment.apiUrl + path;
      return url;
  }

  public get(action:string, data?:any) : Promise<any> {
    if (!data) {
        data = {};
    }
    let payload = {
      action: action
      ,data: data
    };
    
    let options = new RequestOptions({params: payload, withCredentials: true});
    return this._$http.get(environment.apiUrl, options).toPromise();
  }

  public post(action:string, data?:any) : Promise<any> {
    if (!data) {
        data = {};
    }
    let payload = {
      action: action
      ,data: data
    };
    let options = new RequestOptions({withCredentials:true});
    
    return this._$http.post(environment.apiUrl, payload, options).toPromise();
  }

}
