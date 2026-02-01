"use client";

import { dashboardNav } from "@/data/dashboard-nav";
import { cn } from "@/utils/cn";
import {
  ChevronDown,
  ClipboardEdit,
  LogOut,
  Plus,
  UserCircleIcon,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import {
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Header from "../components/dashboard/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sideBarOpen, setIsSideBarOpen] = useState(false);

  {
  }

  return (
    <div className="min-h-screen">
      {sideBarOpen && (
        <div
          className="bg-background/50 fixed inset-0 z-50 backdrop-blur-sm"
          onClick={() => setIsSideBarOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 z-100 flex w-72 flex-col overflow-hidden border-r",
          sideBarOpen ? "translate-x-0" : "-translate-x-full",
          "bg-muted-foreground/10 backdrop-blur-lg transition-all duration-300 ease-in-out",
          "md:w-72",
        )}
      >
        <div className="bg-foreground flex items-center justify-between px-4 py-6">
          <div className="text-muted flex flex-col">
            <h1 className="text-xl font-bold tracking-tight">JobTrack</h1>
            <h3 className="text-xs tracking-widest">Project Manager</h3>
          </div>
          <button
            onClick={() => {
              setIsSideBarOpen(false);
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
                onClick={() => setIsSideBarOpen(false)}
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
                className={cn(
                  "animate-in fade-in slide-in-from-left block rounded-xl px-4 py-3 font-medium transition-all",
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

          <div className="animate-in slide-in-from-right-35 fade-in flex flex-col justify-center gap-2 transition-all duration-300 sm:flex-row md:gap-6">
            <Link
              href="/dashboard"
              className="group bg-primary text-primary-foreground flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-lg font-semibold hover:scale-105 active:scale-95"
            >
              <Plus
                size={20}
                className="transition-transform group-hover:translate-x-1"
              />
              Create New Task{" "}
            </Link>
            <Link
              href="/dashboard/reports"
              className="bg-muted flex items-center justify-center gap-2 rounded-xl border px-8 py-4 text-lg font-semibold shadow-sm transition-all hover:scale-105 active:scale-95"
            >
              <ClipboardEdit size={20} />
              View Report
            </Link>
          </div>
        </div>

        {/* PROFILE */}
        <div className="mt-auto mr-1 border-t">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex w-full items-center justify-between p-4">
                <div className="border-muted-foreground/40 bg-muted-foreground/10 flex size-12 items-center justify-center rounded-xl border">
                  <Image
                    src="/avatar1.svg"
                    alt="avatar"
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex flex-col text-start">
                    <p className="text-sm font-medium tracking-tight">
                      Cornelius Motanya
                    </p>
                    <p className="text-muted-foreground flex items-center gap-1 text-xs font-semibold">
                      <span className="bg-success inline-block h-2 w-2 rounded-full" />
                      Admin
                    </p>
                  </div>
                  <ChevronDown className="text-muted-foreground size-4" />
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              sideOffset={5}
              align="end"
              className="border-muted-foreground/50 bg-muted flex w-full flex-col rounded-xl border text-sm font-medium shadow-md"
            >
              <DropdownMenuLabel className="px-3 py-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="bg-muted-foreground/15 border-muted-foreground/30 flex size-10 items-center justify-center rounded-full border">
                    <Image
                      src="/avatar1.svg"
                      alt="avatar"
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full"
                    />
                  </div>
                  <div>
                    <p className="mt-1 font-medium">Cornelius Motanya</p>
                    <p className="text-muted-foreground flex items-center gap-1 text-xs font-medium">
                      corneliusmot@yahoo.com
                    </p>
                  </div>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator className="bg-slate-200" />

              <div className="flex justify-between gap-6 p-3 text-xs font-semibold">
                <DropdownMenuItem className="flex cursor-pointer items-center gap-1">
                  <div className="bg-muted-foreground/10 flex size-8 items-center justify-center rounded-lg p-1.5">
                    <UserCircleIcon className="text-success" />
                  </div>
                  <span className="">Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-destructive/10 flex cursor-pointer items-center gap-1 transition-colors">
                  <div className="bg-destructive/10 flex size-8 items-center justify-center rounded-lg p-1.5">
                    <LogOut className="text-destructive size-4" />
                  </div>
                  <span className="text-destructive">Sign Out</span>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      <Header setIsSideBarOpen={setIsSideBarOpen} />
      <main>{children}</main>
    </div>
  );
}
