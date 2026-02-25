import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ArticleActionService {
  private readonly http = inject(HttpClient);

  favorite(slug: string) {
    return this.http
      .post<any>(`/articles/${slug}/favorite`, {})
      .pipe(map(res => res.article));
  }

  unfavorite(slug: string) {
    return this.http
      .delete<any>(`/articles/${slug}/favorite`)
      .pipe(map(res => res.article));
  }

  follow(username: string) {
    return this.http
      .post<any>(`/profiles/${username}/follow`, {})
      .pipe(map(res => res.profile));
  }

  unfollow(username: string) {
    return this.http
      .delete<any>(`/profiles/${username}/follow`)
      .pipe(map(res => res.profile));
  }
}