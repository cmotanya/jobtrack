import { UseFormReset } from "react-hook-form";
import { JobProps } from "./dashboard";
import { VerifyOTPFormData } from "@/helpers/zodSchema";

export type AuthSignInProps = {
  email: string;
  password: string;
};

export type AuthSignUpProps = {
  full_name: string;
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

export type AuthOptionSignIn = {
  reset: UseFormReset<AuthSignInProps>;
};

export type AuthOptionSignUp = {
  reset: UseFormReset<AuthSignUpProps>;
};

export type AuthOptionVerifyOtp = {
  reset: UseFormReset<VerifyOTPFormData>;
};

export type AuthOptionPasswordReset = {
  reset: UseFormReset<AuthResetPasswordProps>;
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>;
};

export type TodaysJobsProps = {
  isLoading: boolean;
  todayJobs: JobProps[];
};
