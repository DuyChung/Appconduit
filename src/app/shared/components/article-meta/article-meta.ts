import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Author } from '../../models/author.model';
import { UserService } from '../../services/user.service';
import { ArticleActionService } from '../../services/article-action.service';

@Component({
  selector: 'app-article-meta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './article-meta.html',
  styleUrl: './article-meta.scss',
})
export class ArticleMetaComponent {
  @Input({ required: true }) author!: Author;
  @Input({ required: true }) createdAt!: string;

  @Input({ required: true }) slug!: string;
  @Input() favorited = false;
  @Input() favoritesCount = 0;

  private readonly userService = inject(UserService);
  private readonly actionService = inject(ArticleActionService);

  isLoggedIn = () => this.userService.isLoggedIn();

  toggleFollow() {
    if (!this.isLoggedIn()) return;

    const req$ = this.author.following
      ? this.actionService.unfollow(this.author.username)
      : this.actionService.follow(this.author.username);

    req$.subscribe(profile => {
      this.author.following = profile.following;
    });
  }

  toggleFavorite() {
    if (!this.isLoggedIn()) return;

    const req$ = this.favorited
      ? this.actionService.unfavorite(this.slug)
      : this.actionService.favorite(this.slug);

    req$.subscribe(article => {
      this.favorited = article.favorited;
      this.favoritesCount = article.favoritesCount;
    });
  }
}