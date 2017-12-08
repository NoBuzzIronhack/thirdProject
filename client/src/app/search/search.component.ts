import { Component, OnInit } from '@angular/core';
import {SearchService} from '../services/search.service'
import {VideoSearchService} from '../services/video-search.service'
import { ActivatedRoute, Router} from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  bookList = [];
  videoList= [];
  myVideo;
  routeToShow:string;
  constructor(public Search: SearchService, public VideoSearch: VideoSearchService, private route: ActivatedRoute, public sanitizer: DomSanitizer, public router: Router) { }

  ngOnInit() {
    this.route.url.subscribe(object => this.routeToShow = object[0].path);
    console.log(this.route.url);
  }
searchBooks(e){
  let bookQuery= e.target.value;
  this.Search.searchBookList(bookQuery).subscribe(bookList =>{
    this.bookList = bookList;
  })

}
searchVideos(e){
  let VideoQuery= e.target.value;
    this.VideoSearch.searchVideoList(VideoQuery).subscribe(videoList =>{
    this.videoList = videoList.map(e =>{
      e.embeded = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+e.link.substr(e.link.lastIndexOf('v=')+2, e.link.length));
      return e;
    })
  })

}
saveTheVideoPublication(video) {
  this.VideoSearch.saveVideoPublication(video)
  .subscribe(video => {
    this.router.navigate(['/profile']);
  });
}
}
