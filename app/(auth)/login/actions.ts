"use server";

import { createClient } from "@/lib/supabase/server";
import { AuthSignInProps } from "@/types/auth";

export async function loginAction(authData: AuthSignInProps) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword(authData);

  if (error) {
    return { success: false, error: error.message, data };
  }

  return { success: true, data };
}
