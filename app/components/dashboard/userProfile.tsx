import { cn } from "@/utils/cn";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { ChevronDown, UserCircleIcon, LogOut } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const UserProfile = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-muted-foreground/5 border-muted-foreground/20 mt-auto flex w-full flex-col rounded-t-xl border">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <button className="flex w-full items-center justify-between gap-4 p-4">
            <div className="flex items-center gap-3">
              <div className="border-muted-foreground/30 bg-muted flex size-12 items-center justify-center rounded-xl border-2">
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
              </div>
            </div>

            {
              <ChevronDown
                className={cn(
                  "text-success size-5 transition-transform",
                  isOpen &&
                    "text-destructive rotate-180 animate-bounce rounded-sm transition-transform",
                )}
              />
            }
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="border-muted-foreground/50 bg-muted flex w-full flex-col rounded-xl border text-sm font-medium shadow-md"
        >
          <DropdownMenuLabel className="px-3 py-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="bg-muted-foreground/10 border-muted-foreground/30 flex size-10 items-center justify-center overflow-hidden rounded-full border-2">
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
  );
};

export default UserProfile;
