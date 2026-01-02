import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { gmailValidator, passwordStrongValidator } from '../../../validators/auth.validator';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  private http = inject(HttpClient);
  private router = inject(Router);

  loading = signal(false);
  error = signal<string | null>(null);

  readonly emailControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.email, gmailValidator],
  });

  readonly passwordControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, passwordStrongValidator],
  });

  readonly loginForm = new FormGroup({
    email: this.emailControl,
    password: this.passwordControl,
  });

  submit() {
    console.log('FORM VALID:', this.loginForm.valid);
    console.log('EMAIL ERR:', this.emailControl.errors);
    console.log('PASS ERR:', this.passwordControl.errors);

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    setTimeout(() => {
      localStorage.setItem('token', 'FAKE_LOGIN_TOKEN');

      this.loading.set(false);
      this.router.navigate(['/home']);
    }, 800);
  }
}
