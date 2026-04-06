import { Injectable, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { LOCAL_STORAGE_KEY } from '../constants/local-storage.constant';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { AuthErrorResponse, AuthResponse } from '../models/auth-response.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  readonly user = signal<User | null>(null);
  readonly errorResponse = signal<AuthErrorResponse | null>(null);
  readonly loading = signal(false);

  login(email: string, password: string): void {
    this.loading.set(true);
    this.errorResponse.set(null);

    this.userService.login(email, password).subscribe({
      next: (res) => {
        this.handleAuthSuccess(res);
      },
      error: (err: HttpErrorResponse) => {
        this.handleError(err, 'Login failed');
      },
    });
  }

  register(username: string, email: string, password: string): void {
    this.loading.set(true);
    this.errorResponse.set(null);

    this.userService.register(username, email, password).subscribe({
      next: (res) => {
        this.handleAuthSuccess(res);
      },
      error: (err: HttpErrorResponse) => {
        this.handleError(err, 'Register failed');
      },
    });
  }

  loadCurrentUser(): void {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY.token);

    if (!token) {
      this.clearUser();
      return;
    }

    this.loading.set(true);

    this.userService.getCurrentUser().subscribe({
      next: (res) => {
        this.user.set(res.user);
        this.loading.set(false);
      },
      error: () => {
        this.clearUser();
        this.loading.set(false);
      },
    });
  }

  logout() {
    localStorage.removeItem(LOCAL_STORAGE_KEY.token);
    this.clearUser();
  }

  resetErrorResponse() {
    this.errorResponse.set(null);
  }

  private handleAuthSuccess(res: AuthResponse) {
    localStorage.setItem(LOCAL_STORAGE_KEY.token, res.user.token);
    this.user.set(res.user);
    this.loading.set(false);
    this.router.navigate(['/home']);
  }

  private handleError(err: HttpErrorResponse, fallback: string) {
    this.errorResponse.set(err.error?.errors ?? { error: [fallback] });
    this.loading.set(false);
  }

  private clearUser() {
    this.user.set(null);
  }

  isLoggedIn() {
    return !!this.user();
  }
}
