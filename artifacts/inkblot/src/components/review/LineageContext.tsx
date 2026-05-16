import { Submission } from "./data";
import { BRANCHES, TRUNK_NODES } from "../universe/data";
import { AnimatePresence, motion } from "framer-motion";

export function LineageContext({ 
  submission,
  selectedOutcome 
}: { 
  submission: Submission;
  selectedOutcome: string | null;
}) {
  const branch = BRANCHES.find(b => b.id === submission.branch);
  const trunkNode = TRUNK_NODES.find(t => t.id === submission.trunkAnchor);

  return (
    <div className="w-full md:w-[320px] shrink-0 border-t md:border-t-0 md:border-l border-white/5 bg-[#07070a] p-6 overflow-y-auto h-full space-y-10">
      
      {/* Origin Path */}
      <section>
        <h3 className="text-[10px] tracking-[0.2em] text-white/40 mb-4">ORIGIN PATH</h3>
        <div className="relative pl-3 space-y-6">
          <div className="absolute left-[15px] top-2 bottom-2 w-px bg-white/10" />
          
          <div className="relative flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)] z-10 ring-4 ring-[#07070a]" />
            <div className="text-sm text-white/80">{trunkNode?.label || submission.trunkAnchor}</div>
          </div>
          
          <div className="relative flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-blue-500/50 z-10 ring-4 ring-[#07070a]" />
            <div className="text-sm text-white/70">{branch?.label || submission.branch}</div>
          </div>
          
          <div className="relative flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-white/20 z-10 ring-4 ring-[#07070a]" />
            <div className="text-sm text-white/60">{submission.timeline}</div>
          </div>
          
          <div className="relative flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full z-10 ring-4 ring-[#07070a] ${
              submission.shadowInfluence ? "bg-[#c026d3] shadow-[0_0_10px_rgba(192,38,211,0.6)]" : "bg-white shadow-[0_0_10px_rgba(255,255,255,0.4)]"
            }`} />
            <div className={`text-sm font-medium ${submission.shadowInfluence ? "text-[#e879f9]" : "text-white"}`}>
              {submission.title}
            </div>
          </div>
        </div>
      </section>

      {/* Branch Context */}
      <section>
        <h3 className="text-[10px] tracking-[0.2em] text-white/40 mb-4">BRANCH CONTEXT</h3>
        <div className="bg-white/5 rounded-lg p-4 border border-white/5">
          <div className="flex justify-between items-start mb-2">
            <div className="font-serif text-lg text-white/90">{branch?.label || submission.branch}</div>
            {branch?.strength && (
              <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-white/60">
                {branch.strength}
              </span>
            )}
          </div>
          <div className="text-xs text-white/50 mb-3 flex gap-3">
            <span>{branch?.nodes || 0} nodes</span>
            <span>{branch?.contributors || 0} authors</span>
          </div>
          {branch?.summary && (
            <p className="text-sm text-white/60 leading-relaxed">
              {branch.summary}
            </p>
          )}
        </div>
      </section>

      {/* Shadow Influence */}
      {submission.shadowInfluence && (
        <section>
          <h3 className="text-[10px] tracking-[0.2em] text-[#c026d3]/60 mb-4">SHADOW INFLUENCE</h3>
          <div className="bg-[#3b0764]/20 border border-[#c026d3]/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#c026d3] animate-pulse" />
              <div className="text-sm text-[#e879f9]">Shadow Ancestry Detected</div>
            </div>
            {submission.mutationAncestry && (
              <div className="text-xs text-[#d8b4fe] italic mb-3">
                Origins traced to: {submission.mutationAncestry}
              </div>
            )}
            <p className="text-xs text-[#a78bfa]/80 leading-relaxed">
              Canonizing may introduce Shadow narrative threads into the Trunk.
            </p>
          </div>
        </section>
      )}

      {/* Impact Preview */}
      <section>
        <h3 className="text-[10px] tracking-[0.2em] text-white/40 mb-4">TIMELINE IMPACT</h3>
        <div className="min-h-[100px] flex items-center">
          <AnimatePresence mode="wait">
            {!selectedOutcome ? (
              <motion.div
                key="none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm text-white/30 italic font-serif"
              >
                Select an outcome below to preview its impact on the universe lineage.
              </motion.div>
            ) : selectedOutcome === "canonize" ? (
              <motion.div
                key="canonize"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-sm text-indigo-200 leading-relaxed"
              >
                This Node will become <strong className="text-indigo-400">trunk node t7</strong>, extending the canon officially beyond {trunkNode?.label}.
              </motion.div>
            ) : selectedOutcome === "branch" ? (
              <motion.div
                key="branch"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-sm text-blue-200 leading-relaxed"
              >
                This Node will spawn a <strong className="text-blue-400">new Branch</strong> diverging from {trunkNode?.label}.
              </motion.div>
            ) : selectedOutcome === "shadow" ? (
              <motion.div
                key="shadow"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-sm text-purple-200 leading-relaxed"
              >
                This Node will <strong className="text-purple-400">dissolve into the Shadow</strong> and become available for community evolution.
              </motion.div>
            ) : selectedOutcome === "archive" ? (
              <motion.div
                key="archive"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-sm text-gray-300 leading-relaxed"
              >
                This Node will be <strong className="text-gray-400">preserved in the dormant archives</strong>. It may be surfaced by future Keepers.
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </section>

    </div>
  );
}
