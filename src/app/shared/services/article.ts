import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article } from '../models/article.model';

@Injectable({ providedIn: 'root' })
export class ArticleService {
  private readonly API = '/articles';

  private _currentArticle = signal<Article | null>(null);
  currentArticle = this._currentArticle.asReadonly();

  constructor(private http: HttpClient) {}

  getArticles(limit: number, offset: number) {
    return this.http.get<{ articles: Article[]; articlesCount: number }>(this.API, {
      params: { limit, offset },
    });
  }

  setCurrentArticle(article: Article) {
    this._currentArticle.set(article);
  }

  loadArticle(slug: string) {
    return this.http
      .get<{ article: Article }>(`${this.API}/${slug}`)
      .subscribe((res) => this._currentArticle.set(res.article));
  }
}
