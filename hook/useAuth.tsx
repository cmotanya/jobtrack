import { logoutAction } from "@/app/(auth)/logout/actions";
import toast from "react-hot-toast";

export function useAuth() {
  const handleLogout = async () => {
    const result = await logoutAction();

    if (result.error) {
      return { success: false, error: result.error };
    }

    toast.success("Logout successful!");

    return { success: true };
  };

  return {
    handleLogout,
  };
}
