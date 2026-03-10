import { Injectable, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
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

    this.userService
      .login(email, password)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (res) => {
          localStorage.setItem(LOCAL_STORAGE_KEY.token, res.user.token);
          this.user.set(res.user);
          this.router.navigate(['/home']);
        },
        error: (err: HttpErrorResponse) => {
          this.errorResponse.set(err.error?.errors ?? { error: ['Login failed'] });
        },
      });
  }

  register(username: string, email: string, password: string): void {
    this.loading.set(true);
    this.errorResponse.set(null);

    this.userService
      .register(username, email, password)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (res) => {
          localStorage.setItem(LOCAL_STORAGE_KEY.token, res.user.token);
          this.user.set(res.user);
          this.router.navigate(['/home']);
        },
        error: (err: HttpErrorResponse) => {
          this.errorResponse.set(err.error?.errors ?? { error: ['Register failed'] });
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

    this.userService
      .getCurrentUser()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (res) => this.user.set(res.user),
        error: () => this.clearUser(),
      });
  }

  logout() {
    localStorage.removeItem(LOCAL_STORAGE_KEY.token);
    this.clearUser();
  }

  resetErrorResponse() {
    this.errorResponse.set(null);
  }

  private clearUser() {
    this.user.set(null);
  }

  isLoggedIn() {
    return !!this.user();
  }
}
