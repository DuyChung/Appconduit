import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { gmailValidator, passwordStrongValidator } from '../../../validators/auth.validator';
import { userService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  private readonly dataService = inject(userService);
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

  submit(form: HTMLFormElement) {
    this.resetState();
    this.applyCustomErrors(form);

    this.loginForm.markAllAsTouched();

    if (this.loginForm.invalid) {
      form.reportValidity();
      return;
    }

    this.loading.set(true);

    const { email, password } = this.loginForm.getRawValue();

    this.dataService.login(email, password).subscribe({
      next: (res) => {
        this.dataService['authStore'].setUser(res.user);
        this.router.navigate(['/']);
      },
      error: (err) => this.handleLoginError(err),
      complete: () => this.loading.set(false),
    });
  }

  private resetState() {
    this.emailNotRegistered.set(false);
    this.error.set(null);
  }

  private applyCustomErrors(form: HTMLFormElement) {
    this.setErrors(form, 'email', this.loginForm.controls.email, {
      required: 'Email is required !',
      email: 'Please enter a valid email address !',
      gmail: 'Please use a Gmail address (@) !',
    });

    this.setErrors(form, 'password', this.loginForm.controls.password, {
      required: 'Password cannot be empty !',
      digitCount: 'Password requires a minimum of 3 numeric characters !',
      specialChar: 'Password requires at least one special character !',
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

  private handleLoginError(err: any) {
    if (err.status === 422 || err.status === 403) {
      this.emailNotRegistered.set(true);
    }
    this.loading.set(false);
  }
}
