import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function CanonizeAnimation({ onComplete }: { onComplete: () => void }) {
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
      <div className="relative w-64 h-96 flex justify-center mb-12">
        {/* Trunk line */}
        <motion.div 
          className="absolute bottom-0 w-1 bg-indigo-900/50 rounded-full"
          initial={{ height: "100%" }}
          animate={{ backgroundColor: phase === "result" ? "rgba(99,102,241,0.8)" : "rgba(49,46,129,0.5)" }}
          transition={{ duration: 1 }}
        />
        
        <AnimatePresence>
          {phase === "animating" && (
            <motion.div 
              className="absolute w-6 h-6 rounded-full bg-indigo-400 shadow-[0_0_30px_10px_rgba(99,102,241,0.6)]"
              initial={{ bottom: "10%" }}
              animate={{ bottom: "90%" }}
              exit={{ opacity: 0, scale: 2 }}
              transition={{ duration: 2, ease: "circIn" }}
            />
          )}
        </AnimatePresence>

        {phase === "result" && (
          <motion.div 
            className="absolute top-[10%] w-8 h-8 rounded-full bg-white shadow-[0_0_40px_20px_rgba(99,102,241,0.8)]"
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
            <h2 className="font-serif text-4xl text-indigo-100 mb-4">The Node has entered the Canon.</h2>
            <p className="text-indigo-300/70 text-lg mb-8">Ashfall Kingdoms has grown.</p>
            <button 
              onClick={onComplete}
              className="px-6 py-2 rounded-full border border-indigo-500/30 text-indigo-300 hover:bg-indigo-900/30 transition-colors"
            >
              Return to Queue
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
