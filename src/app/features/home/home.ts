import { Component, effect, inject, signal } from '@angular/core';
import { TagList } from '../../shared/components/tag-list/tag-list';
import { Footer } from '../../shared/components/footer/footer';
import { ArticleListComponent } from '../../shared/components/article-list/article-list';
import { ArticleService } from '../../shared/services/article.service';
import { Article } from '../../shared/models/article.model';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../shared/components/pagination/pagination';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TagList, Footer, ArticleListComponent, PaginationComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  currentPage = signal(1);
  totalPages = signal(0);
  articles = signal<Article[]>([]);
  tags = signal<string[]>([]);
  limit = 3;

  private articleService = inject(ArticleService);

  constructor() {
    effect(() => {
      this.currentPage();
      this.loadArticles();
    });
  }
  loadArticles() {
    const offset = (this.currentPage() - 1) * this.limit;

    this.articleService.getArticles(this.limit, offset).subscribe({
      next: (res) => {
        this.articles.set(res.articles);

        const pages = Math.ceil(res.articlesCount / this.limit);
        this.totalPages.set(pages);
      },
    });
  }

  ngOnInit() {
    this.loadTags();
  }

  loadTags() {
    this.articleService.getTags().subscribe((tags) => {
      console.log(tags);
      this.tags.set(tags);
    });
  }
}
