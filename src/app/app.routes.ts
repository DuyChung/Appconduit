import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'article-detail/:slug',
    loadComponent: () =>
      import('./shared/components/article-detail/article-detail').then((m) => m.ArticleDetailComponent),
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
];
