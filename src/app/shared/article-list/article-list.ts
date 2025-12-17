import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PaginationComponent } from '../pagination/pagination';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CommonModule, RouterLink, PaginationComponent],
  templateUrl: './article-list.html',
  styleUrls: ['./article-list.scss'],
})
export class ArticleListComponent {
  @Input() articles: any[] = [];
  currentPage = signal(1);
  totalPages = signal(100);
}
