import CreateJobDialog from "../components/dashboard/createJobDialog";
import { dashboardNav } from "../../data/Dashboard/dashboard-nav";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

export default function DashboardPage() {
  return (
    <section className="min-h-screen" id="dashboard">
      <div className="space-y-5 px-2 py-6">
        <div className="space-y-0.5">
          <h1 className="text-4xl font-bold">
            Welcome back,{" "}
            <span className="from-primary block bg-linear-to-r via-emerald-800 to-teal-800 bg-clip-text text-transparent">
              Cornelius
            </span>
          </h1>
          <p className="text-muted-foreground text-sm">
            Here is what is happening on your dashboard today.
          </p>
        </div>

        <div className="flex flex-col justify-center gap-3 px-5">
          <CreateJobDialog />

          <Button
            variant="outline"
            className="bg-muted border-muted-foreground/30 flex w-full items-center justify-center gap-2 rounded-xl border py-7.5 text-lg font-semibold transition-all hover:scale-105 active:scale-95"
          >
            See How It Works <Info size={20} />
          </Button>
        </div>
      </div>
    </section>
  );
}
