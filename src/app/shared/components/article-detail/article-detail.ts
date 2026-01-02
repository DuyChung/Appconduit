import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ArticleService } from '../../services/article';
import { Article } from '../../models/article.model';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './article-detail.html',
  styleUrl: './article-detail.scss',
})
export class ArticleDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly articleService = inject(ArticleService);
  slug = this.route.snapshot.paramMap.get('slug')!;
  article = signal<Article | null>(null);

  ngOnInit() {
    this.loadArticle();
  }

  loadArticle() {
    this.articleService.getArticleBySlug(this.slug).subscribe({
      next: (res) => {
        this.article.set(res.article);
      },
      error: (err) => {
        console.error(' Dây là lỗi load trang article:', err);
      },
    });
  }
}
