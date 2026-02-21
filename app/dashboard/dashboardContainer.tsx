"use client";

import { useState } from "react";
import SideBar from "../components/dashboard/sidebar";
import Header from "./header/page";

export default function DashboardContainer({
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
