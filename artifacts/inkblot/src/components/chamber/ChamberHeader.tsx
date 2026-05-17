import { Link } from "wouter";
import { BranchData } from "./data";
import { motion } from "framer-motion";

interface ChamberHeaderProps {
  data: BranchData;
}

export function ChamberHeader({ data }: ChamberHeaderProps) {
  return (
    <header className="relative w-full bg-[#050508] overflow-hidden flex flex-col justify-between pt-8 pb-0">
      {/* Background Pulse */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 left-[20%] w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,1) 0%, rgba(245,158,11,0.5) 100%)",
        }}
        animate={{ opacity: [0.03, 0.07, 0.03] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Abstract SVG Background (Right side) */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-5 pointer-events-none flex items-center justify-end pr-10">
        <svg viewBox="0 0 100 200" className="h-full w-auto" preserveAspectRatio="none">
          <path d="M50 0 L50 200" stroke="white" strokeWidth="1" fill="none" />
          <path d="M50 50 L90 20 Q100 10 100 0" stroke="white" strokeWidth="1" fill="none" />
          <path d="M50 120 L20 150 Q10 160 10 170" stroke="white" strokeWidth="1" fill="none" />
          <path d="M50 160 L80 180 Q90 190 90 200" stroke="white" strokeWidth="1" fill="none" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col h-full container mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <motion.nav 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1 }}
          className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-sans mb-auto"
        >
          <Link href={`/universe/${data.universeId}`} className="hover:text-foreground transition-colors cursor-pointer" data-testid="link-breadcrumb-universe">
            {data.universeName}
          </Link>
          <span className="text-border">/</span>
          <Link href={`/universe/${data.universeId}`} className="hover:text-foreground transition-colors cursor-pointer" data-testid="link-breadcrumb-branch">
            {data.branchName}
          </Link>
          <span className="text-border">/</span>
          <span className="text-foreground">Chamber</span>
        </motion.nav>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-4">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_#f59e0b]" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-sans">
                Lore Chamber
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-serif text-5xl md:text-7xl text-foreground leading-none mb-4"
            >
              {data.branchName}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="font-serif italic text-xl md:text-2xl text-muted-foreground"
            >
              {data.branchTagline}
            </motion.p>
          </div>

          {/* Info Bar Right */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col gap-3 text-sm shrink-0 bg-black/20 backdrop-blur-md border border-border/50 p-4 rounded-md"
          >
            <div className="flex justify-between items-center gap-6 border-b border-border/50 pb-2">
              <span className="text-muted-foreground font-sans text-xs">Rooted in:</span>
              <span className="font-serif italic text-foreground">{data.rootNodeTitle}</span>
            </div>
            <div className="flex justify-between items-center gap-6 border-b border-border/50 pb-2">
              <span className="text-muted-foreground font-sans text-xs">Branch Depth:</span>
              <div className="flex gap-1">
                {Array.from({ length: data.branchDepth }).map((_, i) => (
                  <div key={i} className="w-2 h-2 rotate-45 bg-indigo-500 shadow-[0_0_5px_#6366f1]" />
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center gap-6 border-b border-border/50 pb-2">
              <span className="text-muted-foreground font-sans text-xs">Active Contributors:</span>
              <span className="font-sans text-foreground">{data.activeContributors}</span>
            </div>
            <div className="flex justify-between items-center gap-6">
              <span className="text-muted-foreground font-sans text-xs">Governance:</span>
              <span className="font-serif text-foreground">{data.governance}</span>
            </div>
          </motion.div>
        </div>

        {/* Bottom Element & Factions */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 1, ease: "easeInOut" }}
          className="w-full h-px bg-amber-500/50 shadow-[0_0_10px_rgba(245,158,11,0.5)] origin-left relative flex items-center mt-4"
        >
          <div className="absolute left-0 flex flex-wrap gap-2 -translate-y-1/2 pl-6">
            {data.factions.map((faction, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="bg-[#0d0d14] border border-border px-3 py-1 flex items-center gap-2 shadow-lg"
              >
                <span className="font-serif text-sm text-foreground">{faction.name}</span>
                <span className="text-border px-1">·</span>
                <span className={`text-[9px] uppercase tracking-[0.1em] font-sans ${faction.alignment === 'tree' ? 'text-indigo-400' : 'text-violet-400'}`}>
                  {faction.alignment}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </header>
  );
}