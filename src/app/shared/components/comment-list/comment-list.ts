import { Component, Input, inject, signal, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Comment } from '../../models/article.model';

@Component({
  selector: 'app-article-comments',
  standalone: true,
  templateUrl: './comment-list.html',
  styleUrl: './comment-list.scss',
  imports: [DatePipe, FormsModule],
})
export class ArticleCommentsComponent implements OnInit {
  private articleService = inject(ArticleService);

  @Input() slug!: string;

  comments = signal<Comment[]>([]);
  commentBody = '';

  ngOnInit() {
    this.loadComments();
  }

  loadComments() {
    this.articleService.getComments(this.slug).subscribe((res) => {
      this.comments.set(res.comments);
    });
  }

  postComment() {
    if (!this.commentBody) return;

    this.articleService.addComment(this.slug, this.commentBody).subscribe((res: any) => {
      this.comments.update((c) => [res.comment, ...c]);
      this.commentBody = '';
    });
  }

  deleteComment(id: number) {
    this.articleService.deleteComment(this.slug, id).subscribe(() => {
      this.comments.update((c) => c.filter((comment) => comment.id !== id));
    });
  }
}
