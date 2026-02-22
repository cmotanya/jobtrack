import { today, nextDueDate } from "@/app/components/dashboard/datePicker";
import {
  ForgotPasswordFormData,
  JobFormData,
  LoginFormData,
  ResetPasswordFormData,
  SignUpFormData,
} from "../zodSchema";

export const getDefaultLoginValues = (): LoginFormData => {
  return {
    email: "",
    password: "",
  };
};

export const getDefaultSignUpValues = (): SignUpFormData => {
  return {
    fullName: "",
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
    status: "in-progress",
    paymentStatus: "unpaid",
    amount: 0,
    startDate: today,
    dueDate: nextDueDate,
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