import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { Tags } from '../../shared/components/tags/tags';
import { Footer } from '../../shared/components/footer/footer';
import { ArticleListComponent } from '../../shared/components/article-list/article-list';
import { ArticleService } from '../../shared/services/article.service';
import { Article } from '../../shared/models/article.model';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../shared/components/pagination/pagination';
import { TagService } from '../../shared/services/tag.service';
import { RouterLink } from '@angular/router';
import { AuthStore } from '../../shared/stores/auth.store';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Tags, Footer, ArticleListComponent, PaginationComponent, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  currentPage = signal(1);
  totalPages = signal(0);
  articles = signal<Article[]>([]);
  tags = signal<string[]>([]);

  feedType = signal<'global' | 'my' | 'tag'>('global');
  selectedTag = signal<string | null>(null);

  limit = 5;

  private articleService = inject(ArticleService);
  private tagService = inject(TagService);
  private userService = inject(AuthStore);

  readonly isLoggedIn = () => this.userService.isLoggedIn();
  constructor() {
    effect(() => {
      this.loadArticles();
    });
  }

  ngOnInit() {
    this.loadTags();
  }

  loadArticles() {
    const offset = (this.currentPage() - 1) * this.limit;

    if (this.feedType() === 'my') {
      if (!this.isLoggedIn()) {
        this.articles.set([]);
        this.totalPages.set(0);
        return;
      }

      this.articleService.getMyFeed(this.limit, offset).subscribe((res) => {
        this.handleArticlesResponse(res);
      });
    } else {
      this.articleService.getArticles(this.limit, offset).subscribe((res) => {
        this.handleArticlesResponse(res);
      });
    }
  }
  private handleArticlesResponse(res: { articles: Article[]; articlesCount: number }) {
    this.articles.set(res.articles);
    this.totalPages.set(Math.ceil(res.articlesCount / this.limit));
  }
  changeFeed(type: 'global' | 'my') {
    this.feedType.set(type);
    this.selectedTag.set(null);
    this.currentPage.set(1);
  }

  selectTag(tag: string) {
    this.feedType.set('tag');
    this.selectedTag.set(tag);
    this.currentPage.set(1);
  }

  loadTags() {
    this.tagService.getTags().subscribe((res) => {
      this.tags.set(res.tags.slice(0, 50));
    });
  }
}
