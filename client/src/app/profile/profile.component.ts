import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public dashboard: ProfileService) { }

  ngOnInit() {
    this.dashboard.getProfileList()
    .subscribe(elements => {
      console.log(elements)
    })
  }

  
}
