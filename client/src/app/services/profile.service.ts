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
}







//     getBookDetail(url):Observable<any>{
//     return this.http.get(`${BASEURL}/detail/?url=${url}`, this.options)
//       .map(res =>res.json());
//     }
