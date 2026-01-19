import { Injectable, inject, signal } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private readonly authService = inject(AuthService);
  login(email: string, password: string) {
    return this.authService.login(email, password).pipe(
      tap((res) => {
        localStorage.setItem('token', res.user.token);
        this.user.set(res.user);
      }),
    );
  }
  readonly user = signal<any | null>(null);

  loadCurrentUser() {
    if (!localStorage.getItem('token')) return;

    this.authService.getCurrentUser().subscribe({
      next: (res) => this.setUser(res.user),
      error: () => this.clearUser(),
    });
  }

  setUser(user: any) {
    this.user.set(user);
  }

  logout() {
    localStorage.removeItem('token');
    this.clearUser();
  }

  private clearUser() {
    this.user.set(null);
  }
  isLoggedIn() {
    return !!this.user();
  }
}
