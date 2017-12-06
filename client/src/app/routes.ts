import { RouterModule, Routes } from '@angular/router';
import {CategoryComponent} from './category/category.component';
import {BookSearchComponent} from './book-search/book-search.component';
import {BookDetailComponent} from './book-detail/book-detail.component';
import {ProfileComponent} from './profile/profile.component'

const myRoutes: Routes =[
{path: 'categories', component: CategoryComponent},
{path: 'book-search', component: BookSearchComponent},
// {path: 'book-detail', component: BookDetailComponent},
// {path: 'profile', component: BookDetailComponent},

//{path:'videos-search'},
//{path: 'articles-search'}
];

export{myRoutes};
