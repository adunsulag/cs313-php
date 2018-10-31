import { Injectable } from '@angular/core';
import { Headers, Http,Request, RequestOptionsArgs,RequestOptions } from "@angular/http";
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class HttpService {

  private _httpStatusSubject:BehaviorSubject<number>;
  
  constructor(private _$http:Http) { 
    this._httpStatusSubject = new BehaviorSubject<number>(200);
  }

  public generateUrl(path:string) {
      // TODO: stephen I think this will have an error if the path already contained a query parameter... 
      // we need to find a better way to do this.
      let url = environment.apiUrl + path;
      return url;
  }

  /**
     * Returns an observable that sends the most recent http status code
     */
    public currentStatus() : Observable<number> {
      return this._httpStatusSubject.asObservable();
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
    return this._$http.get(environment.apiUrl, options).toPromise()
    .then((val) => {
      this._httpStatusSubject.next(val.status);
      return val;
    })
    .catch((err) => {
      this._httpStatusSubject.next(err.status);
      throw err;
    });
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
    
    return this._$http.post(environment.apiUrl, payload, options).toPromise()
    .then((val) => {
      this._httpStatusSubject.next(val.status);
      return val;
    })
    .catch((err) => {
      this._httpStatusSubject.next(err.status);
      throw err;
    });
  }

}
