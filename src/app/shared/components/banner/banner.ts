import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Article } from '../../models/article.model';
import { ArticleMetaComponent } from '../article-meta/article-meta';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule, ArticleMetaComponent],
  templateUrl: './banner.html',
  styleUrl: './banner.scss',
})
export class BannerComponent {
  @Input({ required: true }) article!: Article;
}