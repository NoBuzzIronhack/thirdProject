import { RouterModule, Routes } from '@angular/router';
import {CategoryComponent} from './category/category.component';
import {SearchComponent} from './search/search.component';
import {BookDetailComponent} from './book-detail/book-detail.component';
import {ProfileComponent} from './profile/profile.component'
import { SearchUrlComponent } from './search-url/search-url.component'


const myRoutes: Routes =[
{path: 'categories', component: CategoryComponent},
{path: 'book-search', component: SearchComponent},
{path: 'book-detail/:url', component: BookDetailComponent},
{path: 'profile', component: ProfileComponent},

//{path:'videos-search'},
{path: 'url-search', component: SearchUrlComponent }

];

export{ myRoutes };
