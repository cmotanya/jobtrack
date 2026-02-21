import { createClient } from "@/lib/supabase/client";
import { AuthSignInProps, AuthSignUpProps } from "@/types/auth";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export function useAuth() {
  const supabase = useMemo(() => createClient(), []);
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const throwError = (err: unknown, fallback: string): string => {
    if (err instanceof Error) throw err.message;
    throw new Error(fallback);
  };

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const handleLogin = async (authData: AuthSignInProps) => {
    try {
      const { data, error: authError } =
        await supabase.auth.signInWithPassword(authData);

      if (authError) throw authError;

      router.push("/dashboard");
      router.refresh();

      return { success: true, data };
    } catch (err: unknown) {
      throwError(err, "An error occurred during login");
    }
  };

  const handleSignUp = async (authData: AuthSignUpProps) => {
    try {
      const { data, error: authError } = await supabase.auth.signUp({
        ...authData,
        options: { data: { full_name: authData.fullName } },
      });

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
        needsConfirmation: false,
        data,
      };
    } catch (err: unknown) {
      throwError(err, "An error occurred during sign up");
    }
  };

  const handleResetPassword = async (email: string) => {
    try {
      const { error: authError } = await supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo: `${window.location.origin}/reset-password`,
        },
      );

      if (authError) throw authError;

      return { success: true };
    } catch (err: unknown) {
      throwError(err, "An error occurred during password reset");
    }
  };

  const handleUpdatePassword = async (newPassword: string) => {
    try {
      const { error: authError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (authError) throw authError;

      router.push("/login");
      router.refresh();

      return { success: true };
    } catch (err: unknown) {
      throwError(err, "An error occurred during password update");
    }
  };

  const handleLogout = async () => {
    try {
      const { error: authError } = await supabase.auth.signOut();

      if (authError) throw authError;

      router.push("/login");
      router.refresh();

      return { success: true };
    } catch (err: unknown) {
      throwError(err, "An error occurred during logout");
    }
  };

  return {
    user,
    handleLogin,
    handleSignUp,
    handleResetPassword,
    handleUpdatePassword,
    handleLogout,
  };
}
