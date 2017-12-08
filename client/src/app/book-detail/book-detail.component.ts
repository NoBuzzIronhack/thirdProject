import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  myBook;

  constructor(public route: ActivatedRoute, private router: Router,public BookSearch: SearchService) { }
  ngOnInit() {
    this.route.params.subscribe(params => {
    this.BookSearch.getBookDetail(params['url']).subscribe(bookDetail => {
     this.myBook = bookDetail;
  })
})
}

saveThePublication() {
  this.BookSearch.saveBookPublication(this.myBook)
  .subscribe(response =>
    this.router.navigate(['/profile']));

}
}
