import { Component } from '@angular/core';
import { TagList } from '../../shared/tag-list/tag-list';
import { Footer } from '../../shared/footer/footer';
import { PaginationComponent } from '../../shared/pagination/pagination';
import { ArticleListComponent } from "../../shared/article-list/article-list";

@Component({
  selector: 'app-home',
  imports: [TagList, Footer, PaginationComponent, ArticleListComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  articles = [
    {
      author: 'pradaman',
      title: 'Celular xiaomi',
      desc: 'bài tập hôm nay là về ',
      date: 'October 31, 2025',
    },
    {
      author: 'testuser1761745955343',
      title: 'Original Title',
      desc: 'Original Description',
      date: 'October 29, 2025',
    },
  ];
  tags = ['frontend', 'backend', 'science', 'angular', 'typescript', 'test', 'example'];
  currentPage = 1;
  totalPages = 1099;
  loadArticles(page: number) {
    this.currentPage = page;
    console.log('Load trang', page);
  }
}

