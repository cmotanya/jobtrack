"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hook/useAuth";
import { cn } from "@/lib/utils";
import { AuthResetPasswordProps } from "@/types/auth";
import { getDefaultResetPasswordValues } from "@/utils/helper/defaultValues";
import { ResetPasswordFormData, resetPasswordSchema } from "@/utils/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { resetPasswordAction } from "./actions";

const ResetPasswordPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // const { handleResetPassword } = useAuth();
  const router = useRouter();

  const { control, handleSubmit, formState, reset } =
    useForm<ResetPasswordFormData>({
      resolver: zodResolver(resetPasswordSchema),
      defaultValues: getDefaultResetPasswordValues(),
      mode: "onChange",
    });

  const onSubmit = async (data: AuthResetPasswordProps) => {
    const result = await resetPasswordAction({ ...data });

    if (result.error) toast.error(result.error.message);

    if (result.success) toast.success("Password reset successfully!");

    reset();
    router.push("/login");
  };

  const inputClassName = (hasError: boolean, isTouched: boolean) =>
    cn(
      "bg-muted focus-visible:border-muted-foreground/50 py-6 text-sm border border-muted-foreground/50 leading-none font-medium  peer-disabled:cursor-not-allowed peer-disabled:opacity-70 focus-visible:ring-0 focus-visible:ring-offset-0",
      hasError
        ? "border-2 border-destructive"
        : isTouched && "border-2 border-success",
    );
  return (
    <section className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Reset Password</h1>
        <p>Enter your new password below.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Controller
          control={control}
          name="password"
          render={({ field, fieldState }) => (
            <div className="space-y-1">
              <Label htmlFor={field.name}>Password</Label>

              <div className="relative">
                <Input
                  {...field}
                  id={field.name}
                  type={showPassword ? "text" : "password"}
                  placeholder="******"
                  autoComplete="new-password"
                  aria-describedby="passwordError"
                  disabled={formState.isSubmitting}
                  className={inputClassName(
                    fieldState.invalid,
                    fieldState.isTouched,
                  )}
                />
                <Button
                  type="button"
                  className="text-muted-foreground absolute top-1/2 right-2 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={formState.isSubmitting}
                  variant="ghost"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <Eye /> : <EyeOff />}
                </Button>
              </div>

              {fieldState.error && (
                <p
                  id="passwordError"
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
          name="confirmPassword"
          render={({ field, fieldState }) => (
            <div className="space-y-1">
              <Label htmlFor={field.name}>Confirm Password</Label>
              <div className="relative">
                <Input
                  {...field}
                  id={field.name}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="******"
                  autoComplete="new-password"
                  aria-describedby="confirmPasswordError"
                  disabled={formState.isSubmitting}
                  className={inputClassName(
                    fieldState.invalid,
                    fieldState.isTouched,
                  )}
                />
                <Button
                  type="button"
                  className="text-muted-foreground absolute top-1/2 right-2 -translate-y-1/2"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={formState.isSubmitting}
                  variant="ghost"
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? <Eye /> : <EyeOff />}
                </Button>
              </div>

              {fieldState.error && (
                <p
                  id="confirmPasswordError"
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
            className={cn(
              "py-6.5 font-semibold transition-all duration-200 ease-in-out hover:scale-105 active:scale-[0.98]",
              formState.errors.root && "cursor-not-allowed opacity-50",
            )}
          >
            {formState.isSubmitting ? "Saving..." : "Save Password"}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default ResetPasswordPage;
