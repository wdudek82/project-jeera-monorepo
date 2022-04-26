import { User, UserRoles } from '@core/models';

export interface SignUpCredentials {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface SignUpRes extends User {}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignInRes extends User {}

export interface CheckAuthRes {
  authenticated: boolean;
  signedInUser: {
    email: string;
    name: string;
    role: UserRoles;
  };
}
