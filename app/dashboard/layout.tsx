"use client";

import { dashboardNav } from "@/data/dashboard-nav";
import { cn } from "@/utils/cn";
import { ClipboardEdit, Plus, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Header from "../components/dashboard/header";
import UserProfile from "../components/dashboard/userProfile";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setIsSidebarOpen] = useState(false);

  {
  }

  return (
    <div className="min-h-screen">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-50 backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={cn(
          "bg-muted border-muted-foreground/30 fixed inset-y-0 left-0 z-100 flex w-80 flex-col border-r shadow-xl transition-transform duration-300 ease-in-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="bg-foreground flex items-center justify-between px-4 py-6">
          <div className="text-muted flex flex-col">
            <h1 className="text-xl font-bold tracking-tight">JobTrack</h1>
            <h3 className="text-xs tracking-widest">Project Manager</h3>
          </div>
          <button
            onClick={() => {
              setIsSidebarOpen(false);
            }}
            className="bg-destructive cursor-pointer rounded-full p-1 transition-all hover:scale-105 active:scale-95"
          >
            <X
              className="text-background transition-transform group-hover:rotate-180"
              size={26}
            />
          </button>
        </div>

        {/* NAV */}
        <nav className="mt-10 flex flex-col gap-2 px-4">
          <p className="text-muted-foreground text-xs font-bold tracking-widest uppercase">
            Menu
          </p>
          {dashboardNav.map((item, index) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
                className={cn(
                  "block rounded-xl px-4 py-3 font-medium",
                  isActive
                    ? "text-muted from-primary scale-105 bg-linear-to-r via-emerald-800 to-teal-800 shadow-lg shadow-slate-900/30"
                    : "hover:bg-muted-foreground/15 border-muted-foreground/20 hover:border hover:shadow-md",
                  item.disabled
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer",
                )}
              >
                {isActive && (
                  <div className="absolute top-1/2 left-0 h-8 w-1 -translate-y-1/2 rounded-r-full bg-amber-400" />
                )}
                {item.icon}
                <span className="ml-2">{item.title}</span>
              </Link>
            );
          })}
        </nav>

        {/* QUICK ACTIONS */}
        <div className="mt-10 flex flex-col gap-2 border-t px-4 pt-4">
          <p className="text-muted-foreground text-xs font-bold tracking-widest uppercase">
            Quick Actions
          </p>

          <div className="flex flex-col justify-center gap-3 sm:flex-row md:gap-6">
            <Link
              href="/dashboard"
              className="bg-primary text-primary-foreground flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-lg font-semibold transition-all hover:scale-105 active:scale-95"
            >
              <Plus size={20} />
              Create New Task{" "}
            </Link>
            <Link
              href="/dashboard/reports"
              className="bg-muted-foreground/10 border-muted-foreground/15 text-muted-foreground flex items-center justify-center gap-2 rounded-xl border px-8 py-4 text-lg font-semibold shadow-md transition-all hover:scale-105 active:scale-95"
            >
              <ClipboardEdit size={20} />
              View Report
            </Link>
          </div>
        </div>

        {/* PROFILE */}
        <UserProfile />
      </aside>

      <Header setIsSidebarOpen={setIsSidebarOpen} />
      <main>{children}</main>
    </div>
  );
}
