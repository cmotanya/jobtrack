"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getDefaultLoginValues } from "@/helpers/defaultValues";
import { loginSchema, LoginFormData } from "@/helpers/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useAuth } from "@/hook/useAuth";

const LogInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  // const [isSuccess, setIsSuccess] = useState(false);

  const { control, handleSubmit, formState, reset } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: getDefaultLoginValues(),
    mode: "onChange",
  });

  const { handleLogin } = useAuth();

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
    <section className="w-full max-w-md">
      <div className="space-y-6">
        <div className="space-y-1 text-center tracking-tight">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-xs">Sign in to your account to continue</p>
        </div>

        <form
          onSubmit={handleSubmit((data) => handleLogin(data, { reset }))}
          noValidate
          className="mx-8 flex flex-col gap-2.5"
        >
          <Controller
            control={control}
            name="email"
            render={({ field, fieldState }) => (
              <div>
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

          <Controller
            control={control}
            name="password"
            render={({ field, fieldState }) => (
              <div>
                {fieldLabel(field.name)}
                <div className="relative">
                  <LockKeyhole
                    size={14}
                    className="absolute top-1/2 left-3 -translate-y-1/2 text-zinc-400"
                  />
                  <Input
                    {...field}
                    id={field.name}
                    type={showPassword ? "text" : "password"}
                    placeholder="******"
                    inputMode="numeric"
                    maxLength={10}
                    aria-describedby="passwordError"
                    autoComplete="current-password"
                    disabled={formState.isSubmitting}
                    className={cn(
                      inputClass(!!fieldState.error, fieldState.isTouched),
                      "pr-10",
                    )}
                  />

                  <Button
                    variant="ghost"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={formState.isSubmitting}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-zinc-400 transition"
                  >
                    {showPassword ? <Eye size={14} /> : <EyeOff size={14} />}
                  </Button>
                </div>

                {fieldError(fieldState.error?.message)}
              </div>
            )}
          />

          <div className="ml-auto">
            <Link
              href="/forgot-password"
              className="text-center text-xs underline"
            >
              Forgot your password?
            </Link>
          </div>

          <div className="ml-auto">
            <Button
              type="submit"
              disabled={formState.isSubmitting}
              className={cn(
                "font-semibold transition-all duration-200 ease-in-out hover:scale-105 active:scale-[0.98]",
                !formState.isValid && "cursor-not-allowed opacity-50",
              )}
            >
              {formState.isSubmitting ? "Signing In..." : "Sign In"}
            </Button>
          </div>
        </form>

        <p className="text-center text-xs">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-primary font-semibold underline">
            Sign Up
          </Link>
        </p>
      </div>

      <div className="absolute bottom-5 left-1/2 w-2/3 -translate-x-1/2">
        <p className="text-muted-foreground text-center text-[10px] tracking-tight">
          By signing in you agree to our Terms of Use and Privacy Policy
        </p>
      </div>
    </section>
  );
};

export default LogInPage;
