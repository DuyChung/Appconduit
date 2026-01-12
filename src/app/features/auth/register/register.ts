import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { dataService } from '../../../shared/services/data.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
})
export class RegisterComponent {
  private readonly dataService = inject(dataService);
  private readonly router = inject(Router);

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly registerForm = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  submit(form: HTMLFormElement) {
    this.error.set(null);

    const usernameInput = form.querySelector(
      'input[formControlName="username"]',
    ) as HTMLInputElement;

    const emailInput = form.querySelector('input[formControlName="email"]') as HTMLInputElement;

    const passwordInput = form.querySelector(
      'input[formControlName="password"]',
    ) as HTMLInputElement;

    usernameInput.setCustomValidity('');
    emailInput.setCustomValidity('');
    passwordInput.setCustomValidity('');

    if (this.registerForm.controls.username.errors?.['required']) {
      usernameInput.setCustomValidity('Username is required!');
    } else if (this.registerForm.controls.username.errors?.['minlength']) {
      usernameInput.setCustomValidity('Username must be at least 3 characters!');
    }

    if (this.registerForm.controls.email.errors?.['required']) {
      emailInput.setCustomValidity('Email is required!');
    } else if (this.registerForm.controls.email.errors?.['email']) {
      emailInput.setCustomValidity('Please enter a valid email address!');
    } else if (this.registerForm.controls.email.errors?.['gmail']) {
      emailInput.setCustomValidity('Please use a Gmail address (@gmail.com)!');
    }

    if (this.registerForm.controls.password.errors?.['required']) {
      passwordInput.setCustomValidity('Password cannot be empty!');
    } else if (this.registerForm.controls.password.errors?.['digitCount']) {
      passwordInput.setCustomValidity('Password requires a minimum of 3 numeric characters!');
    } else if (this.registerForm.controls.password.errors?.['specialChar']) {
      passwordInput.setCustomValidity('Password requires at least one special character!');
    }

    this.registerForm.markAllAsTouched();

    if (this.registerForm.invalid) {
      form.reportValidity();
      return;
    }
    this.loading.set(true);

    const { username, email, password } = this.registerForm.getRawValue();

    this.dataService.register(username!, email!, password!).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.user.token);
        this.router.navigate(['/']);
      },
      error: (err) => {
        if (err.status === 422) {
          this.error.set('Email or username already exists');
        }
        this.loading.set(false);
      },
      complete: () => {
        this.loading.set(false);
      },
    });
  }
}
