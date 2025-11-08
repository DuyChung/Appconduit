import { Component, Input, Output, EventEmitter, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.html',
  styleUrls: ['./pagination.scss']
})
export class PaginationComponent {
  @Input({ required: true }) totalPages = 1;
  @Input() currentPage = 1;
  @Output() pageChange = new EventEmitter<number>();

  pages = computed(() => {
    const total = this.totalPages;
    const current = this.currentPage;
    const range: number[] = [];

    if (total <= 7) {
      for (let i = 1; i <= total; i++) range.push(i);
    } else {
      if (current <= 4) {
        range.push(1, 2, 3, 4, 5, -1, total);
      } else if (current >= total - 3) {
        range.push(1, -1, total - 4, total - 3, total - 2, total - 1, total);
      } else {
        range.push(1, -1, current - 1, current, current + 1, -1, total);
      }
    }
    return range;
  });

  setPage(page: number) {
    if (page > 0 && page <= this.totalPages && page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }
}
