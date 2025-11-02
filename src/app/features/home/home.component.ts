import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent {
  articles = [
    { author: 'pradaman', title: 'Celular xiaomi', desc: 'Es un dispositivo móvil', date: 'October 31, 2025' },
    { author: 'testuser1761745955343', title: 'Original Title', desc: 'Original Description', date: 'October 29, 2025' }
  ];

  tags = ['frontend', 'backend', 'science', 'angular', 'typescript', 'test', 'example'];
}
