import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DialogTitle } from "@radix-ui/react-dialog";
import {
  Search,
  X,
  FileText,
  Users,
  TrendingUp,
  Clock,
  Briefcase,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Fade } from "react-awesome-reveal";

export const SearchButton = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const hasData = false;

  // Keyboard shortcut (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Auto-clear search when dialog closes
  useEffect(() => {
    const clearSearchQuery = () => setSearchQuery("");

    if (!searchOpen) {
      clearSearchQuery();
    }
  }, [searchOpen]);

  return (
    <div>
      <Button
        onClick={() => setSearchOpen(true)}
        className="group relative bg-transparent transition-all hover:scale-105 hover:bg-transparent active:scale-95"
        title="Search (⌘K)"
      >
        <Search className="text-muted-foreground group-hover:text-foreground size-6 transition-colors" />
        <span className="text-muted-foreground absolute top-1/2 -right-8 hidden -translate-y-1/2 text-xs lg:block">
          ⌘K
        </span>
      </Button>

      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="w-full max-w-3xl overflow-hidden rounded-none p-0">
          <DialogHeader className="border-border border-b">
            <DialogTitle className="sr-only">
              Search tasks, clients and payments
            </DialogTitle>

            <div className="mt-12 flex items-center gap-2 px-2 py-4">
              <Fade direction="down" duration={200} delay={0} triggerOnce>
                <Search className="text-muted-foreground group-hover:text-foreground size-6 transition-all" />
              </Fade>
              <Input
                placeholder="Search tasks, clients, or payments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="flex items-center border-0 px-2 py-5 text-sm shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              {searchQuery.length > 0 && (
                <Fade direction="right" duration={200} triggerOnce>
                  <Button
                    variant="ghost"
                    onClick={() => setSearchQuery("")}
                    title="Clear search"
                    className="bg-destructive/10 text-destructive rounded-xl px-3 text-xs transition-all hover:scale-105 active:scale-95"
                  >
                    Clear
                  </Button>
                </Fade>
              )}
            </div>
          </DialogHeader>

          {/* Search Results */}
          <div className="my-18 flex min-h-max flex-col">
            {!hasData && searchQuery.length === 0 ? (
              <div className="flex flex-col items-center justify-center space-y-10 text-center">
                <div className="bg-primary/10 flex size-20 items-center justify-center rounded-full">
                  <Search className="text-primary size-10" />
                </div>
                <div>
                  <p className="text-muted-foreground text-lg font-semibold">
                    Search Your Workspace
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Once you add data, your search results will appear here.
                  </p>
                </div>

                <div className="space-y-2">
                  <h2 className="text-muted-foreground text-sm font-bold tracking-wider uppercase">
                    Get Started
                  </h2>

                  <div className="flex w-full flex-col gap-2 space-y-2">
                    <Button
                      variant="secondary"
                      onClick={() => setSearchOpen(false)}
                      className="flex items-center border px-2 py-8 transition-all hover:scale-105 active:scale-95"
                    >
                      📝
                      <div className="flex-1 text-left">
                        <p className="font-semibold">Create a task</p>
                        <p className="text-muted-foreground text-xs">
                          Add a task to get started.
                        </p>
                      </div>
                    </Button>

                    <Button
                      variant="ghost"
                      onClick={() => setSearchOpen(false)}
                      className="flex items-center border px-2 py-8 transition-all hover:scale-105 hover:bg-transparent active:scale-95 active:bg-transparent"
                    >
                      <div className="flex items-center gap-3">
                        👥
                        <div className="flex-1 text-left">
                          <p className="font-semibold">Add A Client</p>
                          <p className="text-muted-foreground text-xs">
                            Manage your clients
                          </p>
                        </div>
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-14">
                <div className="space-y-2">
                  <p className="text-muted-foreground text-lg font-semibold uppercase">
                    Recent
                  </p>

                  <div className="flex items-center gap-2">
                    📋
                    <p className="text-muted-foreground text-sm">
                      Your recent searches will appear here...
                    </p>
                  </div>
                </div>

                <div className="bg-muted h-0.5 w-full"></div>

                <div className="text-muted-foreground space-y-2 font-bold">
                  <h2>Quick Actions</h2>

                  <div className="flex w-full flex-col gap-2 space-y-2">
                    <Button
                      variant="secondary"
                      onClick={() => setSearchOpen(false)}
                      className="flex items-center gap-3 border px-2 py-8 transition-all hover:scale-105 hover:bg-transparent active:scale-95 active:bg-transparent"
                    >
                      📊
                      <div className="flex-1 text-left">
                        <p className="font-semibold">View Dashboard</p>
                        <p className="text-muted-foreground text-xs">
                          Overview & Reports
                        </p>
                      </div>
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => setSearchOpen(false)}
                      className="flex items-center gap-3 border px-2 py-8 transition-all hover:scale-105 hover:bg-transparent active:scale-95 active:bg-transparent"
                    >
                      👀
                      <div className="flex-1 text-left">
                        <p className="font-semibold">All Jobs</p>
                        <p className="text-muted-foreground text-xs">
                          View all jobs
                        </p>
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
