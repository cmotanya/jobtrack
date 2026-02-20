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
  const getErrorMessage = (err: unknown, fallback: string): string => {
    if (err instanceof Error) return err.message;
    return fallback;
  };

  const handleLogin = async (authData: AuthSignInProps) => {
    setError(null);
    setIsLoading(true);

    try {
      const { data, error: authError } =
        await supabase.auth.signInWithPassword(authData);

      if (authError) throw authError;

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

  const handleSignUp = async (authData: AuthSignUpProps) => {
    setError(null);
    setIsLoading(true);

    try {
      const { data, error: authError } = await supabase.auth.signUp(authData);

      if (authError) throw authError;

      // check if email confirmation is required
      if (data.user && !data.session) {
        return { success: true, needsConfirmation: true, user: data.user };
      }

      // auto login successfully signed up user
      router.push("/dashboard");
      router.refresh();

      return {
        success: true,
        needsConfirmation: true,
        data,
      };
    } catch (err: unknown) {
      const errorMessage = getErrorMessage(
        err,
        "An error occurred during sign up",
      );
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setError(null);
    setIsLoading(true);

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
