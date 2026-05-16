import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function ShadowAnimation({ onComplete }: { onComplete: () => void }) {
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
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
    >
      <motion.div 
        className="absolute inset-0 bg-[#050508]"
        animate={{ backgroundColor: phase === "animating" ? "#1e1b4b" : "#050508" }}
        transition={{ duration: 3 }}
      />
      
      <div className="relative w-64 h-64 flex items-center justify-center mb-12 z-10">
        <AnimatePresence>
          {phase === "animating" && (
            <motion.div
              className="absolute w-12 h-12 rounded-full bg-purple-500 shadow-[0_0_40px_rgba(168,85,247,0.8)]"
              initial={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              animate={{ scale: 5, opacity: 0, filter: "blur(20px)" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.5, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {phase === "result" && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center z-10"
          >
            <h2 className="font-serif text-4xl text-purple-100 mb-4">The Node has dissolved into the Shadow.</h2>
            <p className="text-purple-300/70 text-lg mb-8">The community will shape what it becomes.</p>
            <button 
              onClick={onComplete}
              className="px-6 py-2 rounded-full border border-purple-500/30 text-purple-300 hover:bg-purple-900/30 transition-colors"
            >
              Return to Queue
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
