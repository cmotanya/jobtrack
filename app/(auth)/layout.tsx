import * as React from "react";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-muted-foreground/20 flex min-h-screen items-center justify-center p-4">
      {children}
    </div>
  );
}
