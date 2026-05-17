import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PROFILE_DATA } from "./data";

export function ContributionHistory() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const getStatusDisplay = (type: string) => {
    switch (type) {
      case "canon":
        return <span className="px-2 py-0.5 rounded-none border border-emerald-500/30 text-emerald-400 text-[10px] uppercase tracking-widest shadow-[0_0_8px_rgba(16,185,129,0.2)]">Canonized</span>;
      case "shadow":
        return <span className="px-2 py-0.5 rounded-none border border-violet-500/30 text-violet-400 text-[10px] uppercase tracking-widest shadow-[0_0_8px_rgba(139,92,246,0.2)]">Shadow</span>;
      case "branch":
        return <span className="px-2 py-0.5 rounded-none border border-blue-500/30 text-blue-400 text-[10px] uppercase tracking-widest">Branch</span>;
      case "review":
        return <span className="px-2 py-0.5 rounded-none border border-amber-500/30 text-amber-400 text-[10px] uppercase tracking-widest">Review</span>;
      default:
        return null;
    }
  };

  const getDotColor = (type: string) => {
    switch (type) {
      case "canon": return "bg-primary shadow-[0_0_6px_rgba(99,102,241,0.8)]";
      case "shadow": return "bg-violet-500 shadow-[0_0_6px_rgba(139,92,246,0.8)]";
      case "branch": return "bg-blue-500 shadow-[0_0_6px_rgba(59,130,246,0.8)]";
      case "review": return "bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.8)]";
      default: return "bg-primary";
    }
  };

  return (
    <section className="py-24 border-t border-border bg-background relative" data-testid="contribution-history">
      <div className="container mx-auto px-6">
        <h2 className="font-serif text-3xl text-foreground font-medium mb-16 text-center md:text-left">The Living Record</h2>

        <div className="max-w-4xl mx-auto relative pb-20" ref={ref}>
          {/* Vertical timeline line - hidden on mobile */}
          <div className="hidden md:block absolute left-[8.5rem] top-4 bottom-0 w-px bg-border/50" />

          <div className="flex flex-col gap-10 md:gap-12">
            {PROFILE_DATA.recentContributions.map((entry, idx) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8 relative z-10"
              >
                {/* Timestamp */}
                <div className="md:w-24 shrink-0 pt-1">
                  <span className="text-xs text-muted-foreground/60 tracking-wider uppercase font-sans">
                    {entry.timestamp}
                  </span>
                </div>

                {/* Timeline Dot */}
                <div className="hidden md:flex shrink-0 w-8 h-8 items-center justify-center bg-background rounded-full relative -ml-4 z-10">
                  <div className={`w-2.5 h-2.5 rounded-full ${getDotColor(entry.type)}`} />
                </div>

                {/* Content Card */}
                <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 md:p-0 md:bg-transparent bg-card border md:border-transparent border-border hover:bg-card/50 md:hover:bg-transparent transition-colors">
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-serif text-2xl text-foreground/90">{entry.title}</h3>
                    <span className="text-sm font-sans text-muted-foreground">{entry.universe}</span>
                  </div>
                  <div className="shrink-0 flex items-center md:justify-end">
                    {getStatusDisplay(entry.type)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Fade out gradient at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}