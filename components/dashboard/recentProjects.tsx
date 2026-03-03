"use client";

import { formatCurrency } from "@/helpers/formatCurrency";
import {
  Filter,
  Download,
  Unplug,
  ArrowUpRight,
  ChevronRight,
} from "lucide-react";
import { useJobs } from "@/hook/useJobs";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import { Button } from "../ui/button";

const RecentProjects = () => {
  const { jobs } = useJobs();

  return (
    <div className="border-muted overflow-hidden border shadow-sm">
      <div className="border-muted-foreground/20 space-y-4 border-b px-2 py-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Recent Projects</h2>
          <p className="text-xs">Last 5 entries across all clients</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium"
          >
            <Filter size={10} /> Filter
          </Button>
          <Button
            variant="outline"
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium"
          >
            <Download size={13} /> Export
          </Button>
        </div>
      </div>

      {/* Content */}
      {jobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
          <div className="rounded-full border border-dashed border-slate-200 bg-slate-50 p-5">
            <Unplug className="size-8 text-slate-300" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-600">
              No projects yet
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Create your first project and it will appear here.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted">
                  <TableHead className="text-muted-foreground/80 w-16 text-center text-xs font-semibold tracking-wider uppercase">
                    ID
                  </TableHead>
                  <TableHead className="text-muted-foreground/80 text-center text-xs font-semibold tracking-wider uppercase">
                    Project Name
                  </TableHead>
                  <TableHead className="text-muted-foreground/80 text-center text-xs font-semibold tracking-wider uppercase">
                    Client
                  </TableHead>
                  <TableHead className="text-muted-foreground/80 text-center text-xs font-semibold tracking-wider uppercase">
                    Date
                  </TableHead>
                  <TableHead className="text-muted-foreground/80 text-center text-xs font-semibold tracking-wider uppercase">
                    Value
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobs.slice(0, 8).map((job) => (
                  <TableRow
                    key={job.id}
                    className="group hover:bg-muted cursor-pointer transition-colors"
                  >
                    <TableCell className="text-muted-foreground/50 font-mono text-xs">
                      #{job.id.toString().slice(-4)}
                    </TableCell>
                    <TableCell className="text-xs font-semibold tracking-tight uppercase">
                      {job.title}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {job.client}
                    </TableCell>
                    <TableCell className="text-muted-foreground/80 text-xs">
                      {job.start_date}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <span className="text-sm font-bold tabular-nums">
                          {formatCurrency(job.amount)}
                        </span>
                        <ArrowUpRight className="text-muted-foreground size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Footer */}
          <div className="bg-muted flex items-center justify-between border-t px-6 py-3">
            <p className="text-muted-foreground/80 text-xs">
              Showing{" "}
              <span className="text-foreground font-semibold">
                {Math.min(8, jobs.length)}
              </span>{" "}
              of{" "}
              <span className="text-foreground font-semibold">
                {jobs.length}
              </span>{" "}
              projects
            </p>
            <Button
              variant="ghost"
              className="group inline-flex items-center gap-1.5 text-xs font-bold transition-all"
            >
              View analytics
              <ChevronRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default RecentProjects;
