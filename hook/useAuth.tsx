import { createClient } from "@/lib/supabase/client";
import { AuthSignInProps, AuthSignUpProps } from "@/types/auth";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export function useAuth() {
  const supabase = useMemo(() => createClient(), []);
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const getErrorMessage = (err: unknown, fallback: string): string => {
    if (err instanceof Error) return err.message;
    return fallback;
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
      const errorMessage = getErrorMessage(
        err,
        "An error occurred during login",
      );

      throw new Error(errorMessage);
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
      const errorMessage = getErrorMessage(
        err,
        "An error occurred during sign up",
      );

      throw new Error(errorMessage);
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
      const errorMessage = getErrorMessage(
        err,
        "An error occurred during logout",
      );
      throw new Error(errorMessage);
    }
  };

  return {
    user,
    handleLogin,
    handleSignUp,
    handleLogout,
  };
}
