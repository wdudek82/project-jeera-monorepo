import { User, UserRoles } from '@client/core/types';

export interface SignUpCredentials {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface CheckAuthRes {
  authenticated: boolean;
  signedInUser: {
    email: string;
    name: string;
    role: UserRoles;
  };
}
