import { getDefaultEmptyJobValues } from "@/helpers/defaultValues";
import { JobFormData } from "@/helpers/zodSchema";
import { UseFormReset } from "react-hook-form";

export const handleJobCancel = (reset?: UseFormReset<JobFormData>) => {
  if (!reset) return;

  reset(getDefaultEmptyJobValues());
};
