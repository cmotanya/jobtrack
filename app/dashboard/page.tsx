"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JobProps } from "@/types/dashboard";
import { jobStats } from "@/helpers/jobStats";
import { Download, Filter, Unplug } from "lucide-react";
import { useState } from "react";
import { formatCurrency } from "../../helpers/formatCurrency";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CreateJobDialog from "@/components/dashboard/createJobDialog";
import { useUserDisplay } from "@/helpers/useUserDisplay";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const [jobs] = useState<JobProps[]>([]);
  const { first_name } = useUserDisplay();

  const stats = jobStats(jobs);

  return (
    <section className="my-12 min-h-screen space-y-8">
      <div className="mb-14 space-y-7 px-4">
        <div className="space-y-0.5">
          <p className="text-xs tracking-widest">Dashboard</p>
          <h1 className="inline-block text-3xl font-bold">
            Welcome back,{" "}
            <span className="relative">
              {first_name ? (
                <>
                  <span className="from-success relative z-10 bg-linear-to-r via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                    {first_name}
                  </span>
                  <span className="absolute -bottom-0.5 left-0 h-3 w-full bg-linear-to-r from-emerald-200 via-teal-200 to-cyan-200 opacity-50 blur-sm" />
                </>
              ) : (
                <Skeleton className="bg-muted-foreground/30 inline-block h-8 w-32" />
              )}
            </span>
            👋
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Here is what is happening on your dashboard today.
          </p>
        </div>

        <div className="flex justify-center gap-3 px-5 pt-5">
          <CreateJobDialog />

          <Button
            variant="outline"
            className="hover:bg-muted/60 py-6 font-semibold uppercase"
          >
            Workflow
          </Button>
        </div>
      </div>

      {/* Today's Jobs */}
      <div>
        <div className="px-4">
          <h2 className="text-3xl font-bold">Today&apos;s Focus</h2>
          <p className="text-muted-foreground text-sm">
            Here is a list of today&apos;s jobs.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 px-4">
        <div>
          <h2 className="inline-flex gap-2.5 text-3xl font-bold">Overview</h2>
          <p className="text-muted-foreground text-sm">
            Here is an overview of your dashboard.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Card className="bg-success text-muted space-y-5 py-3">
            <CardHeader className="flex flex-row items-center justify-center gap-4">
              📈
              <CardTitle>Total Revenue This Month</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-4xl font-bold">
                {formatCurrency(stats.totalAmount)}
              </div>
              <p className="text-xs font-semibold">
                From {stats.totalJobs} completed jobs.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-yellow-300 bg-yellow-50 py-3 shadow-md">
            <CardHeader className="flex flex-row items-center justify-center gap-4">
              📉
              <CardTitle>Jobs In Progress This Month</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-4xl font-bold text-yellow-500">
                {stats.totalJobsInProgress}
              </div>
              <p className="text-muted-foreground text-sm font-medium">
                {formatCurrency(stats.totalAmountInProgress)} pending revenue.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-purple-300 bg-purple-50 py-3 shadow-md">
            <CardHeader className="flex flex-row items-center justify-center gap-4">
              📆
              <CardTitle>Jobs Scheduled This Month</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-4xl font-bold text-purple-600">
                {stats.totalJobsScheduled}
              </div>
              <p className="text-muted-foreground text-sm font-medium">
                {formatCurrency(stats.totalAmountScheduled)} upcoming revenue.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="space-y-2 pt-14">
        <Card className="rounded-none border border-t border-b-0 py-5 shadow-none">
          <CardHeader className="space-y-2">
            <div>
              <CardTitle className="text-2xl">Recent Jobs</CardTitle>
              <p className="text-muted-foreground text-sm font-medium">
                Track and manage all your projects in one place.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button className="">
                {" "}
                <Filter /> Filter
              </Button>
              <Button variant="outline" className="font-semibold">
                {" "}
                <Download /> Export
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            {jobs.length === 0 ? (
              <div className="mt-6 flex h-70 flex-col items-center justify-center gap-8">
                <Unplug className="size-25 text-red-300" />
                <div className="text-center">
                  <h3 className="text-xl font-semibold tracking-tight">
                    {" "}
                    No Jobs Found
                  </h3>
                  <p className="text-muted-foreground text-center text-sm font-medium text-balance">
                    We couldn&apos;t find any job. Create your first project to
                    get started.
                  </p>
                </div>

                <div className="w-full px-4">
                  <CreateJobDialog />
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-semibold">Job ID</TableHead>
                      <TableHead className="font-semibold">Job Title</TableHead>
                      <TableHead className="font-semibold">Client</TableHead>
                      <TableHead className="font-semibold">Date</TableHead>
                      <TableHead className="font-semibold">Amount</TableHead>
                      <TableHead className="font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {jobs.slice(0, 5).map((job) => (
                      <TableRow key={job.id}>
                        <TableCell>{job.id}</TableCell>
                        <TableCell>{job.title}</TableCell>
                        <TableCell>{job.client}</TableCell>
                        <TableCell>{job.startDate}</TableCell>
                        <TableCell>{formatCurrency(job.amount)}</TableCell>
                        <TableCell>{job.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
