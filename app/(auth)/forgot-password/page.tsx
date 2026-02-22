"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { AuthForgotPasswordProps } from "@/types/auth";
import { getDefaultForgotPasswordValues } from "@/utils/helper/defaultValues";
import {
  ForgotPasswordFormData,
  forgotPasswordSchema,
} from "@/utils/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowBigLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { forgotPasswordAction } from "./actions";

const ForgotPasswordPage = () => {
  const { control, handleSubmit, formState, reset } =
    useForm<ForgotPasswordFormData>({
      resolver: zodResolver(forgotPasswordSchema),
      defaultValues: getDefaultForgotPasswordValues(),
      mode: "onChange",
    });

  const router = useRouter();

  const onSubmit = async (data: AuthForgotPasswordProps) => {
    try {
      const result = await forgotPasswordAction({ email: data.email });

      if (result?.success) {
        toast.success(result.message);
        reset();
      } else if (result?.error) {
        toast.error(result?.error);
      }
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "An error occurred during password reset";
      toast.error(message);
    }
  };

  const inputClassName = (hasError: boolean, isTouched: boolean) =>
    cn(
      "bg-muted focus-visible:border-muted-foreground/50 py-6 text-sm border border-muted-foreground/50 leading-none font-medium  peer-disabled:cursor-not-allowed peer-disabled:opacity-70 focus-visible:ring-0 focus-visible:ring-offset-0",
      hasError
        ? "border-2 border-destructive"
        : isTouched && "border-2 border-success",
    );

  return (
    <section className="bg-background max-w-md space-y-8 rounded-xl py-8">
      <div className="space-y-1 text-center text-balance">
        <h1 className="text-4xl font-bold">Forgot Password</h1>
        <p>
          Enter your email and we&apos;ll send you a link to reset your password
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 px-5"
      >
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState }) => (
            <div className="space-y-1">
              <Label htmlFor={field.name}>Email</Label>
              <Input
                {...field}
                id={field.name}
                type="email"
                placeholder="name@email.com"
                autoComplete={field.name}
                disabled={formState.isSubmitting}
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

        <Button
          type="submit"
          disabled={formState.isSubmitting}
          className={cn(
            "py-6.5 text-base font-semibold transition-all duration-200 ease-in-out hover:scale-105 active:scale-[0.98]",
            formState.errors.root && "cursor-not-allowed opacity-50",
          )}
        >
          {formState.isSubmitting ? "Sending..." : "Send Reset Link"}
        </Button>
      </form>

      <div className="space-y-2 px-5 pt-10 text-center text-xs">
        <p>Not your account?</p>
        <Button
          variant="outline"
          type="button"
          onClick={() => router.push("/login")}
          className="w-full py-6.5 text-base font-semibold transition-all duration-200 ease-in-out hover:scale-105 active:scale-95"
        >
          <ArrowBigLeft /> Back to Log In
        </Button>
      </div>
    </section>
  );
};

export default ForgotPasswordPage;
