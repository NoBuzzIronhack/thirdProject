import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {VideoSearchService} from '../services/video-search.service';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css']
})
export class VideoDetailComponent implements OnInit {
  myVideo;

  constructor(public route: ActivatedRoute, public VideoSearch: VideoSearchService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
    this.VideoSearch.getVideoDetail(params['url']).subscribe(videoDetail => {
     this.myVideo = videoDetail;
  })
})
  }

  // saveThePublication() {
  //   this.VideoSearch.saveVideoPublication(this.myVideo)
  //   .subscribe(video => console.log(video))
  // }

}
