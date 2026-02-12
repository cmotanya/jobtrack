"use client";

import { dashboardNav } from "@/data/Dashboard/dashboard-nav";
import { cn } from "@/utils/cn";
import { ArrowBigRight, ClipboardEdit, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Header from "../components/dashboard/header";
import UserProfile from "../components/dashboard/userProfile";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-50 backdrop-blur"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={cn(
          "bg-muted border-muted-foreground/30 fixed inset-y-0 left-0 z-100 flex flex-col border-r shadow-xl transition-transform duration-300 ease-in-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="bg-primary flex items-center justify-between px-4 py-6">
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
                    ? "bg-muted-foreground/15 border-muted-foreground/20 scale-105 border shadow-md"
                    : "border-muted-foreground/20 hover:border",
                  item.disabled
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer",
                )}
              >
                {isActive && (
                  <div className="bg-success absolute top-1/2 left-0 h-8 w-1 -translate-y-1/2 rounded-r-full" />
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

          <div className="flex flex-col gap-3 md:gap-6">
            <Button
              onClick={() => setIsSidebarOpen(false)}
              className="bg-primary text-primary-foreground flex items-center justify-center gap-2 py-6.5 font-semibold uppercase transition-all hover:scale-105 active:scale-95"
            >
              Create Job <ArrowBigRight />
            </Button>
            <Button
              variant="outline"
              className="text-muted-foreground flex items-center justify-center gap-2 border py-6.5 font-semibold uppercase shadow-md transition-all hover:scale-105 active:scale-95"
            >
              <ClipboardEdit size={20} />
              View Report
            </Button>
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
