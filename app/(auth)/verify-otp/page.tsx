"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { getDefaultVerifyOTPValues } from "@/utils/helper/defaultValues";
import { VerifyOTPFormData, verifyOTPSchema } from "@/utils/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { verifyOTPAction } from "./actions";
import toast from "react-hot-toast";

const VerifyOTPPage = () => {
  const router = useRouter();

  const { control, handleSubmit, formState } = useForm<VerifyOTPFormData>({
    resolver: zodResolver(verifyOTPSchema),
    defaultValues: getDefaultVerifyOTPValues(),
    mode: "onChange",
  });

  const onSubmit = async (data: VerifyOTPFormData) => {
    const email = sessionStorage.getItem("reset-email");

    const result = await verifyOTPAction({ email: email!, otp: data.otp });

    if (!email) {
      toast.error("Session expired. Please request a new code.");
      router.push("/reset-password");
      return;
    }

    if (!result.success) {
      toast.error(result.error || "An error occurred during sign up");
      return;
    }

    sessionStorage.removeItem("reset-email");
    router.push("/reset-password");
  };

  const inputClassName = (hasError: boolean, isTouched: boolean) =>
    cn(
      "bg-muted focus-visible:border-muted-foreground/50 py-6 text-sm border border-muted-foreground/50 leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 focus-visible:ring-0 focus-visible:ring-offset-0",
      hasError
        ? "border-2 border-destructive"
        : isTouched && "border-2 border-success",
    );

  return (
    <section className="bg-background space-y-8 rounded-md py-10">
      <div className="space-y-2 px-5 text-center">
        <h1 className="text-3xl font-bold whitespace-nowrap">
          Enter Reset Code
        </h1>
        <p className="text-muted-foreground text-sm font-medium text-balance">
          We&apos;ve sent a 6-digit code to your email. Enter it below.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-5">
        <Controller
          control={control}
          name="otp"
          render={({ field, fieldState }) => (
            <div className="space-y-1">
              <Label htmlFor={field.name}>6-Digit Code</Label>
              <Input
                {...field}
                id={field.name}
                type="text"
                inputMode="numeric"
                maxLength={8}
                placeholder="12345678"
                autoComplete="one-time-code"
                disabled={formState.isSubmitting}
                className={inputClassName(
                  fieldState.invalid,
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

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={formState.isSubmitting}
            className="py-6.5 font-semibold transition-all duration-200 ease-in-out hover:scale-105 active:scale-95"
          >
            {formState.isSubmitting ? "Verifying..." : "Verify Code"}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default VerifyOTPPage;
