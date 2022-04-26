import { AbstractControl, ValidationErrors, Validator } from '@angular/forms';

export class MatchPasswordValidator implements Validator {
  validate(formGroup: AbstractControl): ValidationErrors | null {
    const { password, passwordConfirmation } = formGroup.value;
    if (password === passwordConfirmation) {
      return null;
    }
    return { passwordsDontMatch: true };
  }
}
