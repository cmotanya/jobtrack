"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getDefaultSignUpValues } from "@/helpers/defaultValues";
import { SignUpFormData, signUpSchema } from "@/helpers/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LockKeyhole, Mail, User } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AuthSignUpProps } from "@/types/auth";
import { SignUpAction } from "./actions";
import { cn } from "@/lib/utils";
import Link from "next/link";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { control, formState, handleSubmit, reset } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: getDefaultSignUpValues(),
    mode: "onChange",
  });

  const onSubmit = async (data: AuthSignUpProps) => {
    const result = await SignUpAction(data);

    if (!result?.success) {
      toast.error(result?.error || "An error occurred during sign up");
      reset({ ...data, password: "", confirmPassword: "" });
      return;
    }

    if (result.success) {
      toast.success("Account created successfully!");
      reset();
    }
  };

  const inputClass = (hasError: boolean, isTouched: boolean) =>
    cn(
      "h-10 bg-white pl-9 text-sm placeholder:text-zinc-400 border-muted-foreground/40 focus-visible:ring-0  focus-visible:border-primary/40 transition",
      hasError ? "border-destructive/40" : isTouched && "border-success",
    );

  const fieldLabel = (label: string, text: string) => (
    <Label
      htmlFor={label}
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
    <section className="w-full max-w-md">
      <div className="space-y-6">
        <div className="space-y-1 text-center">
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="text-xs">Join us and start your journey today</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="mx-8 flex flex-col gap-2.5"
        >
          <Controller
            control={control}
            name="full_name"
            render={({ field, fieldState }) => (
              <div className="space-y-1">
                {fieldLabel("full_name", "Full Name")}
                <div className="relative">
                  <User
                    size={14}
                    className="absolute top-1/2 left-3 -translate-y-1/2 text-zinc-400"
                  />
                  <Input
                    {...field}
                    id={field.name}
                    type="text"
                    placeholder="John Doe"
                    autoComplete="name"
                    aria-describedby="nameError"
                    disabled={formState.isSubmitting}
                    className={inputClass(
                      fieldState.invalid,
                      fieldState.isTouched,
                    )}
                  />
                </div>

                {fieldError(fieldState.error?.message)}
              </div>
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field, fieldState }) => (
              <div>
                {fieldLabel("email", "email")}
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

          <Controller
            control={control}
            name="password"
            render={({ field, fieldState }) => (
              <div>
                {fieldLabel("password", "Password")}
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
                {fieldLabel("confirmPassword", "Confirm Password")}
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

          <div className="my-1 ml-auto">
            <Button
              type="submit"
              disabled={formState.isSubmitting}
              className={cn(
                "py-5 font-semibold transition-all duration-200 ease-in-out hover:scale-105 active:scale-95",
                !formState.isValid && "cursor-not-allowed opacity-50",
              )}
            >
              {formState.isSubmitting
                ? "Creating Account..."
                : "Create Account"}
            </Button>
          </div>
        </form>

        <p className="text-muted-foreground text-center text-xs">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-semibold underline">
            Login
          </Link>
        </p>
      </div>

      <div className="absolute bottom-5 left-1/2 w-2/3 -translate-x-1/2">
        <p className="text-muted-foreground text-center text-[10px] tracking-tight text-balance">
          By creating an account you agree to our Terms of Use and Privacy
          Policy
        </p>
      </div>
    </section>
  );
};

export default SignUpPage;
