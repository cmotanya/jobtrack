import { useUser } from "@/context/AuthContext";

export function useUserDisplay() {
  const { user } = useUser();

  const full_name = user?.user_metadata?.full_name as string | undefined;
  const email = (user?.email as string | undefined) ?? "";

  const display_name = full_name ?? email?.split("@")[0];

  const first_name = full_name?.split(" ")[0] ?? display_name;

  return { display_name, first_name, email };
}
