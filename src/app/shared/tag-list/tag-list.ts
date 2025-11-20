import { Component , input } from '@angular/core';

@Component({
  selector: 'app-tag-list',
  imports: [],
  templateUrl: './tag-list.html',
  styleUrl: './tag-list.scss',
})
export class TagList {
  tag = input<string>();
}

