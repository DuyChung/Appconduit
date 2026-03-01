import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { ArticleService } from '../../shared/services/article.service';
import { BannerComponent } from '../../shared/components/banner/banner';
import { Article } from '../../shared/models/article.model';
import { ArticleMetaComponent } from './article-meta/article-meta';
import { UserService } from '../../shared/services/user.service';
import { Footer } from "../../shared/components/footer/footer";
import { TagList } from "../../shared/components/tag-list/tag-list";

@Component({
  selector: 'app-article-detail,BannerComponent,ArticleMetaComponent,Footer',
  standalone: true,
  templateUrl: './article-detail.html',
  styleUrls: ['./article-detail.scss'],
  imports: [BannerComponent, ArticleMetaComponent, Footer, TagList],
})
export class ArticleDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly articleService = inject(ArticleService);
  private readonly userService = inject(UserService);

  article = signal<Article | null>(null);
  isLoggedIn = () => this.userService.isLoggedIn();

ngOnInit() {
  this.route.paramMap
    .pipe(
      switchMap(params =>
        this.articleService.getArticleBySlug(params.get('slug')!)
      )
    )
    .subscribe(article => this.article.set(article));
}
}
