"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const LOCATIONS_DATA = [
  { location: "Nyali", keywords: ["nyali", "links", "miami"] },
  { location: "Mombasa CBD", keywords: ["cbd", "city", "centre", "town"] },
  { location: "Bamburi", keywords: ["bamburi", "shanzu", "beach"] },
  { location: "Kisauni", keywords: ["kisauni", "mishomoroni"] },
  { location: "Likoni", keywords: ["likoni", "ferry"] },
  { location: "Mtwapa", keywords: ["mtwapa", "creekside"] },
  { location: "Diani", keywords: ["diani", "ukunda", "south coast"] },
  { location: "Malindi", keywords: ["malindi", "watamu"] },
  { location: "Kilifi", keywords: ["kilifi", "bofa"] },
  {
    location: "Mombasa Island",
    keywords: ["island", "old town", "ganjoni", "tudor"],
  },
];

type Props = {
  value: string;
  onChange: (val: string) => void;
  onBlur: () => void;
  hasError: boolean;
  isTouched: boolean;
};

export default function LocationCombobox({
  value,
  onChange,
  onBlur,
  hasError,
  isTouched,
}: Props) {
  const [open, setOpen] = useState(false);

  const filtered = LOCATIONS_DATA.filter((item) => {
    const searchTerm = value.toLowerCase();
    return (
      item.location.toLowerCase().includes(searchTerm) ||
      item.keywords.some((key) => key.includes(searchTerm))
    );
  });

  const showDropdown = open && (filtered.length > 0 || value.trim().length > 0);

  return (
    <div className="relative">
      <MapPin
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
        placeholder="Search location (e.g. Nyali)"
        className={cn(
          "border-muted-foreground/40 focus-visible:border-primary/40 h-10 bg-white pl-9 text-sm transition placeholder:text-zinc-400 focus-visible:ring-0",
          hasError ? "border-destructive/40" : isTouched && "border-success",
        )}
      />

      {showDropdown && (
        <ul className="absolute z-50 mt-1 w-full overflow-hidden rounded-lg border border-zinc-100 bg-white shadow-md">
          {filtered.map((item) => (
            <li
              key={item.location}
              onMouseDown={() => {
                onChange(item.location);
                setOpen(false);
              }}
              className="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
            >
              <MapPin size={12} className="shrink-0 text-zinc-400" />
              <span>{item.location}</span>
            </li>
          ))}

          {/* custom location option */}
          {value.trim() &&
            !LOCATIONS_DATA.some(
              (i) => i.location.toLowerCase() === value.toLowerCase(),
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
