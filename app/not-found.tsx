"use client";

import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Fade } from "react-awesome-reveal";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <section className="bg-accent/10 relative flex min-h-dvh flex-col items-center justify-center pt-12 text-center">
      <div className="text-accent/30 absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[11rem] font-bold md:text-[15rem]">
        404
      </div>

      <div>
        <Fade direction="down" duration={200}>
          <Image
            src="/not-found.svg"
            alt="not-found illustration image showing a person looking for a page that doesn't exist"
            width={500}
            height={500}
            className="mb-4 h-full w-full object-contain"
          />
        </Fade>
        <div className="flex w-full flex-col items-center gap-4 lg:max-w-4xl">
          <Fade
            direction="up"
            duration={200}
            delay={300}
            triggerOnce
            cascade
            damping={0.1}
          >
            <h1 className="text-muted-foreground text-4xl font-bold lg:text-5xl">
              Page Unavailable!
            </h1>
            <p className="text-muted-foreground mx-auto max-w-xl text-balance lg:text-xl">
              {" "}
              The page you&apos;re looking for does not exist.
            </p>
          </Fade>

          <div className="flex flex-col justify-center gap-4 sm:flex-row md:gap-6">
            <Fade direction="up" duration={200} delay={600} triggerOnce>
              <Button
                onClick={() => router.back()}
                className="group bg-primary text-primary-foreground flex items-center justify-center gap-2 rounded-xl p-7 text-lg font-semibold transition-all hover:scale-105 active:scale-95"
              >
                <ArrowLeft
                  size={20}
                  className="transition-transform group-hover:translate-x-1 group-active:translate-x-1"
                />
                Back to Previous Page
              </Button>
              <Button
                onClick={() => router.push("/dashboard")}
                variant="outline"
                className="text-muted-foreground hover:bg-muted flex items-center justify-center gap-2 rounded-xl border p-7 text-lg font-semibold transition-all hover:scale-105 active:scale-95"
              >
                Return to Dashboard{" "}
                <ArrowUpRight
                  size={20}
                  className="transition-transform group-hover:translate-x-1 group-active:translate-x-1"
                />
              </Button>
            </Fade>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
