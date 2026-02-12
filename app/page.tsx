import Link from "next/link";
import { Footer } from "./footer";
import Header from "./header/page";
import { ArrowBigRight, Shield, Sparkle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { featureCards } from "@/data/feature-card";
import { Badge } from "@/components/ui/badge";
import { trustIndicators } from "@/data/trust-indicators";
import { workFlowSteps } from "@/data/workFlow";
import { businessGoals } from "@/data/businessGoals";
import { Fade } from "react-awesome-reveal";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* HERO SECTION */}
      <section className="relative container mx-auto space-y-12 py-12 md:py-18">
        {/* Pattern Overlay */}
        <div
          className="absolute inset-0 -z-20 overflow-hidden"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(16, 185, 129, 0.1) 1.5px, transparent 1px)",
            backgroundSize: "25px 25px",
          }}
        />
        <div className="absolute top-20 left-10 size-32 animate-bounce rounded-full bg-linear-to-br from-emerald-400/20 to-teal-400/20 opacity-50 blur-sm" />
        <div className="animate-infinite absolute bottom-20 left-1/2 size-40 -translate-x-1/2 animate-bounce rounded-full bg-linear-to-br from-teal-400/20 to-cyan-400/20 opacity-50 blur-sm" />

        <div className="space-y-4 px-6 text-center">
          <Fade cascade direction="down" duration={200} delay={0} triggerOnce>
            <Badge
              variant="secondary"
              className="border-primary/20 bg-primary/5 text-primary mb-6 gap-2 px-2 py-1.5"
            >
              <Shield size={20} className="fill-success stroke-success" />{" "}
              Internal Operation Tool
            </Badge>
          </Fade>

          <Fade cascade duration={200} delay={200} triggerOnce>
            <h1 className="text-5xl leading-tight font-bold tracking-tighter text-balance delay-200 duration-700 md:text-7xl">
              Manage your jobs <br />{" "}
              <span className="from-primary relative z-10 block bg-linear-to-r via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                without the chaos
                <span className="absolute -bottom-0.5 left-0 h-3 w-full bg-linear-to-r from-emerald-200 via-teal-200 to-cyan-200 opacity-50 blur-sm" />
              </span>
            </h1>
          </Fade>
          <Fade cascade direction="up" duration={200} delay={400} triggerOnce>
            <p className="text-muted-foreground animate-in fade-in slide-in-from-bottom-5 fill-mode-both mx-auto max-w-2xl text-lg delay-400 duration-700">
              Monitor your jobs, track pending and completed work, and monitor
              payments — all in one place.
            </p>
          </Fade>

          <div className="flex flex-col justify-center gap-4 sm:flex-row md:gap-6">
            <Fade direction="down" duration={200} delay={600} triggerOnce>
              <Link
                href="/dashboard"
                className="group bg-primary text-primary-foreground flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-lg font-semibold transition-all hover:scale-105 active:scale-95"
              >
                Log In to Continue{" "}
                <ArrowBigRight
                  size={20}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
              <a
                href="#features"
                className="text-muted-foreground bg-muted hover:bg-muted flex items-center justify-center gap-2 rounded-xl border px-8 py-4 text-lg font-semibold transition-all hover:scale-105 active:scale-95"
              >
                Explore Features
              </a>
            </Fade>
          </div>
        </div>

        {/* TRUST INDICATORS */}
        <div className="flex flex-wrap items-center justify-center gap-4 opacity-70 md:gap-8">
          <Fade cascade damping={0.1} direction="up" triggerOnce duration={200}>
            {trustIndicators.map((indicator) => (
              <div
                key={indicator.title}
                className="flex items-center gap-2 text-sm font-medium"
              >
                <div className="bg-success/10 text-success flex h-8 w-8 items-center justify-center rounded-lg">
                  {indicator.icon}
                </div>
                {indicator.title}
              </div>
            ))}
          </Fade>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section
        id="features"
        className="bg-primary text-primary-foreground border-y py-12"
      >
        <div className="container mx-auto space-y-6 px-3">
          <div className="text-center">
            <h2 className="text-4xl font-bold">Features</h2>
            <p className="mx-auto max-w-2xl text-balance">
              Everything you need to manage your jobs efficiently and
              effectively.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-6">
            {featureCards.map((card) => (
              <Card
                key={card.title}
                className="border-primary-foreground/40 text-primary-foreground flex flex-col gap-4 border bg-transparent transition-all duration-200 hover:scale-[1.02]"
              >
                <CardHeader className="flex flex-row items-center gap-3">
                  <div className="text-3xl">{card.icon}</div>
                  <CardTitle className="text-lg font-semibold">
                    {card.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="-mt-2">
                  <CardDescription className="text-primary-foreground text-sm">
                    {card.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="py-12">
        <div className="container mx-auto px-3">
          <div className="text-center">
            <h2 className="from-primary bg-linear-to-r via-emerald-800 to-teal-800 bg-clip-text text-4xl font-bold text-transparent">
              The WorkFlow
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl">
              A simple, intuitive workflow to help you manage your jobs from
              start to finish.
            </p>
          </div>
          <div className="mt-10 flex flex-col gap-8 md:flex-row md:gap-6">
            {workFlowSteps.map((step) => (
              <div
                key={step.step}
                className="flex flex-1 flex-col items-center text-center"
              >
                <div className="bg-primary z-10 mb-6 flex h-20 w-20 items-center justify-center rounded-full border-4 text-4xl shadow-xl">
                  {step.icon}
                </div>
                <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Goals - number of jobs completed, pending jobs and amount paid */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto space-y-6 px-3">
          <div className="text-center">
            <h2 className="text-4xl font-bold">Achieve Your Business Goals</h2>
            <p className="mx-auto max-w-2xl">
              Keep track of your completed jobs, pending tasks, and total
              payments all in one place.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {businessGoals.map((goal) => (
              <div key={goal.title} className="flex flex-col items-center">
                <div className="text-primary-foreground/80 mb-4 text-2xl">
                  {goal.icon}
                </div>
                <span className="text-5xl font-black tabular-nums">
                  {goal.count}
                </span>
                <span className="mt-2 text-sm font-medium tracking-widest uppercase opacity-80">
                  {goal.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-y py-12">
        <div className="container mx-auto px-3">
          <h2 className="from-success relative z-10 block bg-linear-to-r via-teal-700 to-cyan-700 bg-clip-text text-center text-3xl font-bold text-transparent">
            Take Control of Your Job Management with JobTrack
            <Sparkle className="mb-1 ml-2 inline-block h-6 w-6 text-yellow-500" />
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-center">
            Start your journey towards efficient job management today. Join
            countless others who have transformed their workflow with JobTrack.
            <br />
            <strong>Get started now and experience the difference!</strong>
          </p>
        </div>
        <div>
          <div className="mt-8 flex justify-center">
            <Link
              href="/dashboard"
              className="bg-primary text-primary-foreground flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-lg font-semibold transition-all hover:scale-105 active:scale-95"
            >
              Log In to Get Started{" "}
              <ArrowBigRight
                size={20}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
