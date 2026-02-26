"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { AuthForgotPasswordProps } from "@/types/auth";
import { getDefaultForgotPasswordValues } from "@/helpers/defaultValues";
import {
  ForgotPasswordFormData,
  forgotPasswordSchema,
} from "@/helpers/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { forgotPasswordAction } from "./actions";
import Link from "next/link";

const ForgotPasswordPage = () => {
  const { control, handleSubmit, formState } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: getDefaultForgotPasswordValues(),
    mode: "onChange",
  });

  const onSubmit = async (data: AuthForgotPasswordProps) => {
    const result = await forgotPasswordAction({ email: data.email });

    if (!result.success) {
      toast.error(result.error || "Failed to send reset code.");
      return;
    }

    sessionStorage.setItem("reset-email", data.email!);
    toast.success("Please check your email for reset code.");
  };

  const inputClass = (hasError: boolean, isTouched: boolean) =>
    cn(
      "h-10 bg-white pl-9 text-sm placeholder:text-zinc-400 border-muted-foreground/40 focus-visible:ring-0  focus-visible:border-primary/40 transition",
      hasError
        ? "border-destructive/40 border-destructive/40"
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
    <section className="max-w-md py-10">
      <div className="space-y-6">
        <div className="space-y-1 text-center tracking-tight">
          <h1 className="text-3xl font-bold">Forgot Password</h1>
          <p className="text-xs text-balance">
            Enter your email and we&apos;ll send you a link to reset your
            password
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="mx-8 mb-10 flex flex-col gap-4"
        >
          <Controller
            control={control}
            name="email"
            render={({ field, fieldState }) => (
              <div className="space-y-1">
                {fieldLabel(field.name)}
                <div className="relative">
                  <Mail
                    size={14}
                    className="absolute top-1/2 left-3 -translate-y-1/2 text-zinc-400"
                  />
                  <Input
                    {...field}
                    id={field.name}
                    type="email"
                    placeholder="name@email.com"
                    autoComplete={field.name}
                    disabled={formState.isSubmitting}
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

          <div className="ml-auto">
            <Button
              type="submit"
              disabled={formState.isSubmitting}
              className={cn(
                "transition-all duration-200 ease-in-out hover:scale-105 active:scale-[0.98]",
                !formState.isValid && "cursor-not-allowed opacity-50",
              )}
            >
              {formState.isSubmitting ? "Sending..." : "Send Reset Link"}
            </Button>
          </div>
        </form>

        <p className="text-center text-xs">
          Not your account?{" "}
          <Link href="/login" className="text-primary font-semibold underline">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default ForgotPasswordPage;
