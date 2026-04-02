import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Profile } from '../../shared/models/profile.model';
import { Article } from '../../shared/models/article.model';
import { ProfileService } from '../../shared/services/profile.service';
import { ArticleService } from '../../shared/services/article.service';
import { CommonModule } from '@angular/common';
import { AuthStore } from '../../shared/stores/auth.store';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss'],
})
export class ProfileComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private profileService = inject(ProfileService);
  private articleService = inject(ArticleService);
  private authStore = inject(AuthStore);

  username = '';
  articleCount = signal(0);
  profile = signal<Profile | null>(null);
  articles = signal<Article[]>([]);
isMyProfile = computed(() => {
  const currentUser = this.authStore.user();
  return currentUser?.username === this.username;
});
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.username = params.get('username') ?? '';
      this.loadData();
    });
  }

  loadData() {
    if (!this.username) return;

    this.profileService.getProfile(this.username).subscribe((res) => {
      this.profile.set(res.profile);
    });

    this.articleService.getArticles(10, 0, { author: this.username }).subscribe((res) => {
      this.articles.set(res.articles);
      this.articleCount.set(res.articlesCount);
    });
  }
}
