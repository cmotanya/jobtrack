"use client";

import { Button } from "@/components/ui/button";
import { LayoutDashboard, Calendar } from "lucide-react";

import { useUserDisplay } from "@/helpers/useUserDisplay";
import { Skeleton } from "@/components/ui/skeleton";
import { useJobs } from "@/hook/useJobs";
import TodayJobs from "@/components/dashboard/todayJobs";
import MonthlyOverview from "@/components/dashboard/monthlyOverview";
import NewProject from "@/components/dashboard/NewProject";
import RecentProjects from "@/components/dashboard/recentProjects";

export default function DashboardPage() {
  const { first_name } = useUserDisplay();
  const { todayJobs, isLoading } = useJobs();

  return (
    <section className="mx-auto max-w-7xl space-y-10 py-10">
      <div className="flex flex-col justify-between gap-6 px-4 md:flex-row md:items-end">
        <div className="space-y-2">
          <div className="text-muted-foreground flex items-center gap-2 text-xs font-medium tracking-tight">
            <LayoutDashboard className="size-4" />
            <span>Management Console</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
            Welcome back,{" "}
            <span className="bg-linear-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              {first_name || <Skeleton className="inline-block h-8 w-32" />}
            </span>
            👋
          </h1>
          <p className="text-muted-foreground text-base">
            You have{" "}
            <span className="text-foreground font-semibold">
              {todayJobs.length} tasks
            </span>{" "}
            to focus on today.
          </p>
        </div>

        <div className="flex items-center justify-around">
          <NewProject />
          <Button variant="outline" className="py-5.5 shadow-sm">
            <Calendar /> View Timeline
          </Button>
        </div>
      </div>

      <hr className="border-muted-foreground/20" />

      {/* ======= Today's Jobs ======== */}
      <TodayJobs isLoading={isLoading} todayJobs={todayJobs} />

      {/* ===== Stats Overview Card ======= */}
      <MonthlyOverview />

      {/* ======= Recent Jobs Table Card ====== */}
      <RecentProjects />
    </section>
  );
}
