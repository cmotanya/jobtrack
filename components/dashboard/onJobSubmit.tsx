"use client";

import toast from "react-hot-toast";
import handleNewJobSubmit from "./handleJobSubmit";
import { OnJobSubmitProps } from "@/types/dashboard";
import { handleJobCancel } from "./handleJobCancel";

export const OnJobSubmit = async ({
  data,
  id,
  reset,
  setIsDialogOpen,
}: OnJobSubmitProps): Promise<void> => {
  try {
    await handleNewJobSubmit({ data, id });

    handleJobCancel(reset);

    setIsDialogOpen?.(false);

    toast.success(
      id ? "Job updated successfully!" : "Job created successfully!",
    );
  } catch (error) {
    console.error(error);

    toast.error("Error creating job. Please try again.");
  }
};
