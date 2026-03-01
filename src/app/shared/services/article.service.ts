import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Article } from '../models/article.model';
import { Author } from '../models/author.model';

@Injectable({ providedIn: 'root' })
export class ArticleService {
  private readonly API = '/articles';
  private readonly http = inject(HttpClient);

  getArticles(
    limit: number,
    offset: number,
  ): Observable<{ articles: Article[]; articlesCount: number }> {
    return this.http.get<{ articles: Article[]; articlesCount: number }>(this.API, {
      params: { limit, offset },
    });
  }

  getArticleBySlug(slug: string): Observable<Article> {
    return this.http
      .get<{ article: Article }>(`${this.API}/${slug}`)
      .pipe(map((res) => res.article));
  }

  favorite(slug: string): Observable<Article> {
    return this.http
      .post<{ article: Article }>(`${this.API}/${slug}/favorite`, {})
      .pipe(map((res) => res.article));
  }

  unfavorite(slug: string): Observable<Article> {
    return this.http
      .delete<{ article: Article }>(`${this.API}/${slug}/favorite`)
      .pipe(map((res) => res.article));
  }

  follow(username: string): Observable<Author> {
    return this.http
      .post<{ profile: Author }>(`/profiles/${username}/follow`, {})
      .pipe(map((res) => res.profile));
  }

  unfollow(username: string): Observable<Author> {
    return this.http
      .delete<{ profile: Author }>(`/profiles/${username}/follow`)
      .pipe(map((res) => res.profile));
  }
  getTags(): Observable<string[]> {
    return this.http.get<{ tags: string[] }>('/tags').pipe(map((res) => res.tags.slice(0, 20)));
  }
}
