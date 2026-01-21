import { Injectable, signal, computed } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private _user = signal<User | null>(null);

  user = this._user.asReadonly();
  isLoggedIn = computed(() => !!this._user());

  setUser(user: User) {
    this._user.set(user);
    localStorage.setItem('token', user.token);
  }

  clearUser() {
    this._user.set(null);
    localStorage.removeItem('token');
  }
}
