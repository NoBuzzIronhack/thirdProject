import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AuthService } from './services/auth.service';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import {RouterModule} from '@angular/router';
import { myRoutes } from './routes';
import { CategoryComponent } from './category/category.component';
import { SearchComponent } from './search/search.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { ProfileComponent } from './profile/profile.component';
import {SearchService} from './services/search.service';
import { VideoDetailComponent } from './video-detail/video-detail.component';
import {VideoSearchService} from './services/video-search.service';
@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    CategoryComponent,
    SearchComponent,
    BookDetailComponent,
    ProfileComponent,
    VideoDetailComponent
    ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(myRoutes)
  ],
  providers: [AuthService, SearchService, VideoSearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
