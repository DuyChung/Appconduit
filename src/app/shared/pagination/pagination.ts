import { Component, computed, input, model } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.html',
  styleUrls: ['./pagination.scss'],
})
export class PaginationComponent {
  totalPages = input.required<number>();
  pageActive = model.required<number>();

  pages = computed(() => {
    const total = this.totalPages();
    const current = this.pageActive();
    const out: (number | string)[] = [];

    if (total <= 8) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    if (current <= 4) {
      return [1, 2, 3, 4, 5, '...', total];
    }

    if (current >= total - 3) {
      return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
    }

    return [1, '...', current - 1, current, current + 1, '...', total];
  });

  clickPage(num: number) {
    this.pageActive.set(num);
  }

  clickBackward() {
    if (this.pageActive() > 1) {
      this.pageActive.update((v) => v - 1);
    }
  }

  clickForward() {
    if (this.pageActive() < this.totalPages()) {
      this.pageActive.update((v) => v + 1);
    }
  }
}
