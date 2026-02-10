import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Author } from '../../models/author.model';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner.html',
  styleUrl: './banner.scss',
})
export class BannerComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) author!: Author;
  @Input() createdAt!: string;
}
