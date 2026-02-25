import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthResponse } from '../models/auth-response.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly http = inject(HttpClient);

  currentUser = signal<AuthResponse['user'] | null>(null);

  register(username: string, email: string, password: string) {
    return this.http
      .post<AuthResponse>('/users', {
        user: { username, email, password },
      })
      .pipe(tap((res) => this.currentUser.set(res.user)));
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponse>('/users/login', {
        user: { email, password },
      })
      .pipe(tap((res) => this.currentUser.set(res.user)));
  }

  getCurrentUser() {
    return this.http.get<AuthResponse>('/user').pipe(tap((res) => this.currentUser.set(res.user)));
  }

  logout() {
    this.currentUser.set(null);
  }

  isLoggedIn() {
    return !!this.currentUser();
  }
}
