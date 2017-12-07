import { Component, OnInit } from '@angular/core';
import {SearchService} from '../services/search.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  bookList = [];
  videoList= [];
  constructor(public BookSearch: SearchService) { }
  ngOnInit() {

  }
searchBooks(e){
  let bookQuery= e.target.value;
  this.BookSearch.searchBookList(bookQuery).subscribe(bookList =>{
    this.bookList = bookList;
  })

}
searchVideos(e){
  let bookQuery= e.target.value;
  this.BookSearch.searchBookList(bookQuery).subscribe(bookList =>{
    this.bookList = bookList;
  })

}

}
