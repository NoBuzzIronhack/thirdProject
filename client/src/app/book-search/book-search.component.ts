import { Component, OnInit } from '@angular/core';
import {BookSearchService} from '../services/book-search.service'

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css']
})
export class BookSearchComponent implements OnInit {
  bookList = [];
  constructor(public BookSearch: BookSearchService) { }
  ngOnInit() {

  }
searchBooks(e){
  let bookQuery= e.target.value;
  this.BookSearch.searchBookList(bookQuery).subscribe(bookList =>{
    this.bookList = bookList;
  })

}


}
