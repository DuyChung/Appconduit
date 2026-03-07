import { Component, input, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Article } from '../../../shared/models/article.model';
import { ArticleService } from '../../../shared/services/article.service';
import { ProfileService } from '../../../shared/services/profile.service';
import { AuthStore } from '../../../shared/stores/auth.store';

@Component({
  selector: 'app-article-meta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './article-meta.html',
  styleUrl: './article-meta.scss',
})
export class ArticleMetaComponent implements OnInit {

  article = input.required<Article>();

  private readonly authStore = inject(AuthStore);
  private readonly articleService = inject(ArticleService);
  private readonly profileService = inject(ProfileService);

  isLoggedIn = () => this.authStore.isLoggedIn();

  following = signal(false);
  favorited = signal(false);
  favoritesCount = signal(0);

  ngOnInit() {
    const a = this.article();
    this.following.set(a.author.following);
    this.favorited.set(a.favorited);
    this.favoritesCount.set(a.favoritesCount);
  }

  toggleFollow() {
    if (!this.isLoggedIn()) return;

    const username = this.article().author.username;

    const req$ = this.following()
      ? this.profileService.unfollow(username)
      : this.profileService.follow(username);

    req$.subscribe(({ profile }) => {
      this.following.set(profile.following);
    });
  }

  toggleFavorite() {
    if (!this.isLoggedIn()) return;

    const { slug } = this.article();

    const req$ = this.favorited()
      ? this.articleService.unfavorite(slug)
      : this.articleService.favorite(slug);

    req$.subscribe(({ article }) => {
      this.favorited.set(article.favorited);
      this.favoritesCount.set(article.favoritesCount);
    });
  }
  
}