import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { ArticleService } from '../../services/article.service';
import { BannerComponent } from '../banner/banner';
import { Article } from '../../models/article.model';
import { ArticleMetaComponent } from '../article-meta/article-meta';
import { UserService } from '../../services/user.service';
import { Footer } from "../footer/footer";
import { TagList } from "../tag-list/tag-list";

@Component({
  selector: 'app-article-detail,BannerComponent,ArticleMetaComponent,Footer',
  standalone: true,
  templateUrl: './article-detail.html',
  styleUrls: ['./article-detail.scss'],
  imports: [BannerComponent, ArticleMetaComponent, Footer, TagList],
})
export class ArticleDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly articleService = inject(ArticleService);
  private readonly userService = inject(UserService);

  article = signal<Article | null>(null);
  isLoggedIn = () => this.userService.isLoggedIn();

  ngOnInit() {
    this.route.paramMap
      .pipe(switchMap((params) => this.articleService.getArticleBySlug(params.get('slug')!)))
      .subscribe((res) => this.article.set(res.article));
  }
}
