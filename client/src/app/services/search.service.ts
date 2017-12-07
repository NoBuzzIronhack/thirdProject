import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';

const DOMAIN = "http://localhost:3000";
const PATH = "/books";
const BASEURL = `${DOMAIN}${PATH}`;


@Injectable()
export class SearchService {
  options:Object = {
    withCredentials:true
  }
  constructor(private http: Http) { }

    searchBookList(querybook):Observable<any>{
      return this.http.get(`${BASEURL}?q=${querybook}`, this.options)
                      .map(res => res.json());
    }
    getBookDetail(url):Observable<any>{
    return this.http.get(`${BASEURL}/detail/?url=${url}`, this.options)
      .map(res =>res.json());
    }

    saveBookPublication(book) {
      return this.http.post(`${BASEURL}/detail/`, book, this.options)
      .map(res =>res.json());
    }


    }
