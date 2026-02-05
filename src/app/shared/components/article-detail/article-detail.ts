import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleService } from '../../services/article';
import { BannerComponent } from "../banner/banner";

@Component({
  standalone: true,
  imports: [CommonModule, BannerComponent],
  templateUrl: './article-detail.html',
})
export class ArticleDetail {
  article = inject(ArticleService).currentArticle;
}
