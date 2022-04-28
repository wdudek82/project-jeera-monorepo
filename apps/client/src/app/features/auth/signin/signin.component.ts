import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder, FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FormService } from '@client/core/services/form.service';
import { InputType } from '@client/shared/models/form';
import { AuthService } from '@client/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { isAuthenticationError } from '@client/core/types/enums';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  hidePassword = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private formService: FormService,
    private authService: AuthService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  get inputType(): InputType {
    return this.hidePassword ? 'password' : 'text';
  }

  getInputErrorMessage(control: AbstractControl): string {
    return this.formService.getInputErrorMessage(control);
  }

  getFormErrorMessage(): string {
    return this.formService.getFormErrorMessage(this.form);
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.authService.signIn(this.form.value).subscribe({
      next: (res) => {
        this.toastr.success('You are now logged in', `Hello ${res.name}!`);
        this.router.navigateByUrl('/tickets');
      },
      error: (err) => {
        const { message } = err.error;
        if (isAuthenticationError(message)) {
          this.form.setErrors({ [message]: true })
        }
      },
    });
  }
}
