import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { passwordStrongValidator } from '../../../validators/auth.validator';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthStore } from '../../../shared/stores/auth.store';

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
  this.applyClientErrors(form);

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
      next: () => this.router.navigate(['/']),
      error: (err: HttpErrorResponse) =>
        this.handleRegisterError(err, form),
    });
}


  private applyClientErrors(form: HTMLFormElement) {
    this.setControlError(form, 'username', this.registerForm.controls.username, {
      required: 'Username is required',
    });

    this.setControlError(form, 'email', this.registerForm.controls.email, {
      required: 'Email is required',
      email: 'Please enter a valid email address',
    });

    this.setControlError(form, 'password', this.registerForm.controls.password, {
      required: 'Password cannot be empty',
      digitCount: 'Password must contain at least 3 digits',
      specialChar: 'Password must contain at least one special character',
    });
  }

  private handleRegisterError(err: HttpErrorResponse, form: HTMLFormElement): void {
    if (err.status === 422) {
      this.registerForm.controls.email.setErrors({ server: true });
      this.setServerError(form, 'email', 'Email or username already exists');
      return;
    }

    this.error.set('Something went wrong. Please try again.');
  }

  private setControlError(
    form: HTMLFormElement,
    controlName: string,
    control: FormControl,
    messages: Record<string, string>,
  ) {
    const input = form.querySelector(
      `input[formControlName="${controlName}"]`,
    ) as HTMLInputElement | null;

    if (!input) return;

    input.setCustomValidity('');

    const errors = control.errors;
    if (!errors) return;

    const errorKey = Object.keys(errors)[0];
    input.setCustomValidity(messages[errorKey] ?? '');
  }

  private setServerError(form: HTMLFormElement, controlName: string, message: string) {
    const input = form.querySelector(
      `input[formControlName="${controlName}"]`,
    ) as HTMLInputElement | null;

    if (!input) return;

    input.setCustomValidity(message);
    form.reportValidity();
  }
}
