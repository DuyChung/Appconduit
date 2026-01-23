import { Injectable, inject, signal } from '@angular/core';
import { tap } from 'rxjs';
import { LOCAL_STORAGE_KEY } from '../constants/local-storage.constant';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private readonly userService = inject(UserService);
  readonly user = signal<User | null>(null);

  login(email: string, password: string) {
    return this.userService.login(email, password).pipe(
      tap((res) => {
        localStorage.setItem(LOCAL_STORAGE_KEY.token, res.user.token);
        this.user.set(res.user);
      }),
    );
  }

  register(username: string, email: string, password: string) {
    return this.userService.register(username, email, password).pipe(
      tap((res) => {
        localStorage.setItem(LOCAL_STORAGE_KEY.token, res.user.token);
        this.setUser(res.user);
      }),
    );
  }

  loadCurrentUser() {
    if (!localStorage.getItem(LOCAL_STORAGE_KEY.token)) {
      this.clearUser();
      return;
    }

    return this.userService.getCurrentUser().pipe(
      tap({
        next: (res) => this.setUser(res.user),
        error: () => this.clearUser(),
      }),
    );
  }

  private setUser(user: User) {
    this.user.set(user);
  }

  logout() {
    localStorage.removeItem(LOCAL_STORAGE_KEY.token);
    this.clearUser();
  }

  private clearUser() {
    this.user.set(null);
  }

  isLoggedIn() {
    return !!this.user();
  }
}
