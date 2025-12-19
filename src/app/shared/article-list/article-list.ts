import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PaginationComponent } from '../pagination/pagination';
import { Article } from '../models/article.model';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CommonModule, RouterLink, PaginationComponent],
  templateUrl: './article-list.html',
  styleUrls: ['./article-list.scss'],
})
export class ArticleListComponent {
  readonly articles = input<Article[]>([]);
  currentPage = signal(1);
  totalPages = signal(100);
}
