import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header';
import { AuthStore } from './shared/stores/auth.store';
import { UserService } from './shared/services/user.service';

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
  private readonly userService = inject(UserService);
  constructor() {
    this.authStore.loadCurrentUser();
    const token = localStorage.getItem('token');

    if (token) {
      this.userService.getCurrentUser().subscribe();
    }
  }
}
