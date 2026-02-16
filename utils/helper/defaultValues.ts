import { today, nextDueDate } from "@/app/components/dashboard/datePicker";
import { InputSchemaData, JobSchemaData } from "../zodSchema";

export const getDefaultValues = (): JobSchemaData => {
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

export const getDefaultLoginValues = (): InputSchemaData => {
  return {
    email: "",
    password: "",
  };
};
