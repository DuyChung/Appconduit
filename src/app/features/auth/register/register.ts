import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { userService } from '../../../shared/services/user.service';
import { finalize } from 'rxjs/operators';
import { passwordStrongValidator } from '../../../validators/auth.validator';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
})
export class RegisterComponent {
  private readonly dataService = inject(userService);
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
    this.resetState();
    this.applyCustomErrors(form);

    this.registerForm.markAllAsTouched();

    if (this.registerForm.invalid) {
      form.reportValidity();
      return;
    }

    this.loading.set(true);

    const { username, email, password } = this.registerForm.getRawValue();

    this.dataService
      .register(username, email, password)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (res) => {
          localStorage.setItem('token', res.user.token);
          this.router.navigate(['/']);
        },
        error: (err) => this.handleRegisterError(err),
      });
  }

  private resetState() {
    this.error.set(null);
  }

  private applyCustomErrors(form: HTMLFormElement) {
    this.setErrors(form, 'username', this.registerForm.controls.username, {
      required: 'Username is required!',
    });

    this.setErrors(form, 'email', this.registerForm.controls.email, {
      required: 'Email is required!',
      email: 'Please enter a valid email address!',
    });

    this.setErrors(form, 'password', this.registerForm.controls.password, {
      required: 'Password cannot be empty!',
      digitCount: 'Password must contain at least 3 digits!',
      specialChar: 'Password must contain at least one special character!',
    });
  }

  private setErrors(
    form: HTMLFormElement,
    controlName: string,
    control: AbstractControl,
    messages: Record<string, string>,
  ) {
    const input = form.querySelector(`input[formControlName="${controlName}"]`) as HTMLInputElement;

    input.setCustomValidity('');

    if (!control.errors) return;

    const firstErrorKey = Object.keys(control.errors)[0];
    input.setCustomValidity(messages[firstErrorKey] ?? '');
  }

  private handleRegisterError(err: any) {
    if (err.status === 422) {
      this.error.set('Email or username already exists');
    }
  }
}
