import { JobSchemaData } from "@/utils/zodSchema";
import { UseFormReset } from "react-hook-form";

export type HandleStartDateProps = {
  value: string;
  setStartDate: (value: string) => void;
  manualDueDate: boolean;
  setDueDate: (value: string) => void;
};

// export type Job = {
//   id: string;
//   title: string;
//   client: string;
//   description: string;
//   status: string;
//   paymentStatus: string;
//   amount: number;
//   startDate: string;
//   dueDate: string;
// };

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

export type NewJobSubmitHandleProps = {
  data: JobSchemaData;
  reset: UseFormReset<JobSchemaData>;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type OnSubmitJobProps = {
  data: JobSchemaData;
  reset: UseFormReset<JobSchemaData>;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type JobDialogProps = {
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
