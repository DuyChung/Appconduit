import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../models/article.model';
import { ArticleQuery, CommentResponse, CreateCommentResponse } from '../models/comment.model';

@Injectable({ providedIn: 'root' })
export class ArticleService {
  private readonly API = '/articles';
  private readonly http = inject(HttpClient);

  getArticles(
    limit: number,
    offset: number,
    query?: ArticleQuery,
  ): Observable<{ articles: Article[]; articlesCount: number }> {
    let params: Record<string, string | number> = {
      limit,
      offset,
    };

    if (query?.tag) {
      params['tag'] = query.tag;
    }

    return this.http.get<{ articles: Article[]; articlesCount: number }>(this.API, { params });
  }

  getArticleBySlug(slug: string): Observable<{ article: Article }> {
    return this.http.get<{ article: Article }>(`${this.API}/${slug}`);
  }

  favorite(slug: string): Observable<{ article: Article }> {
    return this.http.post<{ article: Article }>(`${this.API}/${slug}/favorite`, {});
  }

  unfavorite(slug: string): Observable<{ article: Article }> {
    return this.http.delete<{ article: Article }>(`${this.API}/${slug}/favorite`);
  }
  getComments(slug: string) {
    return this.http.get<CommentResponse>(`${this.API}/${slug}/comments`);
  }
  addComment(slug: string, body: string) {
    return this.http.post<CreateCommentResponse>(`${this.API}/${slug}/comments`, {
      comment: { body },
    });
  }

  deleteComment(slug: string, id: number) {
    return this.http.delete(`${this.API}/${slug}/comments/${id}`);
  }

  getMyFeed(limit: number, offset: number) {
    return this.http.get<{ articles: Article[]; articlesCount: number }>(`${this.API}/feed`, {
      params: { limit, offset },
    });
  }
}
