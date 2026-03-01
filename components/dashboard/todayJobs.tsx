"use client";

import { TodaysJobsProps } from "@/types/auth";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/helpers/formatCurrency";
import { cn } from "@/lib/utils";
import { CalendarDays, Briefcase, ChevronRight, List } from "lucide-react";
import {
  jobStatusColor,
  paymentStatusColor,
} from "@/data/Dashboard/status-configs";
import { Button } from "../ui/button";

const TodayJobs = ({ isLoading, todayJobs }: TodaysJobsProps) => {
  const displayedJobs = todayJobs.slice(0, 3);

  return (
    <div className="mb-14 space-y-6 px-4">
      {/* Header Section */}
      <div className="flex items-end justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">
            Today&apos;s Focus
          </h2>
          <p className="text-muted-foreground text-sm">
            You have{" "}
            <span className="text-foreground font-semibold">
              {todayJobs.length} tasks
            </span>{" "}
            for today.
          </p>
        </div>
        {!isLoading && todayJobs.length > 0 && (
          <button className="text-primary text-xs font-medium hover:underline">
            View Schedule
          </button>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-2xl" />
          ))}
        </div>
      ) : todayJobs.length === 0 ? (
        <div className="border-muted bg-muted flex h-40 flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed">
          <div className="rounded-full p-3 shadow-sm">
            <CalendarDays className="size-6 text-slate-400" />
          </div>
          <p className="text-muted-foreground text-sm font-medium">
            No jobs for today. Enjoy the break! 🎉
          </p>
        </div>
      ) : (
        <div className="grid gap-3">
          {displayedJobs.map((job) => (
            <div
              key={job.id}
              className="group border-muted-foreground/20 hover:border-primary/20 relative flex items-center justify-between overflow-hidden rounded-2xl border p-4 shadow-xs transition-all hover:shadow-md active:scale-[0.99]"
            >
              {/* Left Side: Info */}
              <div className="flex gap-4">
                <div className="group-hover:text-primary hidden h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-slate-400 transition-colors group-hover:bg-blue-50 sm:flex">
                  <Briefcase className="size-5" />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "size-2 rounded-full",
                        jobStatusColor.find((s) => s.value === job.job_progress)
                          ?.color,
                      )}
                    />
                    <h3 className="text-sm font-bold tracking-wider uppercase">
                      {job.title}
                    </h3>
                  </div>

                  <div className="text-muted-foreground divide-muted-foreground/30 flex items-center divide-x text-xs">
                    <span className="text-muted-foreground pr-2 font-semibold">
                      {job.client}
                    </span>
                    <span className="pl-2">Due: {job.due_date}</span>
                  </div>
                </div>
              </div>

              {/* Right Side: Status & Amount */}
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end gap-1">
                  <span className="font-mono text-sm font-bold tabular-nums">
                    {formatCurrency(job.amount)}
                  </span>
                  <span
                    className={cn(
                      "rounded-lg px-2 py-0.5 text-[10px] font-bold tracking-tight uppercase",
                      paymentStatusColor.find(
                        (s) => s.value === job.payment_status,
                      )?.color,
                    )}
                  >
                    {job.payment_status}
                  </span>
                </div>
                <ChevronRight className="size-4 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-blue-400" />
              </div>
            </div>
          ))}

          {todayJobs.length > 3 && (
            <div className="flex justify-end">
              <Button className="font-medium">
                View All <List />
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TodayJobs;
