import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Readmore } from './features/readmore/readmore';
export const routes: Routes = [
  { path: '', component: Home },
   { path: 'readmore', component: Readmore },
];


