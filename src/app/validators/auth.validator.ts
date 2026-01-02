import { AbstractControl, ValidationErrors } from '@angular/forms';

export function gmailValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value as string;

  if (!value) return null;

  return value.endsWith('@gmail.com') ? null : { gmail: true };
}

export function passwordStrongValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value as string;

  if (!value) return null;

  const digitCount = (value.match(/\d/g) || []).length;
  const hasSpecialChar = /[^a-zA-Z0-9]/.test(value);

  if (digitCount < 3) {
    return { digitCount: true };
  }

  if (!hasSpecialChar) {
    return { specialChar: true };
  }

  return null;
}
