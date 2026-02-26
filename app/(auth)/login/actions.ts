"use server";

import { createClient } from "@/lib/supabase/server";
import { AuthSignInProps } from "@/types/auth";
import { revalidatePath } from "next/cache";

export async function loginAction(authData: AuthSignInProps) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword(authData);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/dashboard", "layout");

  return { success: true };
}
