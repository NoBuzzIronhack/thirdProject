import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { BookSearchService } from '../services/book-search.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  myBook;

  constructor(public route: ActivatedRoute, public BookSearch: BookSearchService) { }
  ngOnInit() {
    this.route.params.subscribe(params => {
    this.BookSearch.getBookDetail(params['url']).subscribe(bookDetail => {
     this.myBook = bookDetail;
  })
})
}

saveThePublication() {
  this.BookSearch.saveBookPublication(this.myBook)
  .subscribe(response => console.log(response))
}
}
