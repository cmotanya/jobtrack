import { AuthProvider } from "@/context/AuthContext";
import DashboardContainer from "./dashboardContainer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <DashboardContainer>{children}</DashboardContainer>;
    </AuthProvider>
  );
}
