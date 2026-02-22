"use server";

import { createClient } from "@/lib/supabase/server";
import { AuthSignUpProps } from "@/types/auth";

export async function SignUpAction(authData: AuthSignUpProps) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    ...authData,
    options: {
      data: { full_name: authData.fullName },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
    },
  });

  if (error) {
    return { success: false, error: error.message, data };
  }

  // check if email confirmation is required
  if (data.user && !data.session) {
    return { success: true, needsConfirmation: true, user: data.user };
  }

  return {
    success: true,
    needsConfirmation: false,
    data,
    error: error,
  };
}
