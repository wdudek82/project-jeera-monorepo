export enum AuthenticationError {
  INCORRECT_EMAIL = 'incorrectEmail',
  INACTIVE_ACCOUNT = 'inactiveAccount',
  INCORRECT_PASSWORD = 'incorrectPassword',
}

export const AuthenticationErrors: string[] = [
  AuthenticationError.INCORRECT_EMAIL,
  AuthenticationError.INACTIVE_ACCOUNT,
  AuthenticationError.INCORRECT_PASSWORD,
];

export function isAuthenticationError(message: string): boolean {
  console.log('error:', message);
  return AuthenticationErrors.includes(message);
}
