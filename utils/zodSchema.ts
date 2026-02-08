import { z } from "zod";

export const jobSchema = z
  .object({
    title: z.string().min(1, { message: "Title is required" }),
    client: z.string().min(1, { message: "Client name is required" }),
    amount: z.number().gt(0, { message: "Amount must be greater than 0" }),
    location: z.string().min(1, { message: "Location is required" }),

    status: z.enum([
      "scheduled",
      "in-progress",
      "on-hold",
      "completed",
      "cancelled",
    ]),
    paymentStatus: z.enum(["unpaid", "partial", "paid"]),

    startDate: z.string().min(1, { message: "Start date is required" }),
    dueDate: z.string().min(1, { message: "Due date is required" }),
  })
  .refine((data) => new Date(data.dueDate) > new Date(data.startDate), {
    message: "Due date must be after start date",
    path: ["dueDate"],
  });

export type JobSchemaData = z.infer<typeof jobSchema>;
