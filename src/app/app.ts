import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {  userService } from './shared/services/user.service';
import { HeaderComponent } from './shared/components/header/header';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.scss']
})
export class App {
  private dataService = inject(userService);

  constructor() {
    if (localStorage.getItem('token')) {
      this.dataService.getCurrentUser();
    }
  }
}
