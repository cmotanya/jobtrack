"use server";

import { createClient } from "@/lib/supabase/server";
import { AuthSignUpProps } from "@/types/auth";
import { cookies } from "next/headers";

export async function SignUpAction(authData: AuthSignUpProps) {
  const supabase = await createClient();

  const { data, error: authError } = await supabase.auth.signUp({
    ...authData,
    options: {
      data: { full_name: authData.fullName },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
    },
  });

  if (authError) {
    return { success: false, error: authError.message, data };
  }

  if (data.session) {
    const cookieStore = await cookies();
    cookieStore.set("supabase-auth-token", data.session.access_token);
    cookieStore.set("supabase-refresh-token", data.session.refresh_token);
  }

  // check if email confirmation is required
  if (data.user && !data.session) {
    return { success: true, needsConfirmation: true, user: data.user };
  }

  return {
    success: true,
    needsConfirmation: false,
    data,
    error: authError,
  };
}
