import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from '../models/auth-response.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly http = inject(HttpClient);

  register(username: string, email: string, password: string) {
    return this.http.post<AuthResponse>('/users', {
      user: { username, email, password },
    });
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponse>('/users/login', {
      user: { email, password },
    });
  }

  getCurrentUser() {
    return this.http.get<AuthResponse>('/user');
  }
}