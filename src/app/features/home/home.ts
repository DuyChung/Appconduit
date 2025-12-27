import { Component, signal } from '@angular/core';
import { TagList } from '../../shared/components/tag-list/tag-list';
import { Footer } from '../../shared/components/footer/footer';
import { ArticleListComponent } from '../../shared/components/article-list/article-list';
import { ArticleService } from '../../shared/services/article';
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
  totalPages = signal(100);
  articles = signal<Article[]>([]);
  tags = ['frontend', 'backend', 'science', 'angular', 'typescript'];
  limit = 3;
  page = 1;

  constructor(private articleService: ArticleService) {}

  ngOnInit() {
    this.loadArticles();
  }

  loadArticles() {
    const offset = (this.page - 1) * this.limit;

    this.articleService.getArticles(this.limit, offset).subscribe((res) => {
      this.articles.set(res.articles);
    });
  }
}
