import { AuthProvider } from "@/context/AuthContext";
import DashboardClient from "./dashboardClient";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <DashboardClient>{children}</DashboardClient>
    </AuthProvider>
  );
}
