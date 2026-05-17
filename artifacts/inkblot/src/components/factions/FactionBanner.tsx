import { motion } from "framer-motion";
import { FactionData, ALIGNMENT_LABELS, CANON_STANCE_LABELS, MUTATION_STANCE_LABELS, ALIGNMENT_COLORS } from "./data";
import { Link } from "wouter";

interface FactionBannerProps {
  faction: FactionData;
}

export function FactionBanner({ faction }: FactionBannerProps) {
  return (
    <div className="relative w-full overflow-hidden bg-[#020204]" data-testid="faction-banner">
      {/* Background Effects */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: [0.04, 0.10, 0.04] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: `radial-gradient(circle at 50% 50%, ${faction.primaryColor} 0%, transparent 60%)`
        }}
      />
      <div 
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-20"
        style={{
          background: `repeating-linear-gradient(0deg, transparent, transparent 2px, #fff 2px, #fff 4px)`,
          backgroundSize: "100% 4px"
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent pointer-events-none" />

      <div className="container relative z-10 px-6 mx-auto grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-center py-20">
        
        {/* Left Content */}
        <div>
          <div className="flex items-center gap-4 mb-8 text-xs tracking-widest text-muted-foreground uppercase">
            <Link href="/factions" className="hover:text-foreground transition-colors cursor-pointer">
              THE INTERPRETIVE ORDERS
            </Link>
            <span className="opacity-50">/</span>
            <span style={{ color: faction.primaryColor }}>{faction.name}</span>
          </div>

          <div className="inline-flex items-center gap-2 border border-white/10 rounded-full px-3 py-1 bg-white/5 mb-6">
            <div 
              className="w-2 h-2 rounded-full" 
              style={{ backgroundColor: ALIGNMENT_COLORS[faction.alignment], boxShadow: `0 0 8px ${ALIGNMENT_COLORS[faction.alignment]}` }} 
            />
            <span className="text-xs text-foreground uppercase tracking-widest">
              {ALIGNMENT_LABELS[faction.alignment]}
            </span>
          </div>

          <h1 className="font-serif text-5xl md:text-6xl lg:text-8xl text-foreground font-medium tracking-[0.02em] leading-none mb-6 drop-shadow-lg">
            {faction.name}
          </h1>

          <p className="font-serif text-xl md:text-2xl italic text-muted-foreground/80 mb-8 max-w-2xl border-l-2 pl-4" style={{ borderColor: `${faction.primaryColor}50` }}>
            {faction.tagline}
          </p>

          <div className="flex items-center gap-6 text-xs tracking-widest text-muted-foreground uppercase">
            <span>FOUNDED: {faction.foundingCycle}</span>
            <span className="opacity-50">•</span>
            <span>{faction.memberCount} MEMBERS</span>
          </div>
          
          <div 
            className="w-full h-px mt-8 max-w-lg" 
            style={{ 
              background: `linear-gradient(90deg, ${faction.primaryColor} 0%, transparent 100%)`,
              opacity: 0.5 
            }} 
          />
        </div>

        {/* Right Content - Sigil */}
        <div className="relative flex justify-center items-center h-48 lg:h-64 order-first lg:order-last opacity-80 lg:opacity-100">
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <svg viewBox="0 0 200 200" className="w-[120px] h-[120px] lg:w-[200px] lg:h-[200px] opacity-20">
              <circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" />
              <circle cx="100" cy="100" r="85" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="1 4" opacity="0.5" />
            </svg>
          </motion.div>

          <motion.svg 
            viewBox="0 0 100 100" 
            className="w-[100px] h-[100px] lg:w-[160px] lg:h-[160px] relative z-10"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{ filter: `drop-shadow(0 0 15px ${faction.primaryColor}60)` }}
          >
            <path 
              d={faction.sigil} 
              fill="none" 
              stroke={faction.primaryColor} 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
          </motion.svg>
        </div>

      </div>

      {/* Bottom Stance Indicators */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/5 bg-background/50 backdrop-blur-sm hidden md:block">
        <div className="container mx-auto px-6 flex items-center h-14 text-xs tracking-widest text-muted-foreground uppercase divide-x divide-white/5">
          <div className="pr-6">ALIGNMENT: <span className="text-foreground">{ALIGNMENT_LABELS[faction.alignment]}</span></div>
          <div className="px-6">CANON: <span className="text-foreground">{CANON_STANCE_LABELS[faction.canonStance]}</span></div>
          <div className="px-6">MUTATION: <span className="text-foreground">{MUTATION_STANCE_LABELS[faction.mutationStance]}</span></div>
        </div>
      </div>
    </div>
  );
}
