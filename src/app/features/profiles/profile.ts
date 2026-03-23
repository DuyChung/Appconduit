import { Component, inject, signal, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile } from '../../shared/models/profile.model';
import { Article } from '../../shared/models/article.model';
import { ProfileService } from '../../shared/services/profile.service';
import { ArticleService } from '../../shared/services/article.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss'],
})
export class ProfileComponent {
  private route = inject(ActivatedRoute);
  private profileService = inject(ProfileService);
  private articleService = inject(ArticleService);

  profile = signal<Profile | null>(null);
  articles = signal<Article[]>([]);

  username = this.route.snapshot.paramMap.get('username') ?? '';

  constructor() {
    this.loadData();
  }

  loadData() {
    this.profileService.getProfile(this.username).subscribe((res) => {
      this.profile.set(res.profile);
    });

    this.articleService.getArticles(10, 0, { author: this.username }).subscribe((res) => {
      this.articles.set(res.articles);
    });
  }

  articleCount = computed(() => this.articles().length);
}
