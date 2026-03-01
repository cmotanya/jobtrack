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
import { Button } from "@/components/ui/button";
import { ArrowBigRight } from "lucide-react";

const CreateNewProject = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <div className="">
          <Button className="py-6 transition-all hover:scale-105 active:scale-95">
            New Project <ArrowBigRight />
          </Button>
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-3xl overflow-auto p-0 pt-4">
        <DialogHeader className="mx-4 -space-y-2 tracking-tight">
          <DialogTitle className="text-xl font-bold uppercase">
            Create New Job
          </DialogTitle>
          <DialogDescription className="text-xs leading-tight text-balance">
            Add a new job to your workspace with all the necessary details.
          </DialogDescription>
        </DialogHeader>

        {/* Form section here */}
        <JobForm setIsDialogOpen={setIsDialogOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewProject;
