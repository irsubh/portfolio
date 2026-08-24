"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: "About", href: "/#about" },
  { name: "Projects", href: "/#projects" },
  { name: "Articles", href: "/articles" },
];

export function Navbar() {
  const pathname = usePathname();

  // Hide Navbar completely on main landing page ("/")
  if (pathname === "/") {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md border-b border-border">
      <nav className="w-full flex items-center justify-between px-4 sm:px-8 py-3">
        
        {/* Left: Minimalist Sharp [S] Logo Badge */}
        <Link
          href="/"
          className="flex items-center justify-center w-7 h-7 bg-foreground text-background font-bold text-xs tracking-wider border border-foreground select-none"
          aria-label="Subhankar Mondal Home"
        >
          S
        </Link>

        {/* Center: Navigation Links */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {navItems.map((item) => {
            const isActive =
              (item.href === "/articles" && pathname.startsWith("/articles")) ||
              (item.href === "/#about" && pathname === "/" && typeof window !== "undefined" && window.location.hash === "#about");

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-1.5 text-xs sm:text-sm font-medium border ${
                  isActive
                    ? "text-foreground bg-accent border-border font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/70 border-transparent hover:border-border"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Right: Theme Toggle [Sun/Moon] & GitHub Link */}
        <div className="flex items-center gap-1">
          <ThemeToggle />

          <Button
            asChild
            variant="ghost"
            size="icon"
            className="w-8 h-8 text-muted-foreground hover:text-foreground hover:bg-accent border border-transparent hover:border-border"
            title="GitHub Profile"
          >
            <a
              href="https://subhm.in/gh"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          </Button>
        </div>

      </nav>
    </header>
  );
}
