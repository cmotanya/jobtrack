"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { AuthResetPasswordProps } from "@/types/auth";
import { getDefaultResetPasswordValues } from "@/helpers/defaultValues";
import {
  ResetPasswordFormData,
  resetPasswordSchema,
} from "@/helpers/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { resetPasswordAction } from "./actions";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hook/useAuth";

const ResetPasswordPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const router = useRouter();

  const { control, handleSubmit, formState, reset } =
    useForm<ResetPasswordFormData>({
      resolver: zodResolver(resetPasswordSchema),
      defaultValues: getDefaultResetPasswordValues(),
      mode: "onChange",
    });

  const { handleResetPassword } = useAuth();

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
    <section className="max-w-md justify-center">
      <div className="space-y-5">
        <div className="px-4 text-center tracking-tight">
          <h1 className="text-3xl font-bold">Reset Password</h1>
          <p className="text-xs">Enter new password for your account.</p>
        </div>

        <form
          onSubmit={handleSubmit((data) =>
            handleResetPassword(data, { reset, setIsSuccess }),
          )}
          noValidate
          className="space-y-4"
        >
          <Controller
            control={control}
            name="password"
            render={({ field, fieldState }) => (
              <div>
                {fieldLabel("New Password")}
                <div className="relative">
                  <LockKeyhole
                    size={14}
                    className="absolute top-1/2 left-3 -translate-y-1/2 text-zinc-400"
                  />
                  <Input
                    {...field}
                    id={field.name}
                    type={showPassword ? "text" : "password"}
                    inputMode="numeric"
                    maxLength={10}
                    placeholder="******"
                    autoComplete="new-password"
                    aria-describedby="passwordError"
                    disabled={formState.isSubmitting}
                    className={inputClass(
                      fieldState.invalid,
                      fieldState.isTouched,
                    )}
                  />

                  <Button
                    type="button"
                    className="absolute top-1/2 right-2 -translate-y-1/2 text-zinc-400"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={formState.isSubmitting}
                    variant="ghost"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <Eye /> : <EyeOff />}
                  </Button>
                </div>

                {fieldError(fieldState.error?.message)}
              </div>
            )}
          />
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field, fieldState }) => (
              <div>
                {fieldLabel("Confirm Password")}
                <div className="relative">
                  <LockKeyhole
                    size={14}
                    className="absolute top-1/2 left-3 -translate-y-1/2 text-zinc-400"
                  />
                  <Input
                    {...field}
                    id={field.name}
                    type={showConfirmPassword ? "text" : "password"}
                    inputMode="numeric"
                    maxLength={10}
                    placeholder="******"
                    autoComplete="new-password"
                    aria-describedby="confirmPasswordError"
                    disabled={formState.isSubmitting}
                    className={inputClass(
                      fieldState.invalid,
                      fieldState.isTouched,
                    )}
                  />

                  <Button
                    type="button"
                    className="absolute top-1/2 right-2 -translate-y-1/2 text-zinc-400"
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

                {fieldError(fieldState.error?.message)}
              </div>
            )}
          />

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={formState.isSubmitting}
              className={cn(
                "transition-all duration-200 ease-in-out hover:scale-105 active:scale-[0.98]",
                !formState.isValid && "cursor-not-allowed opacity-50",
              )}
            >
              {formState.isSubmitting
                ? "Saving..."
                : isSuccess
                  ? "Saved"
                  : "Save Password"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ResetPasswordPage;
