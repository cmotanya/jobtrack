"use client";

import { TodaysJobsProps } from "@/types/auth";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/helpers/formatCurrency";
import { cn } from "@/lib/utils";
import {
  CalendarDays,
  Briefcase,
  ChevronRight,
  Activity,
  HandCoins,
  Trash,
  LayoutList,
  Edit,
  MapPin,
} from "lucide-react";
import { jobStatusColor, paymentStatusColor } from "@/data/status-configs";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useState } from "react";
import { JobProps } from "@/types/dashboard";
import JobForm from "./jobForm";

const TodayJobs = ({ isLoading, todayJobs }: TodaysJobsProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeJob, setActiveJob] = useState<JobProps | null>(null);

  const displayedJobs = todayJobs.slice(0, 3);

  const handleEditJob = (job: JobProps) => {
    setActiveJob(job);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6 px-4 pb-14">
      {/* header */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">
            Today&apos;s Focus
          </h2>
          {!isLoading && todayJobs.length > 0 && (
            <span className="bg-success/15 flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase">
              <span className="relative flex size-1.5">
                <span className="bg-success/70 absolute inset-0 inline-flex animate-ping rounded-full" />
                <span className="bg-success relative inline-flex size-1.5 rounded-full" />
              </span>
              live
            </span>
          )}
        </div>
        <p className="text-muted-foreground text-sm">
          You have{" "}
          <span className="text-foreground font-semibold">
            {todayJobs.length} tasks
          </span>{" "}
          scheduled for today.
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-2xl" />
          ))}
        </div>
      ) : todayJobs.length === 0 ? (
        <div className="border-muted-foreground/30 flex h-40 flex-col items-center justify-center gap-3 rounded-2xl border shadow-sm">
          <CalendarDays className="text-muted-foreground size-12" />
          <p className="text-muted-foreground text-sm font-medium tracking-tighter">
            No jobs for today. Enjoy the break! 🎉
          </p>
        </div>
      ) : (
        <div className="grid gap-3">
          {displayedJobs.map((job, index) => {
            const paymentColor = paymentStatusColor.find(
              (s) => s.value === job.payment_status,
            )?.color;
            const jobColor = jobStatusColor.find(
              (s) => s.value === job.job_progress,
            )?.color;

            return (
              <Dialog key={job.id} defaultOpen={false}>
                <DialogTrigger asChild>
                  <div className="group border-muted-foreground/20 hover:border-primary/20 relative flex items-center justify-between overflow-hidden rounded-2xl border p-3 shadow-xs transition-all hover:shadow-md active:scale-[0.99]">
                    <div className="bg-muted absolute -top-0.5 right-3 z-10 flex h-5 w-6 items-center justify-center rounded-b-sm border">
                      <div className="text-muted-foreground/70 text-[10px] font-extrabold">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                    </div>

                    {/* left side: info */}
                    <div className="flex gap-2">
                      <div className="group-hover:text-primary hidden h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-slate-400 transition-colors group-hover:bg-blue-50 sm:flex">
                        <Briefcase className="size-5" />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <div
                            className={cn("size-2 rounded-full", jobColor)}
                          />
                          <h3 className="text-sm font-bold tracking-wider uppercase">
                            {job.title}
                          </h3>
                        </div>

                        <div className="text-muted-foreground divide-muted-foreground/30 flex items-center divide-x text-xs">
                          <span className="text-muted-foreground pr-2 font-semibold">
                            {job.client}
                          </span>
                          <span className="flex gap-1 pl-2">
                            {" "}
                            <CalendarDays className="size-3.5" /> Due:{" "}
                            {job.due_date}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* right side: status & amount */}
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-end gap-1">
                        <span className="font-mono text-sm font-bold tabular-nums">
                          {formatCurrency(job.amount)}
                        </span>
                        <span
                          className={cn(
                            "rounded-lg px-2 py-0.5 text-[10px] font-bold tracking-tight uppercase",
                            paymentColor,
                          )}
                        >
                          {job.payment_status}
                        </span>
                      </div>
                      <ChevronRight className="size-4 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-blue-400" />
                    </div>
                  </div>
                </DialogTrigger>

                <DialogContent className="space-y-5">
                  <DialogHeader>
                    <DialogTitle className="flex flex-col items-start gap-5">
                      <span className="text-muted-foreground/70 text-[10px] font-bold">
                        {job.id}
                      </span>

                      <div className="flex flex-col items-start -space-y-2">
                        <span className="text-foreground text-start text-3xl font-bold tracking-widest uppercase">
                          {job.title}
                        </span>
                        <span className="text-muted-foreground -tracking-[1px]">
                          {job.client}
                        </span>
                      </div>
                    </DialogTitle>
                    <DialogDescription
                      className={cn(
                        "flex justify-around rounded-xl border py-5 text-lg",
                        paymentColor,
                      )}
                    >
                      <span className="font-semibold uppercase">
                        {" "}
                        Total Amount:
                      </span>
                      {formatCurrency(job.amount)}
                    </DialogDescription>
                  </DialogHeader>

                  <div className="divide-muted-foreground/20 space-y-4 divide-y">
                    <div className="flex items-center justify-between px-4 py-3">
                      <span className="text-muted-foreground flex items-center gap-2 text-xs font-medium">
                        <CalendarDays className="size-5" /> Due Date
                      </span>
                      <span className="text-sm font-medium">
                        {job.due_date}
                      </span>
                    </div>
                    <div className="flex items-center justify-between px-4 pb-3">
                      <span className="text-muted-foreground flex items-center gap-2 text-xs font-medium">
                        <Activity className="size-5" /> Work Status
                      </span>
                      <div className="flex items-center gap-1">
                        <span className={cn("size-2 rounded-full", jobColor)} />
                        <span className="text-sm font-medium">
                          {job.job_progress}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between px-4 pb-3">
                      <span className="text-muted-foreground flex items-center gap-2 text-xs font-medium">
                        <MapPin className="size-5" /> Location
                      </span>
                      <span className="text-sm font-medium">
                        {job.location}
                      </span>
                    </div>
                    <div className="flex items-center justify-between px-4 pb-3">
                      <span className="text-muted-foreground flex items-center gap-2 text-xs font-medium">
                        <HandCoins className="size-5" /> Payment
                      </span>
                      <div className="flex items-center gap-1">
                        <span
                          className={cn(
                            "rounded-xl px-2 py-0.5 text-xs font-bold tracking-tight uppercase",
                            paymentColor,
                          )}
                        >
                          {job.payment_status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <DialogFooter className="flex flex-row">
                    <Button
                      onClick={() => handleEditJob(job)}
                      className="active:border- flex-1 transition-all duration-75 active:scale-[0.99]"
                    >
                      <Edit /> Edit
                    </Button>
                    <Button
                      variant="destructive"
                      className="flex-1 transition-all duration-75 active:scale-[0.99]"
                    >
                      <Trash /> Delete
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            );
          })}

          {todayJobs.length > 3 && (
            <div className="ml-auto">
              <Button className="shadow-sm transition-all duration-75 active:scale-[0.99]">
                <LayoutList />
                Showing {todayJobs.length - 3} of {todayJobs.length}
              </Button>
            </div>
          )}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl overflow-auto p-0 pt-4">
          <DialogHeader className="mx-4 -space-y-2 tracking-tight">
            <DialogTitle className="text-xl font-bold uppercase">
              Edit Job
            </DialogTitle>
            <DialogDescription className="text-xs leading-tight text-balance">
              Edit job details
            </DialogDescription>
          </DialogHeader>

          {activeJob && (
            <JobForm
              setIsDialogOpen={setIsDialogOpen}
              initialValues={activeJob}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TodayJobs;
