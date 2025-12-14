import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CommonModule, RouterLink, ],
  templateUrl: './article-list.html',
    styleUrls: ['./article-list.scss'],
})
export class ArticleListComponent {
  @Input() articles: any[] = [];
}

