import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header';
import { AuthStore } from './shared/authstore/auth.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.scss'],
})
export class App {
  private readonly authStore = inject(AuthStore);

  constructor() {
    this.authStore.loadCurrentUser();
  }
}
