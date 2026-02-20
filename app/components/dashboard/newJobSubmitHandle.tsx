import { NewJobSubmitHandleProps } from "@/types/dashboard";
import { getDefaultEmptyJobValues } from "@/utils/helper/defaultValues";

export const handleNewJobSubmit = async ({
  data,
  reset,
  setIsDialogOpen,
}: NewJobSubmitHandleProps): Promise<void> => {
  try {
    console.log("Submitted data:", data);

    reset(getDefaultEmptyJobValues());

    setIsDialogOpen(false);
  } catch (error) {
    console.error(error);
  }
};

export default handleNewJobSubmit;
