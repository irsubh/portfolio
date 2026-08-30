"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  Github, 
  Linkedin, 
  ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { GithubBannerChart } from "@/components/GithubBannerChart";
import type { ContributionDay } from "@/lib/github";

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.02,
    },
  },
};

const subtleItemVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

interface ProfileHeaderProps {
  initialContributions?: ContributionDay[];
}

export function ProfileHeader({ initialContributions = [] }: ProfileHeaderProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial={false}
      animate="visible"
      className="w-full relative"
    >
      {/* 1. GitHub Contributions Banner Area (Clean, full banner heatmap) */}
      <motion.div
        variants={subtleItemVariants}
        className="w-full h-24 sm:h-32 border-b border-border bg-background relative overflow-hidden flex flex-col justify-start z-20"
      >
        {/* Live GitHub Contributions Heatmap Background */}
        <GithubBannerChart username="amsubhm" initialContributions={initialContributions} />
      </motion.div>

      {/* 2. Profile Details Section (Matching px-4 sm:px-8 Side Padding) */}
      <div className="px-4 sm:px-8 pb-8 border-b border-border space-y-4">
        {/* Avatar & Action Buttons Row */}
        <motion.div
          variants={subtleItemVariants}
          className="flex items-end justify-between gap-3 -mt-12 sm:-mt-14 relative z-20 pointer-events-none"
        >
          {/* Left Side: Overlapping DP + [Articles] & [ThemeToggle] */}
          <div className="flex items-end gap-2.5 sm:gap-3 pointer-events-auto">
            {/* Overlapping Square DP */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 bg-muted border-4 border-background overflow-hidden relative select-none shadow-xs shrink-0">
              <Image
                src="/me.png"
                alt="Subhankar"
                fill
                priority
                sizes="(max-width: 768px) 96px, 112px"
                className="object-cover"
              />
            </div>

            {/* Articles & Theme Toggle (directly after DP) */}
            <div className="flex items-center gap-1.5 pb-1">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="h-8 px-3 text-xs font-medium border-border hover:bg-accent text-foreground shadow-xs"
              >
                <Link href="/articles">
                  Articles
                </Link>
              </Button>

              <div className="h-8 w-8 inline-flex items-center justify-center bg-background border border-border shadow-xs hover:bg-accent">
                <ThemeToggle className="h-full w-full rounded-none border-0" iconClassName="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Right Side: Square Social Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 pb-1 pointer-events-auto shrink-0">
            {/* X (Twitter) */}
            <Button
              asChild
              variant="outline"
              size="icon"
              className="w-8 h-8 border-border hover:bg-accent text-foreground shadow-xs"
              title="X Profile (@amsubhm)"
            >
              <a
                href="https://subhm.in/x"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X Profile"
              >
                <XIcon className="w-4 h-4" />
              </a>
            </Button>

            {/* GitHub */}
            <Button
              asChild
              variant="outline"
              size="icon"
              className="w-8 h-8 border-border hover:bg-accent text-foreground shadow-xs"
              title="GitHub (@amsubhm)"
            >
              <a
                href="https://subhm.in/gh"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
            </Button>

            {/* LinkedIn */}
            <Button
              asChild
              variant="outline"
              size="icon"
              className="w-8 h-8 border-border hover:bg-accent text-foreground shadow-xs"
              title="LinkedIn (@amsubhm)"
            >
              <a
                href="https://subhm.in/in"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </motion.div>

        {/* Name, Handle & Verified Badge */}
        <motion.div variants={subtleItemVariants} className="space-y-1 pt-1">
          <div className="flex items-center gap-1.5">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Subhankar
            </h1>
            <CheckCircle2 className="w-4 h-4 text-foreground fill-foreground/10 shrink-0" />
          </div>
          <p className="text-sm font-mono text-muted-foreground">
            @amsubhm
          </p>
        </motion.div>

        {/* Bio */}
        <motion.p
          variants={subtleItemVariants}
          className="text-sm sm:text-base text-foreground/90 leading-relaxed max-w-2xl font-normal"
        >
          Founder & Developer building{" "}
          <a
            href="https://nodezed.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground font-semibold hover:underline inline-flex items-center gap-0.5"
          >
            nodezed.com
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
          {", enabling developers and businesses to deploy scalable cloud infrastructure in a single click."}
        </motion.p>
      </div>
    </motion.div>
  );
}
