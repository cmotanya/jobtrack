export const jobStatusColor: Record<string, string>[] = [
  {
    value: "scheduled",
    label: "Scheduled",
    color: "bg-violet-100 text-violet-700 border border-violet-300",
  },
  {
    value: "in-progress",
    label: "In Progress",
    color: "bg-sky-100 text-sky-700 border border-sky-300",
  },
  {
    value: "on-hold",
    label: "On Hold",
    color: "bg-amber-100 text-amber-700 border border-amber-300",
  },
  {
    value: "completed",
    label: "Completed",
    color: "bg-emerald-100 text-emerald-700 border border-emerald-300",
  },
  {
    value: "cancelled",
    label: "Cancelled",
    color: "bg-rose-100 text-rose-700 border border-rose-300",
  },
];

export const paymentStatusColor = [
  {
    value: "unpaid",
    label: "Unpaid",
    color: "bg-red-100 text-red-700 border border-red-300",
  },
  {
    value: "partial",
    label: "Partial",
    color: "bg-orange-100 text-orange-700 border border-orange-300",
  },
  {
    value: "paid",
    label: "Paid",
    color: "bg-teal-100 text-teal-700 border border-teal-300",
  },
];
