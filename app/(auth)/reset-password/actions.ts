"use server";

import { createClient } from "@/lib/supabase/server";
import { AuthResetPasswordProps } from "@/types/auth";

export async function resetPasswordAction(data: AuthResetPasswordProps) {
  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser(
    {
      ...data,
    },
    {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/login`,
    },
  );

  if (error) {
    return { success: false, error: error.message };
  }

  await supabase.auth.signOut();

  return { success: true };
}
