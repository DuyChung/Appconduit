import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-article-preview',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './article-preview.html',
  styleUrls: ['./article-preview.scss'],
})
export class ArticlePreviewComponent {
  @Input({ required: true }) article!: any;
}
