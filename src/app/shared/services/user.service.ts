import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class userService {
  private http = inject(HttpClient);

  register(username: string, email: string, password: string) {
    return this.http.post<any>('/users', {
      user: { username, email, password },
    });
  }

  login(email: string, password: string) {
    return this.http.post<any>('/users/login', {
      user: { email, password },
    });
  }

  getCurrentUser() {
    return this.http.get<any>('/user');
  }
}
