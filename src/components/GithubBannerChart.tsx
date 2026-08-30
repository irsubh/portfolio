"use client";

import React, { useEffect, useState } from "react";
import type { ContributionDay } from "@/lib/github";

interface GithubBannerChartProps {
  username?: string;
  initialContributions?: ContributionDay[];
}

export function GithubBannerChart({
  username = "amsubhm",
  initialContributions = [],
}: GithubBannerChartProps) {
  const [contributions, setContributions] = useState<ContributionDay[]>(initialContributions);

  useEffect(() => {
    // If server already provided contributions, keep them
    if (initialContributions && initialContributions.length > 0) {
      setContributions(initialContributions);
      return;
    }

    let isMounted = true;

    async function fetchContributions() {
      try {
        const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        if (isMounted && data.contributions && data.contributions.length > 0) {
          setContributions(data.contributions);
        }
      } catch (err) {
        console.error("Failed to load real GitHub contributions:", err);
      }
    }

    fetchContributions();
    return () => {
      isMounted = false;
    };
  }, [username, initialContributions]);

  // Organize days into 7-day columns (Sunday to Saturday)
  const columns: ContributionDay[][] = [];
  let currentColumn: ContributionDay[] = [];

  contributions.forEach((day, index) => {
    currentColumn.push(day);
    if (currentColumn.length === 7) {
      columns.push(currentColumn);
      currentColumn = [];
    } else if (index === contributions.length - 1) {
      // Pad remaining days of the current week with blank level-0 dots so the column is always a complete 7-day line
      while (currentColumn.length < 7) {
        currentColumn.push({
          date: "",
          count: 0,
          level: 0,
        });
      }
      columns.push(currentColumn);
      currentColumn = [];
    }
  });

  // Monochrome black & gray scale color mapping
  const getCellClass = (level: number) => {
    switch (level) {
      case 4:
        return "bg-neutral-950 dark:bg-neutral-100 border-neutral-950 dark:border-neutral-100";
      case 3:
        return "bg-neutral-700 dark:bg-neutral-300 border-neutral-700 dark:border-neutral-300";
      case 2:
        return "bg-neutral-400 dark:bg-neutral-500 border-neutral-400 dark:border-neutral-500";
      case 1:
        return "bg-neutral-300 dark:bg-neutral-700 border-neutral-300 dark:border-neutral-700";
      case 0:
      default:
        return "bg-neutral-100/90 dark:bg-neutral-900/80 border-neutral-200 dark:border-neutral-800";
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden flex items-center justify-end p-0 pointer-events-none select-none [mask-image:linear-gradient(to_right,transparent_0%,black_2%,black_100%)]">
      <div className="flex items-center gap-[3px] sm:gap-[3.5px] pr-1.5 sm:pr-2">
        {columns.map((col, colIdx) => (
          <div key={colIdx} className="flex flex-col gap-[3px] sm:gap-[3.5px]">
            {col.map((day, dayIdx) => (
              <div
                key={day.date || `${colIdx}-${dayIdx}`}
                className={`w-[10.5px] h-[10.5px] sm:w-[13.5px] sm:h-[13.5px] rounded-[1.5px] border ${getCellClass(
                  day.level
                )}`}
                title={day.date ? `${day.date}: ${day.count} contributions` : undefined}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Top subtle soft fade */}
      <div className="absolute inset-x-0 top-0 h-6 sm:h-8 bg-gradient-to-b from-background via-background/40 to-transparent pointer-events-none" />

      {/* Bottom subtle soft fade */}
      <div className="absolute inset-x-0 bottom-0 h-6 sm:h-8 bg-gradient-to-t from-background via-background/40 to-transparent pointer-events-none" />

      {/* Left subtle soft fade */}
      <div className="absolute inset-y-0 left-0 w-6 sm:w-10 bg-gradient-to-r from-background via-background/40 to-transparent pointer-events-none" />

      {/* Right subtle soft fade */}
      <div className="absolute inset-y-0 right-0 w-3 sm:w-5 bg-gradient-to-l from-background via-background/40 to-transparent pointer-events-none" />
    </div>
  );
}
