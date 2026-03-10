import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Author } from '../models/author.model';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private readonly http = inject(HttpClient);

  follow(username: string): Observable<{ profile: Author }> {
    return this.http.post<{ profile: Author }>(`/profiles/${username}/follow`, {});
  }

  unfollow(username: string): Observable<{ profile: Author }> {
    return this.http.delete<{ profile: Author }>(`/profiles/${username}/follow`);
  }
}