import { getDefaultEmptyJobValues } from "@/utils/helper/defaultValues";
import { JobFormData } from "@/utils/zodSchema";
import { UseFormReset } from "react-hook-form";

export const handleJobCancel = (reset?: UseFormReset<JobFormData>) => {
  if (!reset) return;

  try {
    reset(getDefaultEmptyJobValues());
  } catch (error) {
    console.error(error);
  }
};
