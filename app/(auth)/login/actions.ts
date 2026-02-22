"use server";

import { createClient } from "@/lib/supabase/server";
import { AuthSignInProps } from "@/types/auth";
import { cookies } from "next/headers";

export async function loginAction(authData: AuthSignInProps) {
  const supabase = await createClient();

  const { data, error: authError } =
    await supabase.auth.signInWithPassword(authData);

  if (authError) {
    return { success: false, error: authError.message, data };
  }

  if (data.session) {
    const cookieStore = await cookies();
    cookieStore.set("supabase-auth-token", data.session.access_token);
    cookieStore.set("supabase-refresh-token", data.session.refresh_token);
  }

  //   redirect("/dashboard");
  return { success: true, data };
}
