"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getDefaultLoginValues } from "@/utils/helper/defaultValues";
import { loginSchema, LoginFormData } from "@/utils/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { cn } from "@/utils/cn";
import { ArrowBigRight, Eye, EyeOff, LockKeyhole } from "lucide-react";
import { useAuth } from "@/hook/useAuth";
import { AuthSignInProps } from "@/types/auth";
import { useState } from "react";
import toast from "react-hot-toast";

const LogInPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { control, handleSubmit, formState, reset } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: getDefaultLoginValues(),
    mode: "onChange",
  });

  const router = useRouter();

  const { handleLogin } = useAuth();

  const onSubmit = async (data: AuthSignInProps) => {
    try {
      await handleLogin(data);
      reset();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";

      toast.error(message);
      if (message.toLowerCase().includes("invalid")) {
        reset({ ...data, password: "" });
      }
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
    <section className="bg-background max-w-md space-y-6 rounded-xl pt-8 pb-2">
      <div className="space-y-1 text-center">
        <h1 className="text-4xl font-bold">Welcome Back</h1>
        <p>Sign in to your account to continue</p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 px-5"
      >
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
                  type={showPassword ? "text" : "password"}
                  id={field.name}
                  placeholder="******"
                  autoComplete="current-password"
                  disabled={formState.isSubmitting}
                  className={inputClassName(
                    !!fieldState.error,
                    fieldState.isTouched,
                  )}
                />
                <Button
                  type="button"
                  className="text-muted-foreground absolute top-1/2 right-2 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={formState.isSubmitting}
                  variant="ghost"
                >
                  {showPassword ? <Eye /> : <EyeOff />}
                </Button>
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

        <Button
          type="submit"
          disabled={formState.isSubmitting}
          className={cn(
            "py-6.5 text-base font-semibold transition-all duration-200 ease-in-out hover:scale-105 active:scale-[0.98]",
            formState.errors.root && "cursor-not-allowed opacity-50",
          )}
        >
          {formState.isSubmitting ? "Signing In..." : "Sign In"}
        </Button>
      </form>

      <div className="mt-14 space-y-5 border-t px-5 pt-4 pb-10">
        <div>
          <p className="text-muted-foreground text-center text-xs">
            Forgot your password?
          </p>

          <Button
            variant="link"
            type="button"
            onClick={() => router.push("/forgot-password")}
            className="w-full py-6.5 text-base font-semibold transition-all duration-200 ease-in-out hover:scale-105 active:scale-95"
          >
            <LockKeyhole /> Reset Password
          </Button>
        </div>

        <div className="space-y-2 text-center">
          <p className="text-muted-foreground text-center text-xs">
            Don&apos;t have an account?
          </p>

          <Button
            variant="outline"
            type="button"
            onClick={() => router.push("/signup")}
            className="w-full py-6.5 text-base font-semibold transition-all duration-200 ease-in-out hover:scale-105 active:scale-95"
          >
            Create an Account <ArrowBigRight />
          </Button>
        </div>
      </div>

      <div>
        <p className="text-muted-foreground text-center text-xs text-balance">
          By signing in you agree to our Terms of Use and Privacy Policy
        </p>
      </div>
    </section>
  );
};

export default LogInPage;
