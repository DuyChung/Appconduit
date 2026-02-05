import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-banner',
  standalone: true,
  templateUrl: './banner.html',
  styleUrl: './banner.scss',
})
export class BannerComponent {
  @Input({ required: true }) title!: string;
  @Input() author?: string;
  @Input() avatar?: string;
  @Input() createdAt?: string | null;
}
