import { HandleStartDateProps } from "@/types/dashboard";

export const today = new Date().toISOString().split("T")[0];

const nextDue = new Date().setDate(new Date(today).getDate() + 3);

export const nextDueDate = new Date(nextDue).toISOString().split("T")[0];

export const handleStartDate = ({
  value,
  setStartDate,
  manualDueDate,
  setDueDate,
}: HandleStartDateProps) => {
  setStartDate(value);

  if (!value) return;

  if (!manualDueDate) {
    const nextDue = new Date();
    const nextDueDate = nextDue.setDate(new Date(value).getDate() + 3);

    setDueDate(new Date(nextDueDate).toISOString().split("T")[0]);
  }
};
