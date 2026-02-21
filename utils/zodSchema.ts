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

export const loginSchema = z.object({
  email: z
    .email({ message: "Invalid email" })
    .min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const signUpSchema = z
  .object({
    fullName: z
      .string()
      .min(2, { message: "Name must be at least 2 character" }),
    email: z
      .email({ message: "Please enter a valid email" })
      .min(1, { message: "Email is required" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z
    .email({ message: "Please enter a valid email" })
    .min(1, { message: "Email is required" }),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type JobFormData = z.infer<typeof jobSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
