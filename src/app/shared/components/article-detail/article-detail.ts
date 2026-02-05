import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { ArticleService } from '../../services/article';
import { BannerComponent } from "../banner/banner";

@Component({
  selector: 'app-article-detail,BannerComponent',
  templateUrl: './article-detail.html',
  styleUrls:['./article-detail.scss'],
  imports: [BannerComponent]
})
export class ArticleDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly articleService = inject(ArticleService);

  article = signal<any | null>(null);

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap(params =>
          this.articleService.getArticleBySlug(
            params.get('slug')!
          )
        )
      )
      .subscribe(article => this.article.set(article));
  }
}
