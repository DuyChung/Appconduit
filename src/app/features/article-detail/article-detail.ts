import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { ArticleService } from '../../shared/services/article.service';
import { Article } from '../../shared/models/article.model';
import { ArticleMetaComponent } from './article-meta/article-meta';
import { Footer } from '../../shared/components/footer/footer';
import { Tags } from '../../shared/components/tags/tags';
import { AuthStore } from '../../shared/stores/auth.store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DestroyRef } from '@angular/core';
import { CommentListComponent } from './comment-list/comment-list';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  templateUrl: './article-detail.html',
  styleUrls: ['./article-detail.scss'],
  imports: [ArticleMetaComponent, Footer, Tags, CommentListComponent],
})
export class ArticleDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly articleService = inject(ArticleService);
  private readonly authStore = inject(AuthStore);
  private readonly destroyRef = inject(DestroyRef);

  article = signal<Article | null>(null);
  isLoggedIn = () => this.authStore.isLoggedIn();

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params) => this.articleService.getArticleBySlug(params.get('slug')!)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((res) => this.article.set(res.article));
  }
}
