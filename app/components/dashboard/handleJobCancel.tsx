import { getDefaultValues } from "@/utils/helper/defaultValues";
import { JobSchemaData } from "@/utils/zodSchema";
import { UseFormReset } from "react-hook-form";

export const handleJobCancel = (reset?: UseFormReset<JobSchemaData>) => {
  if (!reset) return;

  try {
    reset(getDefaultValues());
  } catch (error) {
    console.error(error);
  }
};
