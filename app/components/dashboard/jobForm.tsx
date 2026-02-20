"use client";

import { Input } from "@/components/ui/input";
import { handleStartDate, nextDueDate, today } from "./datePicker";
import JobProgress from "./jobProgress";
import PaymentStatus from "./paymentStatus";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import {
  JobDialogProps,
  JobStatusTypes,
  PaymentStatusTypes,
} from "@/types/dashboard";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/button";
import { JobFormData, jobSchema } from "@/utils/zodSchema";
import { formatCurrency, parseCurrency } from "@/utils/helper/formatCurrency";
import { OnJobSubmit } from "./onJobSubmit";
import { getDefaultEmptyJobValues } from "@/utils/helper/defaultValues";

const JobForm = ({ setIsDialogOpen }: JobDialogProps) => {
  const [startDate, setStartDate] = useState(today);
  const [dueDate, setDueDate] = useState(nextDueDate);
  const [manualDueDate, setManualDueDate] = useState(false);

  const [jobProgress, setJobProgress] = useState<JobStatusTypes>("in-progress");
  const [paymentStatus, setPaymentStatus] =
    useState<PaymentStatusTypes>("unpaid");

  const { control, handleSubmit, reset, formState } = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: getDefaultEmptyJobValues(),
    mode: "onSubmit",
  });

  const inputClassName = (hasError: boolean, isTouched: boolean) =>
    cn(
      "bg-muted focus-visible:border-muted-foreground/50 py-5 text-sm leading-none font-medium shadow peer-disabled:cursor-not-allowed peer-disabled:opacity-70 focus-visible:ring-0 focus-visible:ring-offset-0",
      hasError ? "border-destructive" : isTouched && "border-emerald-500",
    );

  return (
    <form
      onSubmit={handleSubmit((data) =>
        OnJobSubmit({ data, reset, setIsDialogOpen }),
      )}
      className="flex flex-col gap-4"
    >
      <Controller
        control={control}
        name="title"
        render={({ field, fieldState }) => (
          <div className="space-y-1">
            <Label
              htmlFor={field.name}
              className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Job Title
            </Label>
            <Input
              {...field}
              id={field.name}
              placeholder="CCTV Installation"
              autoComplete={field.name}
              className={inputClassName(
                !!fieldState.error,
                fieldState.isTouched,
              )}
            />
            {fieldState.error && (
              <p
                className="text-destructive -mt-1 text-xs font-medium"
                role="alert"
              >
                {fieldState.error.message}
              </p>
            )}
          </div>
        )}
      />

      <Controller
        control={control}
        name="client"
        render={({ field, fieldState }) => (
          <div className="space-y-1">
            <Label
              htmlFor={field.name}
              className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Client Name
            </Label>
            <Input
              {...field}
              id={field.name}
              placeholder="James Smith"
              autoComplete={field.name}
              className={inputClassName(
                !!fieldState.error,
                fieldState.isTouched,
              )}
            />
            {fieldState.error && (
              <p
                className="text-destructive -mt-1 text-xs font-medium"
                role="alert"
              >
                {fieldState.error.message}
              </p>
            )}
          </div>
        )}
      />

      <Controller
        control={control}
        name="amount"
        render={({ field, fieldState }) => (
          <div className="space-y-1">
            <Label
              htmlFor={field.name}
              className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Amount
            </Label>
            <div>
              <Input
                id={field.name}
                type="text"
                inputMode="numeric"
                placeholder={field.name}
                className={cn(
                  inputClassName(!!fieldState.error, fieldState.isTouched),
                )}
                value={formatCurrency(field.value.toString())}
                onChange={(e) => field.onChange(parseCurrency(e.target.value))}
                onBlur={field.onBlur}
              />
            </div>
            {fieldState.error && (
              <p
                className="text-destructive -mt-1 text-xs font-medium"
                role="alert"
              >
                {fieldState.error.message}
              </p>
            )}
          </div>
        )}
      />

      <Controller
        control={control}
        name="location"
        render={({ field, fieldState }) => (
          <div className="space-y-1">
            <Label
              htmlFor={field.name}
              className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Location
            </Label>
            <Input
              {...field}
              id={field.name}
              placeholder="Nyali"
              className={inputClassName(
                !!fieldState.error,
                fieldState.isTouched,
              )}
            />
            {fieldState.error && (
              <p
                className="text-destructive -mt-1 text-xs font-medium"
                role="alert"
              >
                {fieldState.error.message}
              </p>
            )}
          </div>
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <Controller
          control={control}
          name="startDate"
          render={({ field, fieldState }) => (
            <div className="space-y-1">
              <Label htmlFor={field.name}>Start Date</Label>
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
                className={inputClassName(
                  !!fieldState.error,
                  fieldState.isTouched,
                )}
              />
              {fieldState.error && (
                <p
                  className="text-destructive -mt-1 text-xs font-medium"
                  role="alert"
                >
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />

        <Controller
          control={control}
          name="dueDate"
          render={({ field, fieldState }) => (
            <div className="space-y-1">
              <Label htmlFor={field.name}>Due Date</Label>
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
                className={inputClassName(
                  !!fieldState.error,
                  fieldState.isTouched,
                )}
              />
              {fieldState.error && (
                <p
                  className="text-destructive -mt-1 text-xs font-medium"
                  role="alert"
                >
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      <div className="flex justify-between gap-4">
        <div className="space-y-1">
          <Label
            htmlFor="status"
            className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Job Progress
          </Label>
          <JobProgress
            value={jobProgress}
            onChange={(value) => setJobProgress(value)}
          />
        </div>

        <div className="space-y-1">
          <Label
            htmlFor="payment-status"
            className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Payment Status
          </Label>
          <PaymentStatus
            value={paymentStatus}
            onChange={(value) => setPaymentStatus(value)}
          />
        </div>
      </div>

      <div className="flex w-full justify-end gap-3">
        <Button
          variant="outline"
          onClick={() => {
            setIsDialogOpen(false);
            getEmptyJob();
          }}
          className="transition-all duration-200 ease-in-out hover:scale-105 active:scale-95"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={formState.isSubmitting}
          className={cn(
            "transition-all duration-200 ease-in-out hover:scale-105 active:scale-95",
            formState.errors.root && "cursor-not-allowed opacity-50",
          )}
        >
          {formState.isSubmitting ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
};

export default JobForm;
