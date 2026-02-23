import { today, nextDueDate } from "@/components/dashboard/datePicker";
import {
  ForgotPasswordFormData,
  JobFormData,
  LoginFormData,
  ResetPasswordFormData,
  SignUpFormData,
} from "./zodSchema";

export const getDefaultLoginValues = (): LoginFormData => {
  return {
    email: "",
    password: "",
  };
};

export const getDefaultSignUpValues = (): SignUpFormData => {
  return {
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
};

export const getDefaultEmptyJobValues = (): JobFormData => {
  return {
    title: "",
    client: "",
    location: "",
    job_progress: "in-progress",
    payment_status: "unpaid",
    amount: 0,
    start_date: today,
    due_date: nextDueDate,
  };
};

export const getDefaultForgotPasswordValues = (): ForgotPasswordFormData => {
  return {
    email: "",
  };
};

export const getDefaultResetPasswordValues = (): ResetPasswordFormData => {
  return {
    password: "",
    confirmPassword: "",
  };
};

export const getDefaultVerifyOTPValues = (): { otp: string } => {
  return {
    otp: "",
  };
};
