import { NewJobSubmitHandleProps } from "@/types/dashboard";
import { getDefaultValues } from "@/utils/helper/defaultValues";

export const handleNewJobSubmit = async ({
  data,
  reset,
  setIsDialogOpen,
}: NewJobSubmitHandleProps): Promise<void> => {
  try {
    console.log("Submitted data:", data);

    reset(getDefaultValues());

    setIsDialogOpen(false);
  } catch (error) {
    console.error(error);
  }
};

export default handleNewJobSubmit;
