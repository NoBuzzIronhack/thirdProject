import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AuthService } from '../services/auth.service';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import {RouterModule} from '@angular/router';
import { myRoutes } from './routes';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent
    ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(myRoutes)
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
