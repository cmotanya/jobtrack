"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import JobProgress from "./jobProgress";
import PaymentStatus from "./paymentStatus";

const CreateJobDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <div className="m-4 flex flex-col justify-center">
          <Button className="group bg-primary text-primary-foreground items- flex justify-center gap-2 rounded-xl py-7.5 text-lg font-semibold transition-all hover:scale-105 active:scale-95">
            <span>📝</span> Create Job
          </Button>
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-3xl space-y-4">
        <DialogHeader className="pt-6">
          <DialogTitle className="text-2xl font-semibold">
            Create New Job
          </DialogTitle>
          <DialogDescription>
            Add a new job to your workspace with all the necessary details.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div className="space-y-1">
            <Label
              htmlFor="title"
              className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Job Title
            </Label>
            <Input
              id="title"
              placeholder="CCTV Installation"
              className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            />
          </div>

          <div className="space-y-1">
            <Label
              htmlFor="client"
              className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Client Name
            </Label>
            <Input
              id="client"
              placeholder="James Smith"
              className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            />
          </div>

          <div className="space-y-1">
            <Label
              htmlFor="amount"
              className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Amount
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="1000"
              className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            />
          </div>

          <div className="space-y-1">
            <Label
              htmlFor="status"
              className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Job Progress
            </Label>
            <JobProgress />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="start-date">Start Date</Label>
              <Input
                type="date"
                id="start-date"
                className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="due-date">Due Date</Label>
              <Input
                type="date"
                id="due-date"
                className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label
              htmlFor="payment-status"
              className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Payment Status
            </Label>
            <PaymentStatus />
          </div>
        </div>

        <DialogFooter className="flex w-full flex-row justify-end">
          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" onClick={() => setIsDialogOpen(false)}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateJobDialog;
