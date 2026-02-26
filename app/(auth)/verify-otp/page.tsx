"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { getDefaultVerifyOTPValues } from "@/helpers/defaultValues";
import { VerifyOTPFormData, verifyOTPSchema } from "@/helpers/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { verifyOTPAction } from "./actions";
import toast from "react-hot-toast";
import Link from "next/link";
import { ArrowBigLeft } from "lucide-react";
import { useAuth } from "@/hook/useAuth";

const VerifyOTPPage = () => {
  const router = useRouter();

  const { control, handleSubmit, formState } = useForm<VerifyOTPFormData>({
    resolver: zodResolver(verifyOTPSchema),
    defaultValues: getDefaultVerifyOTPValues(),
    mode: "onChange",
  });

  const { handleVerifyOTP } = useAuth();

  const inputClass = (hasError: boolean, isTouched: boolean) =>
    cn(
      "h-10 bg-white text-center text-lg font-bold tracking-[0.8em] text-zinc-800 placeholder:text-muted-foreground/50 placeholder:tracking-[0.8em] border-muted-foreground/40 focus-visible:ring-0   transition",
      hasError
        ? "border-red-400 focus-visible:ring-red-400"
        : isTouched && "border-success",
    );
  const fieldLabel = (text: string) => (
    <Label
      htmlFor={text}
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
    <section className="max-w-md justify-center">
      <div className="space-y-5">
        <div className="px-4 text-center tracking-tight">
          <h1 className="text-3xl font-bold">Enter Reset Code</h1>
          <p className="text-xs text-balance">
            We&apos;ve sent a 6-digit code to your email. Enter it below.
          </p>
        </div>

        <form
          onSubmit={handleSubmit((data) => handleVerifyOTP(data))}
          noValidate
          className="mb-10 space-y-4 px-5"
        >
          <Controller
            control={control}
            name="otp"
            render={({ field, fieldState }) => (
              <div className="space-y-1">
                {fieldLabel("Reset Code")}
                <Input
                  {...field}
                  id={field.name}
                  type="text"
                  inputMode="numeric"
                  maxLength={8}
                  placeholder="12345678"
                  autoComplete="one-time-code"
                  disabled={formState.isSubmitting}
                  className={inputClass(
                    fieldState.invalid,
                    fieldState.isTouched,
                  )}
                />

                {fieldError(fieldState.error?.message)}
              </div>
            )}
          />

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={formState.isSubmitting}
              className={cn(
                "transition-all duration-200 ease-in-out hover:scale-105 active:scale-95",
                !formState.isValid && "cursor-not-allowed opacity-50",
              )}
            >
              {formState.isSubmitting ? "Verifying..." : "Verify Code"}
            </Button>
          </div>
        </form>

        <div className="space-y-6 px-5">
          <p className="text-muted-foreground text-xs">
            Didn&apos;t receive the code?{" "}
            <Link href="/reset-password" className="text-primary font-semibold">
              Resend
            </Link>
          </p>

          <Button
            variant="outline"
            onClick={() => router.push("/login")}
            className="py-5"
          >
            {" "}
            <ArrowBigLeft />
            Back to Login
          </Button>
        </div>
      </div>
    </section>
  );
};

export default VerifyOTPPage;
