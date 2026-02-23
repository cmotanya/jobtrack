import { JobProps } from "@/types/dashboard";

export const jobStats = (jobs: JobProps[]) => {
  return {
    totalJobs: jobs.length,
    totalAmount: jobs.reduce((acc, job) => acc + job.amount, 0),
    totalJobsScheduled: jobs.filter((job) => job.status === "scheduled").length,
    totalJobsInProgress: jobs.filter((job) => job.status === "in-progress")
      .length,
    totalJobsCompleted: jobs.filter((job) => job.status === "completed").length,
    totalJobsCancelled: jobs.filter((job) => job.status === "cancelled").length,

    totalAmountUnpaid: jobs
      .filter((j) => j.paymentStatus === "unpaid")
      .reduce((acc, job) => acc + job.amount, 0),

    totalAmountPartiallyPaid: jobs
      .filter((j) => j.paymentStatus === "partial")
      .reduce((acc, job) => acc + job.amount, 0),

    totalUnpaidAmount: jobs
      .filter((j) => j.paymentStatus === "unpaid")
      .reduce((acc, job) => acc + job.amount, 0),

    totalAmountPaid: jobs
      .filter((j) => j.paymentStatus === "paid")
      .reduce((acc, job) => acc + job.amount, 0),

    totalAmountScheduled: jobs
      .filter(
        (j) =>
          j.paymentStatus === "paid" ||
          j.paymentStatus === "partial" ||
          j.paymentStatus === "unpaid",
      )
      .reduce((acc, job) => acc + job.amount, 0),

    totalAmountInProgress: jobs
      .filter(
        (j) =>
          j.paymentStatus === "paid" ||
          j.paymentStatus === "partial" ||
          j.paymentStatus === "unpaid",
      )
      .reduce((acc, job) => acc + job.amount, 0),
  };
};
