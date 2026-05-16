import { motion, AnimatePresence } from "framer-motion";

type Outcome = "canonize" | "branch" | "shadow" | "archive";

export function OutcomePanel({
  selectedOutcome,
  onSelectOutcome,
  onConfirm
}: {
  selectedOutcome: Outcome | null;
  onSelectOutcome: (outcome: Outcome) => void;
  onConfirm: () => void;
}) {
  
  const outcomes = [
    {
      id: "canonize" as const,
      title: "Canonize",
      description: "Merge this Node into the Trunk. It becomes official canon.",
      color: "indigo",
      borderClass: "border-indigo-500/50 hover:border-indigo-400",
      bgClass: "bg-indigo-950/20 hover:bg-indigo-900/30",
      textClass: "text-indigo-400",
      activeBorderClass: "border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.3)]",
      activeBgClass: "bg-indigo-900/40",
      Icon: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
          <motion.path 
            d="M12 20V4" 
            initial={{ pathLength: 0 }} 
            animate={{ pathLength: 1 }} 
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
          <circle cx="12" cy="4" r="2" fill="currentColor" />
          <circle cx="12" cy="20" r="2" />
        </svg>
      )
    },
    {
      id: "branch" as const,
      title: "Seed as Branch",
      description: "This Node becomes a new divergence point — a Branch growing outward.",
      color: "teal",
      borderClass: "border-teal-500/50 hover:border-teal-400",
      bgClass: "bg-teal-950/20 hover:bg-teal-900/30",
      textClass: "text-teal-400",
      activeBorderClass: "border-teal-500 shadow-[0_0_20px_rgba(20,184,166,0.3)]",
      activeBgClass: "bg-teal-900/40",
      Icon: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
          <path d="M12 20V12" />
          <motion.path 
            d="M12 12C12 8 18 8 18 4" 
            initial={{ pathLength: 0 }} 
            animate={{ pathLength: 1 }} 
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
          <circle cx="12" cy="20" r="2" />
          <circle cx="18" cy="4" r="2" fill="currentColor" />
        </svg>
      )
    },
    {
      id: "shadow" as const,
      title: "Return to Shadow",
      description: "Release this Node into the Shadow ecosystem. The community evolves it.",
      color: "purple",
      borderClass: "border-purple-500/50 hover:border-purple-400",
      bgClass: "bg-purple-950/20 hover:bg-purple-900/30",
      textClass: "text-purple-400",
      activeBorderClass: "border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.3)]",
      activeBgClass: "bg-purple-900/40",
      Icon: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
          <circle cx="12" cy="4" r="2" fill="currentColor" />
          <motion.path 
            d="M12 6L12 12 M12 16L12 18 M8 14L10 12 M16 14L14 12" 
            initial={{ opacity: 1 }} 
            animate={{ opacity: 0.3 }} 
            transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
          />
        </svg>
      )
    },
    {
      id: "archive" as const,
      title: "Archive",
      description: "Preserve this Node in the dormant archives. Neither canon nor living.",
      color: "gray",
      borderClass: "border-gray-600/50 hover:border-gray-500",
      bgClass: "bg-gray-900/20 hover:bg-gray-800/30",
      textClass: "text-gray-400",
      activeBorderClass: "border-gray-500 shadow-[0_0_15px_rgba(156,163,175,0.2)]",
      activeBgClass: "bg-gray-800/40",
      Icon: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
          <motion.circle 
            cx="12" cy="12" r="8" 
            initial={{ strokeDasharray: "4 4" }}
            whileHover={{ strokeDasharray: "12 0" }}
          />
          <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.5" />
        </svg>
      )
    }
  ];

  return (
    <div className="bg-[#050508] border-t border-white/10 p-6 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-5xl">
        <h3 className="text-center text-[10px] tracking-[0.3em] text-white/30 mb-6 uppercase">
          Determine the Node's Fate
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {outcomes.map((outcome) => {
            const isActive = selectedOutcome === outcome.id;
            const isDimmed = selectedOutcome && !isActive;
            
            return (
              <button
                key={outcome.id}
                onClick={() => onSelectOutcome(outcome.id)}
                data-testid={`outcome-${outcome.id}`}
                className={`flex flex-col items-center text-center p-6 rounded-xl border transition-all duration-300 relative overflow-hidden group ${
                  isActive ? outcome.activeBorderClass : outcome.borderClass
                } ${
                  isActive ? outcome.activeBgClass : outcome.bgClass
                } ${
                  isDimmed ? "opacity-40 grayscale-[50%]" : "opacity-100"
                }`}
              >
                <div className={`mb-4 ${isActive ? outcome.textClass : "text-white/60 group-hover:" + outcome.textClass} transition-colors`}>
                  <outcome.Icon />
                </div>
                <h4 className={`font-serif text-xl mb-2 ${isActive ? outcome.textClass : "text-white/90"}`}>
                  {outcome.title}
                </h4>
                <p className="text-xs text-white/50 leading-relaxed">
                  {outcome.description}
                </p>
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {selectedOutcome && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: 20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: 20 }}
              className="flex justify-center"
            >
              <button
                onClick={onConfirm}
                data-testid="confirm-outcome"
                className={`px-12 py-4 rounded-full font-serif text-xl tracking-wide shadow-xl transition-all hover:scale-105 ${
                  selectedOutcome === "canonize" ? "bg-indigo-600 text-white hover:bg-indigo-500 shadow-indigo-500/20" :
                  selectedOutcome === "branch" ? "bg-teal-600 text-white hover:bg-teal-500 shadow-teal-500/20" :
                  selectedOutcome === "shadow" ? "bg-purple-600 text-white hover:bg-purple-500 shadow-purple-500/20" :
                  "bg-gray-700 text-white hover:bg-gray-600 shadow-gray-500/20"
                }`}
              >
                Confirm {outcomes.find(o => o.id === selectedOutcome)?.title}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
