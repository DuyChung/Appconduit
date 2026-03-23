import { Routes, UrlSegment } from '@angular/router';
import { ArticleDetailComponent } from './features/article-detail/article-detail';

export const routes: Routes = [
  {
    matcher: (url: UrlSegment[]) => {
      if (url.length === 1 && url[0].path.startsWith('@')) {
        return {
          consumed: url,
          posParams: {
            username: new UrlSegment(url[0].path.slice(1), {}),
          },
        };
      }
      return null;
    },
    loadComponent: () => import('./features/profiles/profile').then((m) => m.ProfileComponent),
  },
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

];
