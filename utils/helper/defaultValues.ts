import { today, nextDueDate } from "@/app/components/dashboard/datePicker";
import { JobFormData, LoginFormData, SignUpFormData } from "../zodSchema";

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
