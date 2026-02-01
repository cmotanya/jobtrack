"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  MoreHorizontal,
  Clock,
  CheckCircle2,
  DollarSign,
  Briefcase,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

// Types
type JobStatus = "pending" | "in-progress" | "completed" | "cancelled";
type PaymentStatus = "unpaid" | "partial" | "paid";

interface Job {
  id: string;
  title: string;
  client: string;
  description: string;
  status: JobStatus;
  paymentStatus: PaymentStatus;
  amount: number;
  startDate: string;
  dueDate: string;
}

export default function DashboardPage() {
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: "1",
      title: "Website Redesign",
      client: "Acme Corp",
      description: "Complete website overhaul with new branding",
      status: "in-progress",
      paymentStatus: "partial",
      amount: 5000,
      startDate: "2025-01-15",
      dueDate: "2025-02-15",
    },
    {
      id: "2",
      title: "Mobile App Development",
      client: "TechStart Inc",
      description: "iOS and Android app for inventory management",
      status: "pending",
      paymentStatus: "unpaid",
      amount: 12000,
      startDate: "2025-02-01",
      dueDate: "2025-04-01",
    },
    {
      id: "3",
      title: "Logo Design",
      client: "Fresh Bakery",
      description: "Brand identity and logo design",
      status: "completed",
      paymentStatus: "paid",
      amount: 800,
      startDate: "2025-01-05",
      dueDate: "2025-01-20",
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newJob, setNewJob] = useState<Partial<Job>>({
    status: "pending",
    paymentStatus: "unpaid",
  });

  // Calculate statistics
  const stats = {
    totalJobs: jobs.length,
    pendingJobs: jobs.filter((j) => j.status === "pending").length,
    completedJobs: jobs.filter((j) => j.status === "completed").length,
    totalRevenue: jobs
      .filter((j) => j.paymentStatus === "paid")
      .reduce((sum, j) => sum + j.amount, 0),
    pendingPayments: jobs
      .filter((j) => j.paymentStatus === "unpaid")
      .reduce((sum, j) => sum + j.amount, 0),
  };

  const handleAddJob = () => {
    if (newJob.title && newJob.client && newJob.amount) {
      const job: Job = {
        id: Date.now().toString(),
        title: newJob.title,
        client: newJob.client,
        description: newJob.description || "",
        status: newJob.status as JobStatus,
        paymentStatus: newJob.paymentStatus as PaymentStatus,
        amount: Number(newJob.amount),
        startDate: newJob.startDate || new Date().toISOString().split("T")[0],
        dueDate: newJob.dueDate || new Date().toISOString().split("T")[0],
      };
      setJobs([...jobs, job]);
      setIsDialogOpen(false);
      setNewJob({
        status: "pending",
        paymentStatus: "unpaid",
      });
    }
  };

  const getStatusBadge = (status: JobStatus) => {
    const variants: Record<JobStatus, { variant: any; label: string }> = {
      pending: { variant: "secondary", label: "Pending" },
      "in-progress": { variant: "default", label: "In Progress" },
      completed: { variant: "success", label: "Completed" },
      cancelled: { variant: "destructive", label: "Cancelled" },
    };
    return variants[status];
  };

  const getPaymentBadge = (status: PaymentStatus) => {
    const variants: Record<PaymentStatus, { variant: any; label: string }> = {
      unpaid: { variant: "destructive", label: "Unpaid" },
      partial: { variant: "outline", label: "Partial" },
      paid: { variant: "success", label: "Paid" },
    };
    return variants[status];
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your jobs and track payments
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add New Job
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Add New Job</DialogTitle>
                <DialogDescription>
                  Create a new job entry. Fill in the details below.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input
                    id="title"
                    placeholder="Website Development"
                    value={newJob.title || ""}
                    onChange={(e) =>
                      setNewJob({ ...newJob, title: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="client">Client Name</Label>
                  <Input
                    id="client"
                    placeholder="Acme Corporation"
                    value={newJob.client || ""}
                    onChange={(e) =>
                      setNewJob({ ...newJob, client: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of the job"
                    value={newJob.description || ""}
                    onChange={(e) =>
                      setNewJob({ ...newJob, description: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="amount">Amount ($)</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="5000"
                      value={newJob.amount || ""}
                      onChange={(e) =>
                        setNewJob({ ...newJob, amount: Number(e.target.value) })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={newJob.status}
                      onValueChange={(value) =>
                        setNewJob({ ...newJob, status: value as JobStatus })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={newJob.startDate || ""}
                      onChange={(e) =>
                        setNewJob({ ...newJob, startDate: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={newJob.dueDate || ""}
                      onChange={(e) =>
                        setNewJob({ ...newJob, dueDate: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="paymentStatus">Payment Status</Label>
                  <Select
                    value={newJob.paymentStatus}
                    onValueChange={(value) =>
                      setNewJob({
                        ...newJob,
                        paymentStatus: value as PaymentStatus,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unpaid">Unpaid</SelectItem>
                      <SelectItem value="partial">Partial</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleAddJob}>Add Job</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
              <Briefcase className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalJobs}</div>
              <p className="text-muted-foreground text-xs">All time jobs</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Jobs
              </CardTitle>
              <Clock className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingJobs}</div>
              <p className="text-muted-foreground text-xs">
                Awaiting assignment
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle2 className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completedJobs}</div>
              <p className="text-muted-foreground text-xs">Successfully done</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <TrendingUp className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${stats.totalRevenue.toLocaleString()}
              </div>
              <p className="text-muted-foreground text-xs">Paid jobs only</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Payments
              </CardTitle>
              <AlertCircle className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${stats.pendingPayments.toLocaleString()}
              </div>
              <p className="text-muted-foreground text-xs">Awaiting payment</p>
            </CardContent>
          </Card>
        </div>

        {/* Jobs Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Jobs</CardTitle>
            <CardDescription>
              A list of all your jobs and their current status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className="font-medium">{job.title}</TableCell>
                    <TableCell>{job.client}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadge(job.status).variant}>
                        {getStatusBadge(job.status).label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={getPaymentBadge(job.paymentStatus).variant}
                      >
                        {getPaymentBadge(job.paymentStatus).label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      ${job.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>{job.dueDate}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View details</DropdownMenuItem>
                          <DropdownMenuItem>Edit job</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Mark as completed</DropdownMenuItem>
                          <DropdownMenuItem>Update payment</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            Delete job
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
