import { Component, OnInit } from '@angular/core';
import{AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  constructor(private auth:AuthService) { }

    login(username, password){
      this.auth.login(username,password).subscribe();
    }
    signup(username, password){
      console.log(username,password);
      this.auth.signup(username,password).subscribe();
    }
    logout() {
      this.auth.logout().subscribe();
    }

}
