import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { ArticleDetail } from './shared/components/article-detail/article-detail';
import { LoginComponent } from './features/auth/login/login';
import { RegisterComponent } from './features/auth/register/register';
export const routes: Routes = [
  { path: '', component: Home },
  { path: 'article-detail/:slug', component: ArticleDetail },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: Home },
];
