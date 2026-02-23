"use client";

import toast from "react-hot-toast";
import handleNewJobSubmit from "./newJobSubmitHandle";
import { OnSubmitJobProps } from "@/types/dashboard";
import { handleJobCancel } from "./handleJobCancel";

export const OnJobSubmit = async ({
  data,
  setIsDialogOpen,
  reset,
}: OnSubmitJobProps): Promise<void> => {
  try {
    await handleNewJobSubmit({ data, setIsDialogOpen, reset });

    handleJobCancel(reset);

    toast.success("Job created successfully!");
  } catch (error) {
    console.error(error);

    toast.error("Error creating job. Please try again.");
  }
};
