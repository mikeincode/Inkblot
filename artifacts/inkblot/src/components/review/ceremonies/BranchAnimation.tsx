import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function BranchAnimation({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"animating" | "result">("animating");

  useEffect(() => {
    const t = setTimeout(() => setPhase("result"), 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-[#050508]/95 backdrop-blur-sm flex flex-col items-center justify-center"
    >
      <div className="relative w-64 h-64 flex justify-center items-end mb-12">
        {/* Trunk line */}
        <div className="absolute left-1/2 bottom-0 w-1 h-full bg-indigo-900/50 -translate-x-1/2" />
        
        {/* Branch drawing */}
        <svg className="absolute w-full h-full" viewBox="0 0 100 100" overflow="visible">
          <motion.path 
            d="M50 80 Q 50 50, 90 20"
            fill="none"
            stroke="#2dd4bf"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </svg>

        {phase === "result" && (
          <motion.div 
            className="absolute top-[20%] right-[10%] w-6 h-6 -mt-3 -mr-3 rounded-full bg-teal-400 shadow-[0_0_30px_10px_rgba(45,212,191,0.6)]"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
          />
        )}
      </div>

      <AnimatePresence>
        {phase === "result" && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="font-serif text-4xl text-teal-100 mb-4">A new Branch has taken root.</h2>
            <p className="text-teal-300/70 text-lg mb-8">The world tree has diverged.</p>
            <button 
              onClick={onComplete}
              className="px-6 py-2 rounded-full border border-teal-500/30 text-teal-300 hover:bg-teal-900/30 transition-colors"
            >
              Return to Queue
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
