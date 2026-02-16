import { Button } from "@/components/ui/button";
import { LayoutDashboard } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="sticky top-0 z-100 flex h-16 w-full items-center justify-between px-6 shadow-md backdrop-blur-xl">
      <div className="flex items-center gap-2">
        <div className="text-primary-foreground bg-primary rounded-lg p-1">
          <LayoutDashboard size={20} />
        </div>
        <span className="text-xl font-semibold tracking-tight">JobTrack</span>
      </div>

      <nav>
        <Link href="/dashboard">
          <Button variant="ghost">Log In</Button>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
