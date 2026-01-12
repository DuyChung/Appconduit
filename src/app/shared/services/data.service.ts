import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthStore } from './auth.store';

@Injectable({ providedIn: 'root' })
export class dataService {
  private http = inject(HttpClient);
  private authStore = inject(AuthStore);
  register(username: string, email: string, password: string) {
  return this.http.post<any>('/users', {
    user: {
      username,
      email,
      password,
    },
  });
}
  login(email: string, password: string) {
  return this.http.post<any>('/users/login', {
    user: { email, password },
  });
}
  getCurrentUser() {
    return this.http.get<any>('/user').subscribe((res) => {
      console.log('LOGIN OK', res);
      this.authStore.setUser(res.user);
    });
  }

  logout() {
    this.authStore.clearUser();
  }
}
