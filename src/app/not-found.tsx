import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="w-full px-4 sm:px-8 pt-16 sm:pt-24 pb-16 space-y-6">
      {/* 404 Header at the top */}
      <div className="space-y-2">
        <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground font-semibold">
          Error 404
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Page Not Found
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-md">
          The page you are looking for does not exist or has been moved.
        </p>
      </div>

      {/* Return Home Button */}
      <div className="pt-2">
        <Button
          asChild
          variant="outline"
          className="h-9 px-4 text-xs font-mono uppercase tracking-wider border-border hover:bg-accent text-foreground shadow-xs"
        >
          <Link href="/" className="inline-flex items-center gap-2">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
