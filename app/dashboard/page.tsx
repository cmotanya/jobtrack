import CreateJobDialog from "../components/dashboard/createJobDialog";

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

        <CreateJobDialog />
      </div>
    </section>
  );
}
