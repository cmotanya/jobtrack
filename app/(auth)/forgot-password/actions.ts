"use server";

import { createClient } from "@/lib/supabase/server";
import { AuthForgotPasswordProps } from "@/types/auth";

export async function forgotPasswordAction({ email }: AuthForgotPasswordProps) {
  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) {
    return { success: false, error: error.message };
  }

  return {
    success: true,
    message: "Password reset link sent to your email.",
    error: error || null,
  };
}
