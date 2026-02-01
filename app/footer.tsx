import { Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="flex h-16 w-full items-center justify-center border-t px-6">
      <div className="text-muted-foreground text-center text-sm">
        <div className="flex items-center gap-1">
          &copy; {new Date().getFullYear()} JobTrack by{" "}
          <span className="font-bold">Cornelius Motanya</span>{" "}
          <Heart size={20} color="red" fill="red" className="animate-pulse" />
        </div>
        All rights reserved.
      </div>
    </footer>
  );
};
