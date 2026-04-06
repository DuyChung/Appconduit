import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticleService } from '../../shared/services/article.service';
import { CreateArticleRequest } from '../../shared/models/article.model';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TagListControlComponent } from './tag-list-control/tag-list-control';

type ErrorResponse = {
  body: string[];
};

@Component({
  selector: 'app-new-article',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TagListControlComponent],
  templateUrl: './new-article.html',
  styleUrls: ['./new-article.scss'],
})
export class NewArticleComponent {
  private readonly articleService = inject(ArticleService);
  private readonly router = inject(Router);

  readonly loading = signal(false);
  readonly errorResponse = signal<ErrorResponse | null>(null);

  readonly articleForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    body: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    tagList: new FormControl<string[]>([], { nonNullable: true }),
  });

  submit() {
    if (this.articleForm.invalid) return;

    this.loading.set(true);
    this.errorResponse.set(null);

    const { title, description, body, tagList } = this.articleForm.getRawValue();

    const payload: CreateArticleRequest = {
      article: {
        title,
        description,
        body,
        tagList,
      },
    };

    this.articleService.createArticle(payload).subscribe({
      next: (res) => {
        const slug = res.article?.slug;
        this.router.navigate(['/article', slug]);
      },
      error: (err: HttpErrorResponse) => {
        this.errorResponse.set({
          body: this.mapErrorResponse(err),
        });
        this.loading.set(false);
      },
      complete: () => {
        this.loading.set(false);
      },
    });
  }

  private mapErrorResponse(err: HttpErrorResponse): string[] {
    const error = err.error as { body: string[] } | { errors: Record<string, string[]> } | null;

    if (!error) return ['Something went wrong'];

    if ('body' in error) return error.body;

    if ('errors' in error) return Object.values(error.errors).flat();

    return ['Something went wrong'];
  }
}
