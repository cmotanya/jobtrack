import { JobFormData } from "@/helpers/zodSchema";
import { UseFormReset } from "react-hook-form";

export type HandleStartDateProps = {
  value: string;
  setStartDate: (value: string) => void;
  manualDueDate: boolean;
  setDueDate: (value: string) => void;
};

export type SideBarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
};

export type JobStatusTypes =
  | "scheduled"
  | "in-progress"
  | "on-hold"
  | "completed"
  | "cancelled";

export type PaymentStatusTypes = "unpaid" | "partial" | "paid";

export type JobFormValues = {
  title: string;
  client: string;
  location: string;
  status: JobStatusTypes;
  paymentStatus: PaymentStatusTypes;
  amount: number;
  startDate: string;
  dueDate: string;
};

export type OnJobSubmitProps = {
  data: JobFormData;
  reset: UseFormReset<JobFormData>;
  setIsDialogOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

export type HandleJobSubmitProps = {
  data: JobFormData;
};

export type JobDialogProps = {
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type JobProps = {
  id: string;
  title: string;
  client: string;
  status: JobStatusTypes;
  paymentStatus: PaymentStatusTypes;
  amount: number;
  startDate: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
};
