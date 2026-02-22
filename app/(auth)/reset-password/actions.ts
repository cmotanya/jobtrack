"use server";

import { createClient } from "@/lib/supabase/server";
import { AuthResetPasswordProps } from "@/types/auth";

export async function resetPasswordAction(data: AuthResetPasswordProps) {
  const supabase = await createClient();

  const { error: authError } = await supabase.auth.updateUser({
    ...data,
  });

  if (authError) {
    return { success: false, error: authError };
  }

  await supabase.auth.signOut();

  return { success: true };
}
