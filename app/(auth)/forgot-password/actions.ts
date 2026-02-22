"use server";

import { createClient } from "@/lib/supabase/server";
import { AuthForgotPasswordProps } from "@/types/auth";

export async function forgotPasswordAction({ email }: AuthForgotPasswordProps) {
  const supabase = await createClient();

  const { error: authError } = await supabase.auth.resetPasswordForEmail(
    email,
    {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/login`,
    },
  );

  if (authError) throw authError;

  return {
    success: true,
    message: "Password reset link sent to your email.",
    error: authError || null,
  };
}
