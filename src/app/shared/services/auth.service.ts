import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponse } from './auth-response.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);

  register(
    username: string,
    email: string,
    password: string,
  ): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/users', {
      user: { username, email, password },
    });
  }

  login(
    email: string,
    password: string,
  ): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/users/login', {
      user: { email, password },
    });
  }

  getCurrentUser(): Observable<AuthResponse> {
    return this.http.get<AuthResponse>('/user');
  }
}
