import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { gmailValidator, passwordStrongValidator } from '../../../validators/auth.validator';
import { AuthStore } from '../../../shared/stores/auth.store';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  private readonly authStore = inject(AuthStore);
  private readonly router = inject(Router);

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly loginForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email, gmailValidator],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, passwordStrongValidator],
    }),
  });

  private setInputError(
    form: HTMLFormElement,
    controlName: string,
    errors: Record<string, any> | null,
    messages: Record<string, string>,
  ) {
    const input = form.querySelector(`input[formControlName="${controlName}"]`) as HTMLInputElement;

    if (!input) return;

    input.setCustomValidity('');

    if (errors) {
      const errorKey = Object.keys(errors)[0];
      input.setCustomValidity(messages[errorKey] ?? '');
    }
  }

  private applyCustomValidation(form: HTMLFormElement) {
    this.setInputError(form, 'email', this.loginForm.controls.email.errors, {
      required: 'Email is required',
      email: 'Please enter a valid email address',
      gmail: 'Please use a Gmail address (@gmail.com)',
    });

    this.setInputError(form, 'password', this.loginForm.controls.password.errors, {
      required: 'Password cannot be empty',
    });
  }

  submit(form: HTMLFormElement) {
    this.loginForm.markAllAsTouched();
    this.applyCustomValidation(form);

    if (this.loginForm.invalid) {
      form.reportValidity();
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    const { email, password } = this.loginForm.getRawValue();

    this.authStore
      .login(email!, password!)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => this.router.navigate(['/home']),
        error: () => this.error.set('Invalid email or password'),
      });
  }
}
