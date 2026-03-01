import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserDisplay } from "@/helpers/useUserDisplay";
import { useAuth } from "@/hook/useAuth";
import { LogOut } from "lucide-react";
import Image from "next/image";

const UserProfile = () => {
  const { handleLogout } = useAuth();
  const { display_name, email } = useUserDisplay();

  

  return (
    <div className="bg-muted relative z-100 mt-auto flex w-full flex-col border">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center justify-between gap-1">
            <div className="flex gap-2 px-2 py-6">
              <div className="border-muted-foreground/30 bg-muted flex size-12 items-center justify-center rounded-xl border-2">
                <Image
                  src="/avatar1.svg"
                  alt="avatar"
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full"
                />
              </div>
              <div className="space-y-2 text-start">
                <div className="leading-none">
                  <p className="text-sm font-bold tracking-tight">
                    {display_name}
                  </p>
                  <p className="text-muted-foreground text-[10px]">{email}</p>
                </div>
                <p className="flex items-center gap-1 text-xs font-medium tracking-wider">
                  <span className="bg-success size-2 rounded-full" />
                  technician
                </p>
              </div>
            </div>

            <Button
              variant="ghost"
              onClick={handleLogout}
              className="mt-auto mb-1 transition-all duration-50 ease-in-out active:scale-105"
            >
              {" "}
              <LogOut className="text-destructive size-4" />
            </Button>
          </div>
        </DropdownMenuTrigger>
      </DropdownMenu>
    </div>
  );
};

export default UserProfile;
