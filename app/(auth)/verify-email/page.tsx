"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowBigRight,
  ArrowBigRightDash,
  CheckCircle,
  Mail,
  RefreshCw,
} from "lucide-react";
import { useRouter } from "next/navigation";

const VerifyEmailPage = () => {
  const router = useRouter();

  return (
    <section className="bg-background space-y-8 rounded-md pt-8">
      <div className="space-y-2 px-5 text-center">
        <h1 className="text-4xl font-bold">Verify Your Email</h1>
        <p className="text-muted-foreground text-sm font-medium">
          We&apos;ve sent a verification link to your email address. Please
          check your inbox and click the link to activate your account.
        </p>
      </div>

      <div className="px-5">
        <div className="bg-muted text-muted-foreground space-y-3 rounded-md p-4 text-xs font-medium">
          <div className="flex gap-3">
            <Mail className="text-success" />
            <p>Check your email inbox (including your spam folder).</p>
          </div>
          <div className="flex gap-3">
            <CheckCircle className="text-success size-5" />
            <p>Click the verification link.</p>
          </div>
          <div className="flex gap-3">
            <ArrowBigRightDash className="text-success" />
            <p>You&apos;ll be redirected to sign in automatically.</p>
          </div>
        </div>
      </div>

      <div className="space-y-4 px-5 pt-4">
        <Button className="w-full py-6.5 text-lg font-semibold transition-all duration-200 ease-in-out hover:scale-105 active:scale-95">
          {" "}
          <RefreshCw className="mr-2 size-5" />
          Resend Verification Email
        </Button>
        <Button
          variant="outline"
          onClick={() => router.push("/login")}
          className="text-muted-foreground active:text-muted-foreground w-full py-6.5 text-lg font-semibold transition-all duration-200 ease-in-out hover:scale-105 active:scale-95"
        >
          Sign In
          <ArrowBigRight className="mr-2 size-5" />
        </Button>
      </div>

      <div className="bg-muted mt-20 flex items-center justify-center rounded-b-md border-t text-xs">
        <p className="text-muted-foreground font-medium">Having trouble? </p>
        <Button
          variant="link"
          onClick={() => router.push("/support")}
          className="text-xs font-semibold"
        >
          Contact Support
        </Button>
      </div>
    </section>
  );
};

export default VerifyEmailPage;
