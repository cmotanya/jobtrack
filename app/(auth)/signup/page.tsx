"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/utils/cn";
import { getDefaultSignUpValues } from "@/utils/helper/defaultValues";
import { SignUpFormData, signUpSchema } from "@/utils/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowBigRight, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AuthSignUpProps } from "@/types/auth";
import { SignUpAction } from "./actions";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { control, formState, handleSubmit, reset } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: getDefaultSignUpValues(),
    mode: "onChange",
  });

  const router = useRouter();

  const onSubmit = async (data: AuthSignUpProps) => {
    const result = await SignUpAction(data);

    if (!result?.success) {
      toast.error(result?.error || "An error occurred during sign up");
      reset({ ...data, password: "", confirmPassword: "" });
      return;
    }

    if (result?.needsConfirmation) {
      toast.success("Please check your email to confirm your account.");
      router.push("/login");
    } else {
      toast.success("Account created successfully!");
      reset();
      router.push("/dashboard");
    }
  };

  const inputClassName = (hasError: boolean, isTouched: boolean) =>
    cn(
      "bg-muted focus-visible:border-muted-foreground/50 py-6 text-sm border border-muted-foreground/50 leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 focus-visible:ring-0 focus-visible:ring-offset-0",
      hasError
        ? "border-2 border-destructive"
        : isTouched && "border-2 border-success",
    );

  return (
    <section className="bg-background space-y-6 rounded-md px-5 py-8">
      <div className="space-y-1 text-center">
        <h1 className="text-4xl font-bold">Create Account</h1>
        <p>Join us and start your journey today</p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate={true}
        className="flex flex-col gap-4"
      >
        <Controller
          control={control}
          name="fullName"
          render={({ field, fieldState }) => (
            <div className="space-y-1">
              <Label htmlFor={field.name} className="font-medium">
                Full Name
              </Label>
              <Input
                {...field}
                id={field.name}
                type="text"
                placeholder="John Doe"
                autoComplete="name"
                aria-describedby="nameError"
                disabled={formState.isSubmitting}
                className={inputClassName(
                  fieldState.invalid,
                  fieldState.isTouched,
                )}
              />

              {fieldState.error && (
                <p
                  id="nameError"
                  aria-live="polite"
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
          name="email"
          render={({ field, fieldState }) => (
            <div className="space-y-1">
              <Label htmlFor={field.name} className="font-medium">
                Email
              </Label>
              <Input
                {...field}
                id={field.name}
                type="email"
                placeholder="name@email.com"
                autoComplete="email"
                aria-describedby="emailError"
                disabled={formState.isSubmitting}
                className={inputClassName(
                  fieldState.invalid,
                  fieldState.isTouched,
                )}
              />

              {fieldState.error && (
                <p
                  id="emailError"
                  aria-live="polite"
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
          name="password"
          render={({ field, fieldState }) => (
            <div className="space-y-1">
              <Label htmlFor={field.name} className="font-medium">
                Password
              </Label>
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
                  aria-live="polite"
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
              <Label htmlFor={field.name} className="font-medium">
                Confirm Password
              </Label>
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

        <Button
          type="submit"
          disabled={formState.isSubmitting}
          className={cn(
            "mt-6 py-6.5 text-base font-semibold transition-all duration-200 ease-in-out hover:scale-105 active:scale-95",
            formState.errors.root && "cursor-not-allowed opacity-50",
          )}
        >
          {formState.isSubmitting ? (
            "Creating Account..."
          ) : (
            <span className="flex items-center gap-3">
              Create Account <ArrowBigRight size={20} />
            </span>
          )}
        </Button>
      </form>

      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-center text-sm">
          Already have an account?{" "}
        </p>
        <Button
          variant="outline"
          onClick={() => router.push("/login")}
          disabled={formState.isSubmitting}
          className="text-primary font-semibold hover:underline"
        >
          Login
        </Button>
      </div>

      <div>
        <p className="text-muted-foreground text-center text-xs text-balance">
          By creating an account you agree to our Terms of Use and Privacy
          Policy
        </p>
      </div>
    </section>
  );
};

export default SignUpPage;
