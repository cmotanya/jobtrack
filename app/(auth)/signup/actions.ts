"use server";

import { createClient } from "@/lib/supabase/server";
import { AuthSignUpProps } from "@/types/auth";

export async function SignUpAction(authData: AuthSignUpProps) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email: authData.email,
    password: authData.password,
    options: {
      data: { full_name: authData.full_name },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  });

  if (error) {
    return { success: false, error: error.message };
  }

  // check if email confirmation is required
  if (data.user && !data.session) {
    return { success: true, needsConfirmation: true };
  }

  return {
    success: true,
    needsConfirmation: false,
  };
}
