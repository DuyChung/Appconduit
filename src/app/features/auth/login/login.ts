import { Component, inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthStore } from '../../../shared/stores/auth.store';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent implements OnDestroy {
  private readonly authStore = inject(AuthStore);

  readonly errorResponse = this.authStore.errorResponse;
  readonly loading = this.authStore.loading;

  readonly loginForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  login() {
    this.loginForm.markAllAsTouched();

    if (!this.loginForm.valid) return;

    const { email, password } = this.loginForm.getRawValue();
    this.authStore.login(email, password);
  }

  ngOnDestroy(): void {
    this.authStore.resetErrorResponse();
  }
}
