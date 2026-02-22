import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

export function useAuth() {
  const supabase = useMemo(() => createClient(), []);
  const router = useRouter();

  const handleLogout = async () => {
    const { error: authError } = await supabase.auth.signOut();

    if (authError) {
      return { success: false, error: authError };
    }

    router.push("/login");
    router.refresh();

    return { success: true };
  };

  return {
    handleLogout,
  };
}
