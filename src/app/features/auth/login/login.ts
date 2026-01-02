import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { gmailValidator, passwordStrongValidator } from '../../../validators/auth.validator';
import { dataService } from '../../../shared/services/data.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  private readonly dataService = inject(dataService);
  private readonly router = inject(Router);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly emailNotRegistered = signal(false);

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

  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  submit(form: HTMLFormElement) {
    this.emailNotRegistered.set(false);
    this.error.set(null);

    const emailInput = form.querySelector('input[formControlName="email"]') as HTMLInputElement;

    const passwordInput = form.querySelector(
      'input[formControlName="password"]',
    ) as HTMLInputElement;

    emailInput.setCustomValidity('');
    passwordInput.setCustomValidity('');

    if (this.email.errors?.['required']) {
      emailInput.setCustomValidity('Email is required !');
    } else if (this.email.errors?.['email']) {
      emailInput.setCustomValidity('Please enter a valid email address !');
    } else if (this.email.errors?.['gmail']) {
      emailInput.setCustomValidity('Please use a Gmail address (@gmail.com) !');
    }

    if (this.password.errors?.['required']) {
      passwordInput.setCustomValidity('Password cannot be empty !');
    } else if (this.password.errors?.['digitCount']) {
      passwordInput.setCustomValidity('Password requires a minimum of 3 numeric characters !');
    } else if (this.password.errors?.['specialChar']) {
      passwordInput.setCustomValidity('Password requires at least one special character !');
    }

    this.loginForm.markAllAsTouched();

    if (this.loginForm.invalid) {
      form.reportValidity();
      return;
    }

    this.loading.set(true);

    const email = this.email.value;
    const password = this.password.value;

    this.dataService.login(email, password).subscribe({
      next: (res) => {
        this.dataService['authStore'].setUser(res.user);
        this.router.navigate(['/']);
      },
      error: (err) => {
        if (err.status === 422 || err.status === 403) {
          this.emailNotRegistered.set(true);
        }
        this.loading.set(false);
      },
      complete: () => {
        this.loading.set(false);
      },
    });
  }
}
