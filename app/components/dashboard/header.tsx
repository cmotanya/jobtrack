import { Button } from "@/components/ui/button";
import { Menu, Search } from "lucide-react";

interface HeaderProps {
  setIsSideBarOpen: (open: boolean) => void;
}

export default function Header({ setIsSideBarOpen }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 flex w-full items-center justify-between border-b px-6 py-4 backdrop-blur-xl">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsSideBarOpen(true)}
        className="border-muted-foreground/30 border md:hidden"
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle Menu</span>
      </Button>

      <div className="flex items-center gap-2">
        <div className="from-primary ml-4 block bg-linear-to-r via-emerald-800 to-teal-800 bg-clip-text text-xl font-bold tracking-tight text-transparent">
          JobTrack
        </div>
        <Button className="bg-muted-foreground/20 border-muted-foreground/30 hover:bg-muted-foreground/30 flex size-8 items-center justify-center rounded-lg border hover:scale-105 active:scale-95">
          <Search className="text-primary size-6" />
        </Button>
      </div>
    </header>
  );
}
