"use client";

import { useState } from "react";
import { Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const JOB_TITLES_DATA = [
  {
    title: "Smart CCTV Surveillance Install",
    keywords: ["hikvision", "ring", "dahua", "nvr", "ip camera", "security"],
  },
  {
    title: "High-Speed Starlink Integration",
    keywords: ["satellite", "spacex", "dish", "internet", "kit"],
  },
  {
    title: "Managed Wi-Fi Mesh Deployment",
    keywords: [
      "deco",
      "tp-link",
      "ubiquiti",
      "unifi",
      "access point",
      "ruijie",
    ],
  },
  {
    title: "Biometric Access Control Setup",
    keywords: ["fingerprint", "face id", "hikvision", "zkteco", "entry"],
  },
  {
    title: "Structured Network Cabling",
    keywords: ["cat6", "lan", "trunking", "ethernet", "patch panel"],
  },
  {
    title: "Advanced Hardware Diagnostics",
    keywords: ["hp", "dell", "laptop", "repair", "screen", "battery", "pc"],
  },
  {
    title: "Full-Stack Web Development",
    keywords: ["nextjs", "react", "supabase", "database", "coding"],
  },
  {
    title: "Commercial Sound System Install",
    keywords: ["pa system", "amplifier", "mixer", "100v line", "audio"],
  },
  {
    title: "General Technical Consultation",
    keywords: ["audit", "survey", "troubleshooting"],
  },
];

type Props = {
  value: string;
  onChange: (val: string) => void;
  onBlur: () => void;
  hasError: boolean;
  isTouched: boolean;
};

export default function JobTitleCombobox({
  value,
  onChange,
  onBlur,
  hasError,
  isTouched,
}: Props) {
  const [open, setOpen] = useState(false);

  const filtered = JOB_TITLES_DATA.filter((item) => {
    const searchTerm = value.toLowerCase();
    return (
      item.title.toLowerCase().includes(searchTerm) ||
      item.keywords.some((key) => key.includes(searchTerm))
    );
  });

  const showDropdown = open && (filtered.length > 0 || value.trim().length > 0);

  return (
    <div className="relative">
      <Briefcase
        size={14}
        className="absolute top-1/2 left-3 z-10 -translate-y-1/2 text-zinc-400"
      />
      <Input
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
        }}
        onBlur={() => {
          onBlur();
          setTimeout(() => setOpen(false), 200);
        }}
        onFocus={() => setOpen(true)}
        placeholder="Search title or brand (e.g. Hikvision)"
        className={cn(
          "border-muted-foreground/40 focus-visible:border-primary/40 h-10 bg-white pl-9 text-sm transition placeholder:text-zinc-400 focus-visible:ring-0",
          hasError ? "border-destructive/40" : isTouched && "border-success",
        )}
      />

      {showDropdown && (
        <ul className="absolute z-50 mt-1 w-full overflow-hidden rounded-lg border border-zinc-100 bg-white shadow-md">
          {filtered.map((item) => (
            <li
              key={item.title}
              onMouseDown={() => {
                onChange(item.title);
                setOpen(false);
              }}
              className="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
            >
              <Briefcase size={12} className="shrink-0 text-zinc-400" />
              <span>{item.title}</span>
            </li>
          ))}

          {/* show custom option if typed value doesn't match any title exactly */}
          {value.trim() &&
            !JOB_TITLES_DATA.some(
              (i) => i.title.toLowerCase() === value.toLowerCase(),
            ) && (
              <li
                onMouseDown={() => {
                  onChange(value.trim());
                  setOpen(false);
                }}
                className="flex cursor-pointer items-center gap-2 border-t border-zinc-100 px-3 py-2 text-sm text-indigo-600 hover:bg-indigo-50"
              >
                <span className="font-medium">
                  Use &quot;{value.trim()}&quot;
                </span>
              </li>
            )}
        </ul>
      )}
    </div>
  );
}
