"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import JobForm from "./jobForm";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CreateJobDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <div>
          <Button className="group bg-primary text-primary-foreground flex w-full items-center justify-center gap-2 rounded-xl py-7.5 text-lg font-semibold transition-all hover:scale-105 active:scale-95">
            Create New Job{" "}
            <ArrowRight
              size={20}
              className="transition-transform group-hover:translate-x-1"
            />
          </Button>
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-3xl space-y-4 overflow-y-auto">
        <DialogHeader className="pt-6">
          <DialogTitle className="text-2xl font-semibold">
            Create New Job
          </DialogTitle>
          <DialogDescription>
            Add a new job to your workspace with all the necessary details.
          </DialogDescription>
        </DialogHeader>

        {/* Form section here */}
        <JobForm setIsDialogOpen={setIsDialogOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateJobDialog;
