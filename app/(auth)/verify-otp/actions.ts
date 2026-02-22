"use server";

import { createClient } from "@/lib/supabase/server";
import { AuthVerifyOTPProps } from "@/types/auth";

export async function verifyOTPAction({ email, otp }: AuthVerifyOTPProps) {
  const supabase = await createClient();

  const { error } = await supabase.auth.verifyOtp({
    email,
    token: otp,
    type: "recovery",
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, message: "OTP verified successfully", error: error };
}
