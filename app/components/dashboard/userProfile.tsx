import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/context/AuthContext";
import { useAuth } from "@/hook/useAuth";
import { cn } from "@/utils/cn";
import { ChevronDown, UserCircleIcon } from "lucide-react";
import Image from "next/image";

const UserProfile = () => {
  const { user } = useUser();
  const { handleLogout } = useAuth();

  const display_name =
    user?.user_metadata?.full_name ?? user?.email?.split("@")[0] ?? "Account";
  const email = user?.email ?? "No email available";

  return (
    <div className="bg-muted-foreground/5 border-muted-foreground/20 z-2000 mt-auto flex w-full flex-col rounded-t-xl border">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="group flex w-full items-center justify-between gap-4 p-4"
          >
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
                    {display_name}
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
                  "text-success group-data-[state=open]:text-destructive group-data group-data-[state=open]:animate size-5 transition-transform group-data-[state=open]:rotate-180",
                )}
              />
            }
          </Button>
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
                <p className="mt-1 font-medium">{display_name}</p>
                <p className="text-muted-foreground flex items-center gap-1 text-xs font-medium">
                  {email}
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
            <DropdownMenuItem
              onClick={async () => await handleLogout()}
              className="text-destructive hover:bg-destructive/10 flex cursor-pointer items-center gap-2"
            >
              Sign Out
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserProfile;
