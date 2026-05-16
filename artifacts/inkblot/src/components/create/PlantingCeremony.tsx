import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import type { UniverseData } from "@/pages/CreateUniversePage";

interface PlantingCeremonyProps {
  data: UniverseData;
}

export function PlantingCeremony({ data }: PlantingCeremonyProps) {
  const getThemeColor = () => {
    if (data.governance === 'wild') return '#c026d3';
    if (data.governance === 'dual') return '#f59e0b';
    return '#6366f1'; // default primary
  };

  const themeColor = getThemeColor();

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden" data-testid="planting-ceremony">
      {/* Phase 1: Name */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2.5, times: [0, 0.3, 1] }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <h1 className="font-serif text-6xl md:text-8xl text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
          {data.name}
        </h1>
      </motion.div>

      {/* Main SVG Canvas */}
      <svg viewBox="0 0 400 800" className="w-full max-w-2xl h-[80vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* Phase 3: Roots */}
        <motion.g stroke={themeColor} strokeWidth="1" fill="none" opacity="0.4">
          <motion.path 
            d="M200 600 Q150 650 100 700" 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 2.5, ease: "easeOut" }}
          />
          <motion.path 
            d="M200 600 Q250 680 300 720" 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 2.7, ease: "easeOut" }}
          />
          <motion.path 
            d="M200 600 Q180 660 160 750" 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 2.9, ease: "easeOut" }}
          />
        </motion.g>

        {/* Phase 4: Trunk */}
        <motion.path
          d="M200 600 L200 200"
          stroke={themeColor}
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, delay: 4.5, ease: "easeInOut" }}
          style={{ filter: `drop-shadow(0 0 10px ${themeColor}80)` }}
        />

        {/* Phase 5: Branch Potential */}
        <motion.path
          d="M200 400 Q250 350 280 250"
          stroke={themeColor}
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 0.5, 0.2, 0.5] }}
          transition={{ 
            pathLength: { duration: 1.5, delay: 7, ease: "easeOut" },
            opacity: { duration: 3, delay: 7, repeat: Infinity, repeatType: "reverse" }
          }}
        />

        {/* Phase 2: Root Descending */}
        <motion.circle
          cx="200"
          cy="200"
          r="4"
          fill="white"
          initial={{ cy: 200, opacity: 0 }}
          animate={{ cy: 600, opacity: [0, 1, 1] }}
          transition={{ duration: 1.7, delay: 0.8, ease: "easeIn" }}
          style={{ filter: "drop-shadow(0 0 8px white)" }}
        />
      </svg>

      {/* Phase 2: Root Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
        className="absolute top-[80%] left-1/2 -translate-x-1/2 text-center pointer-events-none"
      >
        <p className="font-serif italic text-white/60 text-lg">{data.rootNodeTitle}</p>
        <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/30 mt-2">Root</p>
      </motion.div>

      {/* Phase 4: Governance Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 5.5 }}
        className="absolute top-[40%] left-[60%] pointer-events-none"
      >
        <p className="font-sans text-xs uppercase tracking-[0.3em] text-white/40" style={{ color: themeColor }}>
          {data.governance}
        </p>
      </motion.div>

      {/* Phase 6: Final Words & CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 8.5 }}
        className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-10"
      >
        <h2 className="font-serif text-3xl md:text-5xl text-white mb-6 text-center px-4">
          Every world begins with a single root.
        </h2>
        <p className="font-serif italic text-xl text-white/70 mb-12 text-center">
          {data.name} has been planted.
        </p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 9.5 }}
        >
          <Link href="/universe/ashfall-kingdoms">
            <Button size="lg" className="h-14 px-8 text-lg rounded-none bg-white text-black hover:bg-white/90 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              Enter {data.name}
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}