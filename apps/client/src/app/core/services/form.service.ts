import { Injectable } from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor() {}

  getInputErrorMessage(control: AbstractControl): string {
    if (control.hasError('required')) {
      return 'Field is required';
    }
    if (control.hasError('minlength')) {
      const requiredLength = control.getError('minlength')['requiredLength'];
      return `Provided value is too short (should be at least ${requiredLength} characters)`;
    }
    if (control.hasError('maxlength')) {
      const requiredLength = control.getError('maxlength')['requiredLength'];
      return `Provided value is too long (should be at most ${requiredLength} characters)`;
    }
    if (control.hasError('pattern')) {
      return 'Incorrect format';
    }
    if (control.hasError('email')) {
      return 'Please provide a valid email address';
    }
    if (control.hasError('emailIsNotUnique')) {
      return 'E-mail address is already in use';
    }

    return '';
  }

  getFormErrorMessage(formGroup: FormGroup): string {
    if (formGroup.hasError('incorrectEmail')) {
      return 'Incorrect email';
    }
    if (formGroup.hasError('incorrectPassword')) {
      return 'Incorrect password';
    }
    if (formGroup.hasError('inactiveAccount')) {
      return 'Inactive account';
    }
    return '';
  }
}
