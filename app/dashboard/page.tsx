"use client";

import CreateJobDialog from "../components/dashboard/createJobDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JobProps } from "@/types/dashboard";
import { jobStats } from "@/utils/jobStats";
import { Workflow } from "lucide-react";
import { useState } from "react";
import { formatCurrency } from "../../utils/helper/formatCurrency";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function DashboardPage() {
  const [jobs, setJobs] = useState<JobProps[]>([]);

  const stats = jobStats(jobs);

  return (
    <section className="min-h-screen space-y-14 py-14" id="dashboard">
      <div className="space-y-3 border-b px-4 pb-8">
        <div className="space-y-0.5">
          <h1 className="text-4xl font-bold">
            Welcome back,{" "}
            <span className="from-primary block bg-linear-to-r via-emerald-800 to-teal-800 bg-clip-text text-transparent">
              Cornelius
            </span>
          </h1>
          <p className="text-muted-foreground text-sm">
            Here is what is happening on your dashboard today.
          </p>
        </div>

        <div className="flex flex-col justify-center gap-3 px-5">
          <CreateJobDialog />

          <Button
            variant="outline"
            className="hover:bg-muted/60 flex w-full items-center justify-center gap-2 rounded-xl py-7.5 text-lg font-semibold transition-all"
          >
            <Workflow size={20} />
            Workflow Guidelines
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="inline-flex gap-2.5 px-4 text-4xl font-bold">
          See Your{" "}
          <span className="from-primary block bg-linear-to-r via-emerald-800 to-teal-800 bg-clip-text text-transparent">
            Stats
          </span>
        </h2>
        <div className="flex flex-col gap-3 px-4">
          <Card className="bg-muted border-muted-foreground/20 border py-3 shadow-md">
            <CardHeader className="flex flex-row items-center justify-center gap-2">
              💰
              <CardTitle className="text-muted-foreground text-sm font-bold uppercase">
                Total Revenue This Month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="from-primary block bg-linear-to-r via-emerald-800 to-teal-800 bg-clip-text text-4xl font-bold text-transparent">
                {formatCurrency(stats.totalAmount)}
              </div>
              <p className="text-muted-foreground text-xs font-semibold">
                From {stats.totalJobs} completed jobs.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-muted border-muted-foreground/20 border py-3 shadow-md">
            <CardHeader className="flex flex-row items-center justify-center gap-2">
              📈
              <CardTitle className="text-muted-foreground text-sm font-bold uppercase">
                Jobs Completed This Month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-success text-4xl font-bold">
                {stats.totalJobsCompleted}
              </div>
              <p className="text-success text-xs font-semibold">
                From {stats.totalAmountPaid} total revenue.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-muted border-muted-foreground/20 border py-3 shadow-md">
            <CardHeader className="flex flex-row items-center justify-center gap-2">
              📉
              <CardTitle className="text-muted-foreground text-sm font-bold uppercase">
                Jobs In-Progress This Month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-yellow-500">
                {stats.totalJobsInProgress}
              </div>
              <p className="text-xs font-semibold text-yellow-600">
                From {stats.totalAmountInProgress} total pending revenue.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-muted border-muted-foreground/20 border py-3 shadow-md">
            <CardHeader className="flex flex-row items-center justify-center gap-2">
              📆
              <CardTitle className="text-muted-foreground text-sm font-bold uppercase">
                Jobs Scheduled This Month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-amber-500">
                {stats.totalJobsScheduled}
              </div>
              <p className="text-xs font-semibold text-amber-600">
                From {stats.totalAmountScheduled} total pending revenue.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="px-4 text-xl font-bold">Manage all your jobs</h2>
        <Card className="py-3 shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Jobs</CardTitle>
              <Button className="">Filter</Button>
            </div>
          </CardHeader>

          <CardContent>
            {jobs.length === 0 ? (
              <div className="flex h-20 items-center justify-center">
                <p className="text-muted-foreground text-center font-medium">
                  No jobs found. Create Your Jobs to Get Started.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Job ID</TableHead>
                      <TableHead>Job Title</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {jobs.map((job) => (
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
