"use client";

import { dashboardNav } from "@/data/Dashboard/dashboard-nav";
import {
  ArrowBigRight,
  ArrowRight,
  ClipboardEdit,
  Plus,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SideBarProps } from "@/types/dashboard";
import UserProfile from "@/app/dashboard/header/userProfile";
import { cn } from "@/lib/utils";

const SideBar = ({ sidebarOpen, setSidebarOpen }: SideBarProps) => {
  const pathname = usePathname();

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
    <section>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-50 backdrop-blur lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={cn(
          "bg-background border-muted-foreground/30 lg:transition-0 fixed inset-y-0 left-0 z-50 flex w-68 flex-col border-r shadow-xl transition-transform duration-300 ease-in-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="bg-muted relative flex items-center justify-between border-b px-5 py-6">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold tracking-tight">JobTrack</h1>
            <h3 className="text-muted-foreground text-[10px] font-medium tracking-widest uppercase">
              Console
            </h3>
          </div>
          <button
            onClick={() => {
              setSidebarOpen(false);
            }}
            className="bg-destructive cursor-pointer rounded-full p-1 transition-all hover:scale-105 active:scale-95"
          >
            <X
              className="text-background transition-transform group-hover:rotate-180"
              size={20}
            />
          </button>
        </div>

        {/* navigation menu */}
        <nav className="mt-10 flex flex-col gap-2 overflow-y-auto px-5 py-6">
          <div className="space-y-1">
            <p className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
              Navigation
            </p>
            {dashboardNav.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "group relative flex items-center gap-3 overflow-hidden rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150",
                    isActive
                      ? "bg-muted border"
                      : "text-muted-foreground hover:bg-muted/50 hover:border",
                    item.disabled && "pointer-events-none opacity-30",
                  )}
                >
                  <div className="flex items-center gap-4">
                    <item.icon
                      className={cn(
                        "text-primary group-hover:primary/80 size-5 shrink-0",
                        isActive ? "text-primary/80" : "text-muted-foreground",
                      )}
                    />
                    <span
                      className={cn(
                        isActive ? "text-muted-foreground font-bold" : "",
                      )}
                    >
                      {item.title}
                    </span>
                  </div>
                  {isActive && (
                    <ArrowRight className="text-muted-foreground ml-auto size-3" />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* quick actions */}
        <div className="space-y-2 overflow-hidden border-t px-5 py-6">
          <p className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
            Quick Actions
          </p>

          <div className="flex flex-col gap-2">
            <Button className="group bg-primary flex items-center justify-center gap-3 rounded-xl px-4 py-6 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-600">
              <Plus
                size={16}
                className="transition-transform group-hover:rotate-90"
              />
              Create Job
            </Button>
            <Button
              variant="outline"
              className="text-muted-foreground flex items-center justify-center gap-2 rounded-xl px-4 py-6 font-semibold uppercase transition-all hover:scale-105 active:scale-95"
            >
              <ClipboardEdit size={20} />
              View Report
            </Button>
          </div>
        </div>

        {/* user profile */}
        <UserProfile />
      </aside>
    </section>
  );
};

export default SideBar;
