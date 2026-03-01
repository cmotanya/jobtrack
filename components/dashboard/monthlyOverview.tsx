import { formatCurrency } from "@/helpers/formatCurrency";
import { CalendarCheck, TrendingUp, Zap } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { jobStats } from "@/helpers/jobStats";
import { useJobs } from "@/hook/useJobs";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const Ring = ({
  pct,
  color,
  size = 72,
  stroke = 5,
}: {
  pct: number;
  color: string;
  size?: number;
  stroke?: number;
}) => {
  const [animated, setAnimated] = useState(0);
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (animated / 100) * circ;

  useEffect(() => {
    const t = setTimeout(() => setAnimated(pct), 120);
    return () => clearTimeout(t);
  }, [pct]);

  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      {/* Track */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#f0ede8"
        strokeWidth={stroke}
      />
      {/* Fill */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        style={{
          transition: "stroke-dashoffset 1s cubic-bezier(0.16,1,0.3,1)",
        }}
      />
    </svg>
  );
};

const MonthlyOverview = () => {
  const { jobs } = useJobs();
  const stats = jobStats(jobs);

  const calc = (a: number, b: number) =>
    b === 0 ? 0 : Math.round((a / b) * 100);

  const cards = [
    {
      title: "Total Revenue",
      value: formatCurrency(stats.totalAmount),
      sub: ``,
      pct: 100,
      Icon: TrendingUp,
      ringColor: "#0d9488", // teal-600
      iconColor: "text-teal-800 border-teal-800",
      pctColor: "text-teal-600",
      badgeBg: "bg-teal-50 text-teal-700 border-teal-100",
    },

    {
      title: "In Progress",
      value: String(stats.totalJobsInProgress),
      sub: `/ ${stats.totalJobs} total projects`,
      pct: calc(stats.totalJobsInProgress, stats.totalJobs),
      Icon: Zap,
      ringColor: "#d97706", // amber-600
      iconColor: "text-amber-800 border-amber-800",
      pctColor: "text-amber-600",
      badgeBg: "bg-amber-50 text-amber-700 border-amber-100",
    },
    {
      title: "Scheduled",
      value: String(stats.totalJobsScheduled),
      sub: `/ of ${stats.totalJobs} total projects`,
      pct: calc(stats.totalJobsScheduled, stats.totalJobs),
      Icon: CalendarCheck,
      ringColor: "#6366f1", // indigo-500
      iconColor: "text-indigo-800 border-indigo-800",
      pctColor: "text-indigo-600",
      badgeBg: "bg-indigo-50 text-indigo-700 border-indigo-100",
    },
  ];

  return (
    <div className="space-y-3 px-4">
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-800">
            Monthly Overview
          </h2>
          <Badge
            variant="outline"
            className="border-slate-200 bg-slate-50 text-slate-500"
          >
            Last 30 Days
          </Badge>
        </div>
        <p className="text-sm">Performance metrics for the current month</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Revenue Card */}
        {cards.map((card) => (
          <Card
            key={card.title}
            className="relative overflow-hidden border shadow-md transition-all ease-in-out hover:scale-[1.02] hover:shadow-lg"
          >
            <div className="absolute top-0 right-0 p-3 opacity-20">
              <card.Icon
                className={cn(
                  "size-8 rounded-sm border-2 p-0.5",
                  card.iconColor,
                )}
              />
            </div>
            <CardHeader>
              <CardTitle className="text-muted-foreground text-xs font-semibold tracking-widest uppercase opacity-70">
                {card.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Ring pct={card.pct} color={card.ringColor} />
                  <span className="absolute inset-0 flex items-center justify-center">
                    {card.pct}%
                  </span>
                </div>
                <div className="mb-1 text-3xl font-bold tabular-nums">
                  {card.value}{" "}
                  <span className="text-muted-foreground text-xs font-medium">
                    {card.sub}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MonthlyOverview;
