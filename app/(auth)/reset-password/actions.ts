"use server";

import { createClient } from "@/lib/supabase/server";
import { AuthResetPasswordProps } from "@/types/auth";
import { revalidatePath } from "next/cache";

export async function resetPasswordAction(data: AuthResetPasswordProps) {
  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    ...data,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  await supabase.auth.signOut();

  revalidatePath("/login", "layout");

  return { success: true };
}
