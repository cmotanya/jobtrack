"use client";

import { useState } from "react";
import Header from "./header/page";
import SideBar from "./header/sidebar";

export default function DashboardClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Header setSidebarOpen={setSidebarOpen} />
      <main>{children}</main>
    </div>
  );
}
