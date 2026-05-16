import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function ArchiveAnimation({ onComplete }: { onComplete: () => void }) {
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
      className="fixed inset-0 z-50 bg-[#050508]/95 backdrop-blur-md flex flex-col items-center justify-center"
    >
      <div className="relative w-64 h-96 flex justify-center mb-12">
        <AnimatePresence>
          {phase === "animating" && (
            <motion.div 
              className="absolute w-8 h-8 rounded-full border-2 border-gray-400 bg-gray-800"
              initial={{ top: "10%", opacity: 1 }}
              animate={{ top: "80%", opacity: 0.2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.5, ease: "easeIn" }}
            />
          )}
        </AnimatePresence>

        <motion.div 
          className="absolute bottom-[10%] w-16 h-4 border-b-2 border-x-2 border-gray-600 rounded-b-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === "result" ? 1 : 0.5 }}
        />
        
        {phase === "result" && (
          <motion.div 
            className="absolute bottom-[10%] w-16 h-2 bg-gray-600 top-0 left-0"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.5 }}
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
            <h2 className="font-serif text-4xl text-gray-300 mb-4">The Node has been archived.</h2>
            <p className="text-gray-500 text-lg mb-8">It rests in the vaults of forgotten mythology.</p>
            <button 
              onClick={onComplete}
              className="px-6 py-2 rounded-full border border-gray-600 text-gray-400 hover:bg-gray-800 transition-colors"
            >
              Return to Queue
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
