import { motion, AnimatePresence } from "framer-motion";
import { ThreadEntry, THREAD_TYPE_COLORS, THREAD_TYPE_LABELS } from "./data";
import { ThreadComposer } from "./ThreadComposer";

interface DiscussionThreadProps {
  thread: ThreadEntry;
  isExpanded: boolean;
  onToggle: () => void;
}

export function DiscussionThread({ thread, isExpanded, onToggle }: DiscussionThreadProps) {
  const accentColor = THREAD_TYPE_COLORS[thread.type];

  return (
    <motion.div
      layout
      className="relative bg-card border border-border/50 group cursor-pointer overflow-hidden transition-all duration-300"
      whileHover={{ y: -2 }}
      onClick={!isExpanded ? onToggle : undefined}
      data-testid={`thread-${thread.id}`}
    >
      {/* Accent Bar */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 group-hover:w-1.5"
        style={{ backgroundColor: accentColor, boxShadow: `0 0 15px ${accentColor}` }}
      />
      
      {/* Ambient Glow on Hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `linear-gradient(90deg, ${accentColor}10 0%, transparent 100%)` }}
      />

      <div className="p-6 pl-10 relative z-10">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            <span 
              className="text-[10px] uppercase tracking-[0.15em] font-sans px-2 py-0.5 rounded-none border"
              style={{ color: accentColor, borderColor: `${accentColor}40`, backgroundColor: `${accentColor}10` }}
            >
              {THREAD_TYPE_LABELS[thread.type]}
            </span>
          </div>
          {thread.isPinned && (
            <span className="text-[10px] uppercase tracking-[0.2em] font-sans text-indigo-400">
              Sealed to Canon
            </span>
          )}
        </div>

        <h3 className="font-serif text-2xl text-foreground mb-3 leading-snug pr-8">
          {thread.title}
        </h3>

        {!isExpanded && (
          <p className="font-serif italic text-muted-foreground/60 text-sm mb-6 line-clamp-2">
            {thread.body.substring(0, 120)}...
          </p>
        )}

        {/* Collapsed Bottom Row */}
        <div className="flex items-center gap-4 text-xs font-sans text-muted-foreground flex-wrap">
          <div className="flex items-center gap-2 bg-black/40 px-2 py-1 rounded-sm border border-border/50">
            <span className="text-foreground">{thread.author}</span>
            <span className="text-border px-1">·</span>
            <span className="text-indigo-300/70 italic font-serif">{thread.authorRole}</span>
          </div>
          
          <div className={`flex items-center gap-1.5 ${thread.resonance > 50 ? 'text-amber-400' : ''}`}>
            <span className={`font-serif text-sm ${thread.resonance > 50 ? 'drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]' : ''}`}>
              {thread.resonance}
            </span>
            <span className="text-[10px] uppercase tracking-wider">Resonance</span>
          </div>
          
          <div className="flex items-center gap-1.5">
            <span className="font-serif text-sm">{thread.replies.length}</span>
            <span className="text-[10px] uppercase tracking-wider">Voices</span>
          </div>

          <div className="ml-auto opacity-60">
            {thread.timestamp}
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-border/50 bg-black/20"
          >
            <div className="p-6 pl-10 cursor-default">
              <button 
                onClick={(e) => { e.stopPropagation(); onToggle(); }}
                className="absolute top-6 right-6 text-muted-foreground hover:text-foreground text-sm font-sans tracking-wider uppercase z-20"
              >
                Close ×
              </button>

              <div className="font-serif text-lg text-foreground/90 leading-relaxed mb-8 max-w-3xl whitespace-pre-wrap">
                {thread.body}
              </div>

              <div className="w-full h-px bg-border/40 mb-8" />

              <div className="space-y-6 mb-8 max-w-3xl">
                {thread.replies.map((reply, i) => (
                  <motion.div
                    key={reply.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex gap-4 group/reply"
                  >
                    <div 
                      className="w-1 rounded-full shrink-0" 
                      style={{ 
                        backgroundColor: reply.alignment === 'tree' ? '#6366f1' : reply.alignment === 'shadow' ? '#c026d3' : '#4b5563' 
                      }} 
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-sans text-sm text-foreground">{reply.author}</span>
                        <span className="font-serif italic text-xs text-muted-foreground">{reply.authorRole}</span>
                        <span className="text-xs text-muted-foreground/40 ml-2">{reply.timestamp}</span>
                      </div>
                      <div className="font-serif text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">
                        {reply.body}
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {thread.replies.length === 0 && (
                  <div className="text-center py-6 font-serif italic text-muted-foreground/50">
                    No voices have echoed this yet.
                  </div>
                )}
              </div>

              {thread.isSealed ? (
                <div className="w-full py-3 bg-amber-900/20 border border-amber-500/20 text-center font-sans text-xs uppercase tracking-[0.2em] text-amber-500/70">
                  Sealed by Keeper — No Further Voices
                </div>
              ) : (
                <ThreadComposer isInline />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}