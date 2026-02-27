import { JobProps } from "@/types/dashboard";

export const jobStats = (jobs: JobProps[]) => {
  return {
    totalJobs: jobs.length,
    totalAmount: jobs.reduce((acc, job) => acc + job.amount, 0),
    totalJobsScheduled: jobs.filter((job) => job.job_progress === "scheduled")
      .length,
    totalJobsInProgress: jobs.filter(
      (job) => job.job_progress === "in-progress",
    ).length,
    totalJobsCompleted: jobs.filter((job) => job.job_progress === "completed")
      .length,
    totalJobsCancelled: jobs.filter((job) => job.job_progress === "cancelled")
      .length,

    totalAmountUnpaid: jobs
      .filter((j) => j.payment_status === "unpaid")
      .reduce((acc, job) => acc + job.amount, 0),

    totalAmountPartiallyPaid: jobs
      .filter((j) => j.payment_status === "partial")
      .reduce((acc, job) => acc + job.amount, 0),

    totalUnpaidAmount: jobs
      .filter((j) => j.payment_status === "unpaid")
      .reduce((acc, job) => acc + job.amount, 0),

    totalAmountPaid: jobs
      .filter((j) => j.payment_status === "paid")
      .reduce((acc, job) => acc + job.amount, 0),

    totalAmountScheduled: jobs
      .filter(
        (j) =>
          j.payment_status === "paid" ||
          j.payment_status === "partial" ||
          j.payment_status === "unpaid",
      )
      .reduce((acc, job) => acc + job.amount, 0),

    totalAmountInProgress: jobs
      .filter(
        (j) =>
          j.payment_status === "paid" ||
          j.payment_status === "partial" ||
          j.payment_status === "unpaid",
      )
      .reduce((acc, job) => acc + job.amount, 0),
  };
};
