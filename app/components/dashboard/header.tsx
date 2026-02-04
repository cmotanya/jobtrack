import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { SearchButton } from "./searchButton";

interface HeaderProps {
  setIsSidebarOpen: (open: boolean) => void;
}

export default function Header({ setIsSidebarOpen }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 flex w-full items-center justify-between border-b px-4 py-4 backdrop-blur-xl">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsSidebarOpen(true)}
        className="border-muted-foreground/30 border md:hidden"
      >
        <Menu className="size-5" />
        <span className="sr-only">Toggle Menu</span>
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
