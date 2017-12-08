import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  myBook;

  constructor(public route: ActivatedRoute, public BookSearch: SearchService, public router: Router) { }
  ngOnInit() {
    this.route.params.subscribe(params => {
    this.BookSearch.getBookDetail(params['url']).subscribe(bookDetail => {
     this.myBook = bookDetail;
  })
})
}

saveThePublication() {
  this.BookSearch.saveBookPublication(this.myBook)
  .subscribe(response =>{
    this.router.navigate(['/profile']);
  });
}
}

  // this.router.navigate(['/profile']);
