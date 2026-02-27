import { forgotPasswordAction } from "@/app/(auth)/forgot-password/actions";
import { loginAction } from "@/app/(auth)/login/actions";
import { logoutAction } from "@/app/(auth)/logout/actions";
import { resetPasswordAction } from "@/app/(auth)/reset-password/actions";
import { SignUpAction } from "@/app/(auth)/signup/actions";
import { verifyOTPAction } from "@/app/(auth)/verify-otp/actions";
import { VerifyOTPFormData } from "@/helpers/zodSchema";
import {
  AuthForgotPasswordProps,
  AuthOptionPasswordReset,
  AuthOptionSignIn,
  AuthOptionSignUp,
  AuthResetPasswordProps,
  AuthSignInProps,
  AuthSignUpProps,
} from "@/types/auth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useAuth() {
  const router = useRouter();

  // sign up user
  const handleSignUp = async (
    data: AuthSignUpProps,
    { reset }: AuthOptionSignUp,
  ) => {
    const result = await SignUpAction(data);

    if (result.error) {
      toast.error(result?.error || "An error occurred during sign up");
      reset({ ...data, password: "", confirmPassword: "" });
      return;
    }

    if (result.success) {
      toast.success("Account created successfully!");
      reset();
    }
  };

  const handleLogin = async (
    data: AuthSignInProps,
    { reset }: AuthOptionSignIn,
  ) => {
    const result = await loginAction(data);

    if (result?.success) {
      toast.success("Login successful!");
      reset();
      router.push("/dashboard");
    } else {
      toast.error(result?.error || "Login failed");
      reset({ ...data, password: "" });
    }
  };

  // logout user
  const handleLogout = async () => {
    const result = await logoutAction();

    if (result.error) {
      return { success: false, error: result.error };
    }

    toast.success("Logout successful!");

    router.push("/login");
    return { success: true };
  };

  // forgot password
  const handleForgotPassword = async (data: AuthForgotPasswordProps) => {
    const result = await forgotPasswordAction({ email: data.email });

    if (!result.success) {
      toast.error(result.error || "Failed to send reset code.");
      return;
    }

    sessionStorage.setItem("reset-email", data.email!);
    toast.success("Please check your email for reset code.");

    router.push("/verify-otp");
  };

  // verify otp
  const handleVerifyOTP = async (data: VerifyOTPFormData) => {
    const email = sessionStorage.getItem("reset-email");

    if (!email) {
      toast.error("Session expired. Please request a new code.");
      router.push("/forgot-password");
      return;
    }

    const result = await verifyOTPAction({ email: email!, otp: data.otp });

    if (!result.success) {
      toast.error(result.error || "Failed to verify OTP.");
      return;
    }

    sessionStorage.removeItem("reset-email");
    router.push("/reset-password");
  };

  // reset password
  const handleResetPassword = async (
    data: AuthResetPasswordProps,
    { reset, setIsSuccess }: AuthOptionPasswordReset,
  ) => {
    const result = await resetPasswordAction({ ...data });

    const sessionError =
      result.error?.includes("session") || result.error?.includes("expired");

    if (sessionError) {
      toast.error("Session expired. Please request a new code.");
      reset?.();
      router.push("/forgot-password");
      return;
    }

    if (result && !result.success) {
      toast.error(result.error || "Invalid reset code.");
      return;
    }

    setIsSuccess(true);
    toast.success("Password reset successfully!");
    reset();
    router.push("/login?reset=true");
  };

  return {
    handleSignUp,
    handleLogin,
    handleLogout,
    handleForgotPassword,
    handleVerifyOTP,
    handleResetPassword,
  };
}
