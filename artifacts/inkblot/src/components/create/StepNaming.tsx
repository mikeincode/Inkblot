import { motion, AnimatePresence } from "framer-motion";
import type { UniverseData } from "@/pages/CreateUniversePage";

interface StepNamingProps {
  data: UniverseData;
  updateData: (updates: Partial<UniverseData>) => void;
}

export function StepNaming({ data, updateData }: StepNamingProps) {
  return (
    <div className="relative w-full h-full min-h-[60vh] flex flex-col justify-center px-4 md:px-12" data-testid="step-naming">
      {/* Background ambient particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: "110%" 
            }}
            animate={{ 
              y: "-10%",
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 10 + Math.random() * 20, 
              repeat: Infinity, 
              delay: Math.random() * 20,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-3xl w-full">
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-6"
        >
          BEGIN HERE
        </motion.p>

        <div className="relative group mb-12">
          <input
            type="text"
            value={data.name}
            onChange={(e) => updateData({ name: e.target.value })}
            placeholder="What is this world called?"
            className="w-full bg-transparent border-none outline-none font-serif text-4xl md:text-6xl text-foreground placeholder:text-muted-foreground/30 focus:ring-0"
            style={{ caretColor: "#6366f1" }}
            autoFocus
          />
          <div className="absolute bottom-0 left-0 h-[1px] w-full bg-border" />
          <motion.div 
            className="absolute bottom-0 left-0 h-[1px] bg-primary"
            initial={{ width: 0 }}
            animate={{ width: data.name.length > 0 ? "100%" : 0 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <AnimatePresence>
          {data.name.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="relative group"
            >
              <input
                type="text"
                value={data.tagline}
                onChange={(e) => updateData({ tagline: e.target.value })}
                placeholder="A single sentence. The soul of this world."
                className="w-full bg-transparent border-none outline-none font-serif text-2xl text-foreground/80 placeholder:text-muted-foreground/30 focus:ring-0"
                style={{ caretColor: "#6366f1" }}
              />
              <div className="absolute bottom-0 left-0 h-[1px] w-full bg-border/50" />
              <motion.div 
                className="absolute bottom-0 left-0 h-[1px] bg-primary/50"
                initial={{ width: 0 }}
                animate={{ width: data.tagline.length > 0 ? "100%" : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Abstract tree preview */}
      <motion.div 
        className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-[80vh] pointer-events-none blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: Math.min(0.12, 0.04 + data.name.length * 0.01) }}
      >
        <svg viewBox="0 0 100 200" className="w-full h-full stroke-primary fill-none stroke-[0.5]">
          <path d="M50 200 Q50 150 50 100" />
          <path d="M50 100 Q40 80 20 60" />
          <path d="M50 100 Q60 70 80 50" />
        </svg>
      </motion.div>
    </div>
  );
}