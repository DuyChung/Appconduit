import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {  RouterLink } from '@angular/router';
import { passwordStrongValidator } from '../../../validators/auth.validator';
import { AuthStore } from '../../../shared/stores/auth.store';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
})
export class RegisterComponent implements OnDestroy {
  private readonly authStore = inject(AuthStore);
  readonly loading = this.authStore.loading;
  readonly errorResponse = this.authStore.errorResponse;

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

  register() {
    if (this.registerForm.invalid) return;

    const { username, email, password } = this.registerForm.getRawValue();
    this.authStore.register(username, email, password);
  }

  ngOnDestroy(): void {
    this.authStore.resetErrorResponse();
  }

}
