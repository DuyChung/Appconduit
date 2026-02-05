import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Article } from '../../models/article.model';

@Component({
  selector: 'app-article-preview',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './article-preview.html',
  styleUrls: ['./article-preview.scss'],
})
export class ArticlePreviewComponent {
  readonly article = input.required<Article>();
}