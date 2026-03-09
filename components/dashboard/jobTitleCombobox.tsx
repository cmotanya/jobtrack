"use client";

import { useState } from "react";
import { Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { JobTitleComboboxProps } from "@/types/dashboard";
import { JOB_TITLES_DATA } from "@/data/job-title";

export default function JobTitleCombobox({
  value,
  onChange,
  onBlur,
  hasError,
  isTouched,
}: JobTitleComboboxProps) {
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
          "border-muted-foreground/40 focus-visible:border-primary/40 bg-background placeholder:text-muted-foreground/60 h-10 pl-9 text-sm transition focus-visible:ring-0",
          hasError ? "border-destructive/40" : isTouched && "border-success",
        )}
      />

      {showDropdown && (
        <ul className="border-muted-foreground/40 bg-background/30 absolute z-50 mt-1 w-full overflow-hidden rounded-lg border shadow-md backdrop-blur-sm">
          {filtered.map((item) => (
            <li
              key={item.title}
              onMouseDown={() => {
                onChange(item.title);
                setOpen(false);
              }}
              className="text-foreground hover:bg-foreground/50 flex cursor-pointer items-center gap-2 px-3 py-2 text-sm"
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
                className="border-muted-foreground/20 bg-muted-foreground/15 cursor-pointer rounded-lg border px-3 py-2 text-sm text-sky-700"
              >
                <span className="font-medium">
                  Use &quot;{value.trim()}&quot; as a custom title
                </span>
              </li>
            )}
        </ul>
      )}
    </div>
  );
}
