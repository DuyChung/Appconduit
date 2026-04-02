import { Component, inject, signal, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile } from '../../models/profile.model';
import { Article } from '../../models/article.model';
import { ProfileService } from '../../services/profile.service';


@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss'],
})
export class ProfileComponent {
  private route = inject(ActivatedRoute);
  private profileService = inject(ProfileService);

  profile = signal<Profile | null>(null);
  articles = signal<Article[]>([]);

  username = this.route.snapshot.paramMap.get('username') ?? '';

  constructor() {
    this.loadData();
  }

  loadData() {
    this.profileService.getProfile(this.username).subscribe(res => {
      this.profile.set(res.profile);
    });

    this.profileService.getArticlesByAuthor(this.username).subscribe(res => {
      this.articles.set(res.articles);
    });
  }

  articleCount = computed(() => this.articles().length);
}