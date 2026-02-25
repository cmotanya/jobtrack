"use client";

import { Input } from "@/components/ui/input";
import { handleStartDate, nextDueDate, today } from "./datePicker";
import JobProgress from "./jobProgress";
import PaymentStatus from "./paymentStatus";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { JobDialogProps } from "@/types/dashboard";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { JobFormData, jobSchema } from "@/helpers/zodSchema";
import { formatCurrency, parseCurrency } from "@/helpers/formatCurrency";
import { OnJobSubmit } from "./onJobSubmit";
import { getDefaultEmptyJobValues } from "@/helpers/defaultValues";
import { cn } from "@/lib/utils";
import { Briefcase, User, Banknote, MapPin, CalendarDays } from "lucide-react";

const JobForm = ({ setIsDialogOpen }: JobDialogProps) => {
  const [startDate, setStartDate] = useState(today);
  const [dueDate, setDueDate] = useState(nextDueDate);
  const [manualDueDate, setManualDueDate] = useState(false);

  const { control, handleSubmit, reset, formState, setValue } =
    useForm<JobFormData>({
      resolver: zodResolver(jobSchema),
      defaultValues: {
        ...getDefaultEmptyJobValues(),
        job_progress: "in-progress",
        payment_status: "unpaid",
      },
      mode: "onSubmit",
    });

  const onSubmit = async (data: JobFormData) => {
    await OnJobSubmit({ data, reset, setIsDialogOpen });
  };

  const inputClass = (hasError: boolean, isTouched: boolean) =>
    cn(
      "h-10 bg-white pl-9 text-sm placeholder:text-zinc-400 border-muted-foreground/40 focus-visible:ring-0  focus-visible:border-primary/40 transition",
      hasError
        ? "border-destructive/40 border-destructive/40"
        : isTouched && "border-success",
    );

  const fieldLabel = (text: string, htmlFor: string) => (
    <Label
      htmlFor={htmlFor ?? text}
      className="text-muted-foreground text-xs font-semibold tracking-wide uppercase"
    >
      {text}
    </Label>
  );

  const fieldError = (message?: string) =>
    message ? (
      <p className="text-destructive text-xs font-medium" role="alert">
        {message}
      </p>
    ) : null;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-muted flex flex-col gap-2.5 px-6 py-4"
    >
      {/* title */}
      <Controller
        control={control}
        name="title"
        render={({ field, fieldState }) => (
          <div className="space-y-1.5">
            {fieldLabel("Job Title", field.name)}
            <div className="relative">
              <Briefcase
                size={14}
                className="absolute top-1/2 left-3 -translate-y-1/2 text-zinc-400"
              />
              <Input
                {...field}
                id={field.name}
                placeholder="e.g. CCTV Installation"
                autoComplete={field.name}
                className={inputClass(!!fieldState.error, fieldState.isTouched)}
              />
            </div>
            {fieldError(fieldState.error?.message)}
          </div>
        )}
      />

      {/* name */}
      <Controller
        control={control}
        name="client"
        render={({ field, fieldState }) => (
          <div className="space-y-1.5">
            {fieldLabel("Client Name", field.name)}
            <div className="relative">
              <User
                size={14}
                className="absolute top-1/2 left-3 -translate-y-1/2 text-zinc-400"
              />
              <Input
                {...field}
                id={field.name}
                placeholder="e.g. James Smith"
                autoComplete={field.name}
                className={inputClass(!!fieldState.error, fieldState.isTouched)}
              />
            </div>
            {fieldError(fieldState.error?.message)}
          </div>
        )}
      />

      {/* amount + location */}
      <div className="grid grid-cols-2 gap-4">
        <Controller
          control={control}
          name="amount"
          render={({ field, fieldState }) => (
            <div className="space-y-1.5">
              {fieldLabel("Amount", field.name)}
              <div className="relative">
                <Banknote
                  size={14}
                  className="absolute top-1/2 left-3 -translate-y-1/2 text-zinc-400"
                />
                <Input
                  id={field.name}
                  type="text"
                  inputMode="numeric"
                  placeholder="KES 0"
                  className={inputClass(
                    !!fieldState.error,
                    fieldState.isTouched,
                  )}
                  value={formatCurrency(field.value.toString())}
                  onChange={(e) =>
                    field.onChange(parseCurrency(e.target.value))
                  }
                  onBlur={field.onBlur}
                />
              </div>
              {fieldError(fieldState.error?.message)}
            </div>
          )}
        />

        <Controller
          control={control}
          name="location"
          render={({ field, fieldState }) => (
            <div className="space-y-1.5">
              {fieldLabel("Location", field.name)}
              <div className="relative">
                <MapPin
                  size={14}
                  className="absolute top-1/2 left-3 -translate-y-1/2 text-zinc-400"
                />
                <Input
                  {...field}
                  id={field.name}
                  placeholder="e.g. Nyali"
                  className={inputClass(
                    !!fieldState.error,
                    fieldState.isTouched,
                  )}
                />
              </div>
              {fieldError(fieldState.error?.message)}
            </div>
          )}
        />
      </div>

      {/* date selection */}
      <div className="grid grid-cols-2 gap-4">
        <Controller
          control={control}
          name="start_date"
          render={({ field, fieldState }) => (
            <div className="space-y-1.5">
              {fieldLabel("Start Date", field.name)}
              <div className="relative">
                <CalendarDays
                  size={14}
                  className="absolute top-1/2 left-3 -translate-y-1/2 text-zinc-400"
                />
                <Input
                  {...field}
                  type="date"
                  id={field.name}
                  value={startDate}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    handleStartDate({
                      value: e.target.value,
                      setStartDate,
                      manualDueDate,
                      setDueDate,
                    });
                  }}
                  className={cn(
                    inputClass(!!fieldState.error, fieldState.isTouched),
                    "pl-9",
                  )}
                />
              </div>
              {fieldError(fieldState.error?.message)}
            </div>
          )}
        />

        <Controller
          control={control}
          name="due_date"
          render={({ field, fieldState }) => (
            <div className="space-y-1.5">
              {fieldLabel("Due Date", field.name)}
              <div className="relative">
                <CalendarDays
                  size={14}
                  className="absolute top-1/2 left-3 -translate-y-1/2 text-zinc-400"
                />
                <Input
                  type="date"
                  id={field.name}
                  value={dueDate}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    setManualDueDate(true);
                    setDueDate(e.target.value);
                  }}
                  onBlur={field.onBlur}
                  className={cn(
                    inputClass(!!fieldState.error, fieldState.isTouched),
                    "pl-9",
                  )}
                />
              </div>
              {fieldError(fieldState.error?.message)}
            </div>
          )}
        />
      </div>

      {/* status selection */}
      <div className="grid grid-cols-2 gap-4 rounded-xl border border-zinc-100 bg-white p-4">
        <Controller
          control={control}
          name="job_progress"
          render={({ field }) => (
            <div className="space-y-1.5">
              {fieldLabel("Job Progress", field.name)}
              <JobProgress
                value={field.value}
                onChange={(value) => {
                  field.onChange(value);
                  setValue("job_progress", value);
                }}
              />
            </div>
          )}
        />

        <Controller
          control={control}
          name="payment_status"
          render={({ field }) => (
            <div className="space-y-1.5">
              {fieldLabel("Payment Status", field.name)}
              <PaymentStatus
                value={field.value}
                onChange={(value) => {
                  field.onChange(value);
                  setValue("payment_status", value);
                }}
              />
            </div>
          )}
        />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-2.5">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setIsDialogOpen(false);
            getDefaultEmptyJobValues();
          }}
          className="h-9 border-zinc-200 px-5 text-sm text-zinc-500 hover:bg-zinc-50 hover:text-zinc-700"
        >
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={formState.isSubmitting}
          className={cn(
            "h-9 bg-indigo-600 px-5 text-sm font-semibold text-white shadow-sm shadow-indigo-500/20 hover:bg-indigo-700 active:scale-95",
            !formState.isValid && "cursor-not-allowed opacity-50",
          )}
        >
          {formState.isSubmitting ? "Saving..." : "Save Job"}
        </Button>
      </div>
    </form>
  );
};

export default JobForm;
