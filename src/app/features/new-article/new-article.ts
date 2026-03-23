import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticleService } from '../../shared/services/article.service';
import { CreateArticleRequest } from '../../shared/models/article.model';

@Component({
  selector: 'app-new-article',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './new-article.html',
  styleUrls: ['./new-article.scss'],
})
export class NewArticleComponent {
  private fb = inject(FormBuilder);
  private articleService = inject(ArticleService);
  private router = inject(Router);

  form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    body: ['', Validators.required],
  });

  tagList: string[] = [];
  tagInput = this.fb.nonNullable.control('');
  addTag() {
    const value = this.tagInput.value.trim();

    if (value) {
      this.tagList.push(value);
      this.tagInput.setValue('');
    }
  }

  removeTag(tag: string) {
    this.tagList = this.tagList.filter((t) => t !== tag);
  }

 submit() {
  console.log('CLICK SUBMIT');

  if (this.form.invalid) return;

  const payload = {
    article: {
      ...this.form.getRawValue(),
      tagList: this.tagList,
    },
  };

  console.log('PAYLOAD:', payload);

  this.articleService.createArticle(payload).subscribe({
    next: (res) => {
      console.log('RES:', res);

      const slug = res.article?.slug;
      console.log('SLUG:', slug);

      this.router.navigate(['/article', slug]);
    },
    error: (err) => {
      console.log('ERROR:', err);
    },
  });
}
}
