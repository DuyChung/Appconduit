import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Article } from '../models/article.model';

@Injectable({ providedIn: 'root' })
export class ArticleService {
  private readonly API = '/articles';

  getArticles(
    limit: number,
    offset: number,
  ): Observable<{ articles: Article[]; articlesCount: number }> {
    return this.http.get<{ articles: Article[]; articlesCount: number }>(
      this.API,
      {
        params: { limit, offset },
      }
    );
  }

  getArticleBySlug(slug: string): Observable<Article> {
    return this.http
      .get<{ article: Article }>(`${this.API}/${slug}`)
      .pipe(map(res => res.article));
  }
}
