// ============================================
// Enhanced Auth Hook
// hooks/useAuth.ts
// ============================================

import { createClient } from "@/lib/supabase/client";
import { AuthSignInProps, AuthSignUpProps } from "@/types/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UseFormReset } from "react-hook-form";

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();
  const router = useRouter();
  const getErrorMessage = (
    err: unknown,
    fallback: string,
  ): string => {
    if (err instanceof Error) return err.message;
    return fallback;
  };

  const handleLogin = async (
    authData: AuthSignInProps,
    reset?: UseFormReset<AuthSignInProps>,
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: authError } =
        await supabase.auth.signInWithPassword(authData);

      if (authError) throw authError;

      // Reset form if provided
      reset?.();

      // Navigate to dashboard
      router.push("/dashboard");
      router.refresh();

      return { success: true, data };
    } catch (err: unknown) {
      const errorMessage = getErrorMessage(
        err,
        "An error occurred during login",
      );
      setError(errorMessage);

      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (
    authData: AuthSignUpProps,
    reset?: UseFormReset<AuthSignUpProps>,
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: authError } = await supabase.auth.signUp(authData);

      if (authError) throw authError;

      // Reset form if provided
      reset?.();

      // Check if email confirmation is required
      if (data.user && !data.session) {
        return { success: true, needsConfirmation: true };
      } else {
        // Auto-login successful
        router.push("/dashboard");
        router.refresh();
        return { success: true, needsConfirmation: false, data };
      }
    } catch (err: unknown) {
      const errorMessage = getErrorMessage(
        err,
        "An error occurred during signup",
      );
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { error: authError } = await supabase.auth.signOut();

      if (authError) throw authError;

      router.push("/login");
      router.refresh();

      return { success: true };
    } catch (err: unknown) {
      const errorMessage = getErrorMessage(
        err,
        "An error occurred during logout",
      );
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    handleLogin,
    handleSignUp,
    handleLogout,
    isLoading,
    error,
    clearError,
  };
}
