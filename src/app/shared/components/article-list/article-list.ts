import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Article } from '../../models/article.model';
import { ArticlePreviewComponent } from "../article-preview/article-preview";

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CommonModule, ArticlePreviewComponent],
  templateUrl: './article-list.html',
  styleUrls: ['./article-list.scss'],
})
export class ArticleListComponent {
   readonly articles = input.required<Article[]>();
}
