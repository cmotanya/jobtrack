"use client";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { SideBarProps } from "@/types/dashboard";
import { SearchButton } from "@/components/dashboard/searchButton";

type HeaderProps = Pick<SideBarProps, "setSidebarOpen">;

export default function Header({ setSidebarOpen }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 flex w-full items-center justify-between border-b px-4 py-4 backdrop-blur-xl">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setSidebarOpen(true)}
        className="md:hidden"
      >
        <Menu className="size-5" />
      </Button>

      <div className="flex items-center">
        <div className="from-primary block bg-linear-to-r via-emerald-800 to-teal-800 bg-clip-text text-xl font-bold tracking-tight text-transparent">
          JobTrack
        </div>

        <SearchButton />
      </div>
    </header>
  );
}
