import { Submission } from "./data";
import { motion } from "framer-motion";

export function SubmissionQueue({
  submissions,
  selectedId,
  onSelect,
}: {
  submissions: Submission[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="w-full md:w-[280px] shrink-0 border-b md:border-b-0 md:border-r border-white/5 bg-[#0a0a0f] flex flex-col h-[30vh] md:h-full overflow-hidden">
      <div className="p-5 border-b border-white/5">
        <h2 className="text-[10px] tracking-[0.2em] text-white/40 mb-1">KEEPER'S QUEUE</h2>
        <div className="text-sm text-indigo-200/70">{submissions.length} submissions awaiting judgment</div>
        <div className="text-xs text-white/30 font-serif italic mt-3">Ashfall Kingdoms</div>
      </div>
      
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-2">
        {submissions.map((sub) => {
          const isSelected = sub.id === selectedId;
          return (
            <button
              key={sub.id}
              onClick={() => onSelect(sub.id)}
              data-testid={`queue-item-${sub.id}`}
              className={`w-full text-left p-4 rounded-md transition-all relative overflow-hidden group ${
                isSelected 
                  ? "bg-white/[0.03] shadow-[inset_1px_0_0_0_rgba(99,102,241,1)]" 
                  : "hover:bg-white/[0.02] shadow-[inset_1px_0_0_0_rgba(255,255,255,0.05)]"
              }`}
            >
              {/* Left glowing line */}
              {isSelected && (
                <motion.div 
                  layoutId="queue-glow"
                  className="absolute left-0 top-0 bottom-0 w-[1px] bg-indigo-500 shadow-[0_0_8px_2px_rgba(99,102,241,0.5)]"
                />
              )}
              
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] tracking-wider uppercase text-white/40 border border-white/10 px-1.5 py-0.5 rounded-sm">
                  {sub.type}
                </span>
                <span className="text-xs text-white/30 ml-auto">{sub.submittedAt}</span>
              </div>
              
              <h3 className={`font-serif text-lg leading-tight mb-2 ${isSelected ? "text-indigo-100" : "text-white/80"} group-hover:text-indigo-100 transition-colors`}>
                {sub.title}
              </h3>
              
              <div className="flex items-center gap-2 text-xs">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${isSelected ? "bg-indigo-900/50 text-indigo-300" : "bg-white/5 text-white/50"}`}>
                  {sub.authorInitial}
                </div>
                <span className="text-white/50">{sub.author}</span>
              </div>
              
              <div className="mt-3 text-[10px] text-white/30 truncate">
                From: {sub.branch}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
