"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const subtleFadeVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.25,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function AboutSection() {
  return (
    <motion.section
      id="about"
      variants={subtleFadeVariants}
      initial={false}
      animate="visible"
      className="px-4 sm:px-8 py-8 sm:py-9 border-b border-border space-y-5"
    >
      {/* Clean Minimalist Section Title */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground font-semibold">
          About
        </span>
      </div>

      {/* Editorial Quotation Story */}
      <div className="relative border-l-2 border-foreground/80 pl-5 sm:pl-6 py-1 space-y-4">
        
        {/* DESKTOP VERSION (md & up) - Full rich narrative */}
        <div className="hidden md:block space-y-4">
          {/* Paragraph 1: Origin & Early Journey */}
          <p className="text-[15px] sm:text-base leading-relaxed text-foreground font-normal">
            &ldquo;Hi, I&apos;m <span className="font-semibold text-foreground">Subhankar Mondal</span>. My software engineering journey began back in 2021 driven by a passion for building scalable web systems. Over the years, I coded and deployed numerous applications and tools. While many of those early experiments never blew up, each build was an invaluable masterclass that refined my technical craft and engineering discipline.&rdquo;
          </p>

          {/* Paragraph 2: The Vision for Nodezed */}
          <p className="text-[15px] sm:text-base leading-relaxed text-foreground font-normal">
            &ldquo;Today, all my energy and focus are poured into building{" "}
            <a
              href="https://nodezed.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-foreground underline underline-offset-4 decoration-foreground/40 hover:decoration-foreground inline-flex items-center gap-0.5"
            >
              Nodezed
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            . We are solving a bottleneck every builder encounters: deploying cloud infrastructure shouldn&apos;t require wrestling with complex DevOps configurations. Nodezed enables developers and businesses to launch and manage scalable cloud systems in a single click.&rdquo;
          </p>

          {/* Paragraph 3: The Monochrome Philosophy */}
          <p className="text-sm sm:text-[15px] leading-relaxed text-muted-foreground font-normal">
            &ldquo;I have always had a deliberate obsession with monochrome. Black and white strips away decorative visual noise, forcing the interface to stand on the raw strength of its structure, spacing, and typography—which is why I chose it over colors.&rdquo;
          </p>
        </div>

        {/* MOBILE & TABLET VERSION (< md) - Concise, same meaning */}
        <div className="block md:hidden space-y-3.5">
          {/* Paragraph 1: Origin */}
          <p className="text-[14px] leading-relaxed text-foreground font-normal">
            &ldquo;Hi, I&apos;m <span className="font-semibold text-foreground">Subhankar Mondal</span>. My software journey began in 2021. Over the years, I coded and shipped dozens of applications and systems. While none blew up, each project refined my craft and taught me resilience.&rdquo;
          </p>

          {/* Paragraph 2: Nodezed */}
          <p className="text-[14px] leading-relaxed text-foreground font-normal">
            &ldquo;Today, all my energy is focused on building{" "}
            <a
              href="https://nodezed.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-foreground underline underline-offset-4 decoration-foreground/40 hover:decoration-foreground inline-flex items-center gap-0.5"
            >
              Nodezed
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            . We&apos;re removing DevOps friction—enabling developers and businesses to launch and scale automated cloud infrastructure in a single click.&rdquo;
          </p>

          {/* Paragraph 3: Monochrome */}
          <p className="text-[13px] leading-relaxed text-muted-foreground font-normal">
            &ldquo;I have always chosen monochrome. Black and white strips away visual noise, allowing pure structure, spacing, and typography to stand on their own.&rdquo;
          </p>
        </div>
      </div>
    </motion.section>
  );
}
