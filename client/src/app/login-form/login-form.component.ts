import { RouterModule, Routes } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import{AuthService} from '../services/auth.service';
import { myRoutes } from '../routes';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryComponent} from '../category/category.component';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  constructor(
    public router:Router,
    private auth:AuthService,
    public route:ActivatedRoute
    ) { }

    login(username, password){
      this.auth.login(username,password).subscribe();
      this.router.navigate(['categories']);
    }
    signup(username, password){
      console.log(username,password);
      this.auth.signup(username,password).subscribe();
    }
    logout() {
      this.auth.logout().subscribe();
    }

}
