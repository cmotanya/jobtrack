import { JobFormData } from "@/helpers/zodSchema";
import { UseFormReset } from "react-hook-form";
import JobTitleCombobox from "../components/dashboard/jobTitleCombobox";

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
  id: string;
  reset: UseFormReset<JobFormData>;
  setIsDialogOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

export type HandleJobSubmitProps = {
  data: JobFormData;
  id?: string;
};

export type JobDialogProps = {
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  initialValues?: JobProps;
};

export type JobProps = {
  id: string;
  uuid: string;
  title: string;
  client: string;
  job_progress: JobProgressTypes;
  payment_status: PaymentStatusTypes;
  amount: number;
  start_date: string;
  due_date: string;
  location: string;
  createdAt: string;
  updatedAt: string;
};

export type FetchJobsProps = {
  jobs: JobProps[];
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setJobs: React.Dispatch<React.SetStateAction<JobProps[]>>;
};

export type JobProgressProps = {
  value: JobProgressTypes;
  onChange: (value: JobProgressTypes) => void;
};

export type JobTitleComboboxProps = {
  value: string;
  onChange: (val: string) => void;
  onBlur: () => void;
  hasError: boolean;
  isTouched: boolean;
};

export type LocationComboboxProps = {
  value: string;
  onChange: (val: string) => void;
  onBlur: () => void;
  hasError: boolean;
  isTouched: boolean;
};
