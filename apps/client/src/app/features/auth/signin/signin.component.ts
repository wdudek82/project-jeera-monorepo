import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FormService } from '@client/core/services/form.service';
import { InputType } from '@client/shared/models/form';
import { AuthService } from '@client/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  form!: FormGroup;
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

  get email(): AbstractControl {
    return this.form.get('email')!;
  }

  get password(): AbstractControl {
    return this.form.get('password')!;
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
        console.log(err);
        switch (err.status) {
          case 404:
            this.form.setErrors({ accountNotFound: true });
            break;
          case 400:
            const { message } = err.error;
            if (message === 'inactive account') {
              this.form.setErrors({ inactiveAccount: true });
            } else if (message === 'incorrect password') {
              this.form.setErrors({ incorrectPassword: true });
            }
            break;
          case 0:
            this.toastr.error(
              'Could not connect with server',
              'Connection Error',
            );
            break;
          default:
            this.toastr.error('Something went wrong', 'Error');
        }
      },
    });
  }
}
