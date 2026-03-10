import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { AuthResponse } from '../models/auth-response.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly http = inject(HttpClient);

  currentUser = signal<AuthResponse['user'] | null>(null);
  isLoggedIn = signal(false);

  register(username: string, email: string, password: string) {
    return this.http
      .post<AuthResponse>('/users', {
        user: { username, email, password },
      })
      .pipe(tap((res) => this.setAuth(res)));
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponse>('/users/login', {
        user: { email, password },
      })
      .pipe(tap((res) => this.setAuth(res)));
  }

  private setAuth(res: AuthResponse) {
    this.currentUser.set(res.user);
    this.isLoggedIn.set(true);

    localStorage.setItem('token', res.user.token);
  }

  getCurrentUser() {
    return this.http.get<AuthResponse>('/user').pipe(
      tap((res) => {
        this.currentUser.set(res.user);
        this.isLoggedIn.set(true);
      }),
    );
  }

  logout() {
    this.currentUser.set(null);
    this.isLoggedIn.set(false);
    localStorage.removeItem('token');
  }
}
