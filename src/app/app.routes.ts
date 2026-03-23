import { Routes } from '@angular/router';
import { ArticleDetailComponent } from './features/article-detail/article-detail';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'article-detail/:slug',
    loadComponent: () =>
      import('./features/article-detail/article-detail').then((m) => m.ArticleDetailComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then((mod) => mod.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register').then((mod) => mod.RegisterComponent),
  },
  { path: 'home', loadComponent: () => import('./features/home/home').then((mod) => mod.Home) },
  {
    path: 'new-article',
    loadComponent: () =>
      import('./features/new-article/new-article').then((mod) => mod.NewArticleComponent),
  },
  {
    path: 'article/:slug',
    loadComponent: () =>
      import('./features/article-detail/article-detail').then((m) => m.ArticleDetailComponent),
  },
  {
    path: 'profile/:username',
    loadComponent: () =>
      import('./shared/components/profiles/profile').then((m) => m.ProfileComponent),
  },
];
