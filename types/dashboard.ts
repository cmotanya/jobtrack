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

export type JobProgressTypes =
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
  job_progress: JobProgressTypes;
  payment_status: PaymentStatusTypes;
  amount: number;
  start_date: string;
  due_date: string;
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
  job_progress: JobProgressTypes;
  payment_status: PaymentStatusTypes;
  amount: number;
  start_date: string;
  due_date: string;
  createdAt: string;
  updatedAt: string;
};

export type FetchJobsProps = {
  jobs: JobProps[];
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setJobs: React.Dispatch<React.SetStateAction<JobProps[]>>;
};
