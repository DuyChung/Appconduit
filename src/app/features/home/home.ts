import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  articles = [
    { author: 'pradaman', title: 'Celular xiaomi', desc: 'bài tập hôm nay là về ', date: 'October 31, 2025' },
    { author: 'testuser1761745955343', title: 'Original Title', desc: 'Original Description', date: 'October 29, 2025' }
  ];

  tags = ['frontend', 'backend', 'science', 'angular', 'typescript', 'test', 'example'];

}
