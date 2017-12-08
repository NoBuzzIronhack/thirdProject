import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';

const DOMAIN = "http://localhost:3000";
const PATH = "/profile";
const BASEURL = `${DOMAIN}${PATH}`;

@Injectable()
export class ProfileService {
  options:Object = {
    withCredentials:true
  }
  constructor(private http: Http) { }

    getProfileList():Observable<any>{
      return this.http.get(`${BASEURL}`, this.options)
                      .map(res => res.json());
    }
    getPostsList():Observable<any>{
      return this.http.get(`${BASEURL}/post`, this.options)
                      .map(res => res.json());
    }
    getLikesList():Observable<any>{
      return this.http.get(`${BASEURL}/like`, this.options)
                      .map(res => res.json());
    }
}
