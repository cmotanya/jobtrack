"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Download,
  Filter,
  Unplug,
  LayoutDashboard,
  Calendar,
} from "lucide-react";
import { formatCurrency } from "../../helpers/formatCurrency";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUserDisplay } from "@/helpers/useUserDisplay";
import { Skeleton } from "@/components/ui/skeleton";
import { useJobs } from "@/hook/useJobs";
import TodayJobs from "@/components/dashboard/todayJobs";
import CreateNewProject from "@/components/dashboard/createProject";
import MonthlyOverview from "@/components/dashboard/monthlyOverview";

export default function DashboardPage() {
  const { first_name } = useUserDisplay();
  const { jobs, todayJobs, isLoading } = useJobs();

  return (
    <section className="mx-auto max-w-7xl space-y-10 py-10">
      {/* =========== HEADER SECTION ============ */}
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
          <CreateNewProject />
          <Button variant="outline" className="py-5.5 shadow-sm">
            <Calendar /> View Timeline
          </Button>
        </div>
      </div>

      <hr className="border-muted-foreground/20" />

      {/* =============== Today's Jobs ================= */}
      <TodayJobs isLoading={isLoading} todayJobs={todayJobs} />

      {/* ============== Stats Overview Card =============== */}
      <MonthlyOverview />

      {/* ============== Recent Jobs Table Card ============== */}
      <Card className="overflow-hidden border-slate-100 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50 bg-slate-50/50 py-4">
          <CardTitle className="text-lg font-bold">Recent Projects</CardTitle>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="h-8 text-xs">
              <Filter className="mr-2 size-3" /> Filter
            </Button>
            <Button variant="ghost" size="sm" className="h-8 text-xs">
              <Download className="mr-2 size-3" /> Export
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {jobs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-4 rounded-full bg-slate-50 p-6">
                <Unplug className="size-10 text-slate-300" />
              </div>
              <h3 className="text-lg font-semibold">No Jobs Found</h3>
              <p className="mx-auto mt-1 max-w-62.5 text-sm text-slate-500">
                Ready to start? Create your first project to see it here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                    <TableHead className="w-20 font-bold text-slate-700">
                      ID
                    </TableHead>
                    <TableHead className="font-bold text-slate-700">
                      Project Name
                    </TableHead>
                    <TableHead className="font-bold text-slate-700">
                      Client
                    </TableHead>
                    <TableHead className="font-bold text-slate-700">
                      Date
                    </TableHead>
                    <TableHead className="text-right font-bold text-slate-700">
                      Value
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobs.slice(0, 5).map((job) => (
                    <TableRow
                      key={job.id}
                      className="group transition-colors hover:bg-slate-50/80"
                    >
                      <TableCell className="font-mono text-xs text-slate-400">
                        #{job.id.toString().slice(-4)}
                      </TableCell>
                      <TableCell className="text-xs font-semibold tracking-tight text-slate-800 uppercase">
                        {job.title}
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {job.client}
                      </TableCell>
                      <TableCell className="text-xs text-slate-500">
                        {job.start_date}
                      </TableCell>
                      <TableCell className="text-right font-bold text-slate-900 tabular-nums">
                        {formatCurrency(job.amount)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
