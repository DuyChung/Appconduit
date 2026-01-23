import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { passwordStrongValidator } from '../../../validators/auth.validator';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthStore } from '../../../shared/stores/auth.store';
import { AuthResponse } from '../../../shared/models/auth-response.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
})
export class RegisterComponent {
  private readonly authStore = inject(AuthStore);
  private readonly router = inject(Router);

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly registerForm = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, passwordStrongValidator],
    }),
  });

  submit(form: HTMLFormElement) {
    this.registerForm.markAllAsTouched();

    if (this.registerForm.invalid) {
      form.reportValidity();
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    const { username, email, password } =
      this.registerForm.getRawValue();

    this.authStore
      .register(username, email, password)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => this.router.navigate(['/login']),
        error: (err: HttpErrorResponse) => {
          this.error.set(this.parseAuthError(err));
        },
      });
  }

  private parseAuthError(err: HttpErrorResponse): string {
    const backendError = err.error as AuthResponse;

    return backendError?.errors
      ? Object.values(backendError.errors).flat().join(', ')
      : 'Register failed';
  }
}
