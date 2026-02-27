"use client";

import { TodaysJobsProps } from "@/types/auth";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/helpers/formatCurrency";
import { cn } from "@/lib/utils";
import { CalendarDays } from "lucide-react";

const TodayJobs = ({ isLoading, todayJobs }: TodaysJobsProps) => {
  return (
    <div className="space-y-3 px-4">
      <div>
        <h2 className="text-3xl font-bold">Today&apos;s Focus</h2>
        <p className="text-muted-foreground text-sm">
          Jobs starting today or currently in progress.
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-xl" />
          ))}
        </div>
      ) : todayJobs.length === 0 ? (
        <div className="flex h-32 flex-col items-center justify-center gap-2 rounded-xl border border-dashed">
          <CalendarDays className="text-muted-foreground size-6" />
          <p className="text-muted-foreground text-sm font-medium">
            No jobs for today. Enjoy the break! 🎉
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {todayJobs.map((job) => (
            <div
              key={job.id}
              className="flex items-center justify-between rounded-xl border bg-white px-4 py-3 shadow-sm"
            >
              <div className="space-y-0.5">
                <p className="text-sm font-semibold uppercase">{job.title}</p>
                <p className="text-muted-foreground text-xs">{job.client}</p>
                <p className="text-muted-foreground text-xs">
                  Due: {job.due_date}
                </p>
              </div>

              <div className="flex flex-col items-end gap-1.5">
                <span className="text-sm font-bold">
                  {formatCurrency(job.amount)}
                </span>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-0.5 text-xs font-semibold",
                    job.job_progress === "in-progress" &&
                      "bg-blue-100 text-blue-600",
                    job.job_progress === "scheduled" &&
                      "bg-gray-100 text-gray-600",
                    job.job_progress === "on-hold" &&
                      "bg-orange-100 text-orange-600",
                    job.job_progress === "completed" &&
                      "bg-green-100 text-green-600",
                    job.job_progress === "cancelled" &&
                      "bg-red-100 text-red-600",
                  )}
                >
                  {job.job_progress}
                </span>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-0.5 text-xs font-semibold",
                    job.payment_status === "unpaid" &&
                      "bg-red-100 text-red-600",
                    job.payment_status === "partial" &&
                      "bg-yellow-100 text-yellow-600",
                    job.payment_status === "paid" &&
                      "bg-green-100 text-green-600",
                  )}
                >
                  {job.payment_status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TodayJobs;
