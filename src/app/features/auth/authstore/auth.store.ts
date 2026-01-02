import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthResponse } from '../../../shared/services/auth-response.model';
import { AuthStore } from '../../../shared/services/auth.store';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private authStore = inject(AuthStore);

  register(username: string, email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/users', {
      user: { username, email, password },
    });
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/users/login', {
      user: { email, password },
    });
  }

  getCurrentUser(): Observable<AuthResponse> {
    return this.http.get<AuthResponse>('/user').pipe(
      tap((res) => {
        this.authStore.setUser(res.user);
      }),
    );
  }

  logout() {
    this.authStore.clearUser();
  }
}
