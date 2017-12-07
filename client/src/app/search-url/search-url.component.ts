import { Component, OnInit } from '@angular/core';
import { searchUrlService } from '../services/searchUrl.service'
import { ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-search-url',
  templateUrl: './search-url.component.html',
  styleUrls: ['./search-url.component.css']
})
export class SearchUrlComponent implements OnInit {
myPubli;
queryPublic;
  constructor( public route: ActivatedRoute, private router: Router, public UrlSearch: searchUrlService) { }

  ngOnInit() {}

searchPubli(link){
  this.UrlSearch.pasteUrl(this.queryPublic).subscribe(publiUrl =>{
    this.myPubli = publiUrl;
  })
}

savePubli() {
  this.UrlSearch.saveUrlPublication(this.myPubli)
  .subscribe(response => {
    this.router.navigate(['/profile']);
  });
}
}
