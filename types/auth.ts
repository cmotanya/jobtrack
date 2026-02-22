export type AuthSignInProps = {
  email: string;
  password: string;
};

export type AuthSignUpProps = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type AuthForgotPasswordProps = {
  email: string;
};

export type AuthResetPasswordProps = {
  password: string;
  confirmPassword: string;
};

export type AuthVerifyOTPProps = {
  email: string;
  otp: string;
};
