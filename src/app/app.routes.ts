import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { ArticleDetail } from './shared/components/article-detail/article-detail';
export const routes: Routes = [
  { path: '', component: Home },
  { path: 'article-detail/:slug', component: ArticleDetail },
];