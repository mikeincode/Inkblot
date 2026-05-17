import { useState } from "react";
import { motion } from "framer-motion";
import { ThreadType, THREAD_TYPE_LABELS, THREAD_TYPE_COLORS } from "./data";
import { Button } from "@/components/ui/button";

interface ThreadComposerProps {
  isInline?: boolean;
  onCancel?: () => void;
  onSubmit?: () => void;
}

export function ThreadComposer({ isInline = false, onCancel, onSubmit }: ThreadComposerProps) {
  const [type, setType] = useState<ThreadType>("canon-debate");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [alignment, setAlignment] = useState<"tree" | "neutral" | "shadow">("neutral");
  const [isComposing, setIsComposing] = useState(isInline ? false : true);

  if (isInline && !isComposing) {
    return (
      <div 
        onClick={() => setIsComposing(true)}
        className="w-full text-center py-4 cursor-pointer hover:bg-white/5 transition-colors"
        data-testid="btn-add-voice"
      >
        <span className="font-serif italic text-muted-foreground hover:text-foreground transition-colors">
          Add your voice...
        </span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`bg-card border border-border/50 shadow-2xl ${isInline ? 'mt-6' : 'mb-8'}`}
    >
      {!isInline && (
        <div className="p-6 border-b border-border/50">
          <div className="flex flex-wrap gap-2 mb-6">
            {(Object.keys(THREAD_TYPE_LABELS) as ThreadType[]).map((t) => {
              const isActive = type === t;
              const color = THREAD_TYPE_COLORS[t];
              return (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`px-3 py-1.5 text-xs font-sans uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                    isActive ? 'bg-white/10 text-foreground' : 'text-muted-foreground hover:bg-white/5'
                  }`}
                  style={isActive ? { boxShadow: `0 0 10px ${color}40`, borderColor: `${color}40`, borderStyle: 'solid', borderWidth: '1px' } : { border: '1px solid transparent' }}
                >
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color, boxShadow: isActive ? `0 0 5px ${color}` : 'none' }} />
                  {THREAD_TYPE_LABELS[t]}
                </button>
              );
            })}
          </div>
          
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title of this entry"
            className="w-full bg-transparent border-none outline-none font-serif text-2xl md:text-3xl text-foreground placeholder:italic placeholder:text-muted-foreground/30 caret-indigo-500 focus:ring-0"
            autoFocus
          />
        </div>
      )}

      <div className="p-6">
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder={isInline ? "Add your voice to this thread..." : "Speak your lore..."}
          className="w-full bg-transparent border-none outline-none font-serif text-lg text-foreground/90 placeholder:italic placeholder:text-muted-foreground/30 resize-none min-h-[150px] caret-indigo-500 focus:ring-0"
          autoFocus={isInline}
        />

        {isInline && (
          <div className="flex items-center gap-2 mb-6 mt-4">
            <span className="text-xs font-sans text-muted-foreground uppercase tracking-wider mr-2">Alignment:</span>
            {[
              { id: 'tree', label: 'Tree', color: 'bg-indigo-500' },
              { id: 'neutral', label: 'Neutral', color: 'bg-gray-500' },
              { id: 'shadow', label: 'Shadow', color: 'bg-violet-500' }
            ].map(a => (
              <button
                key={a.id}
                onClick={() => setAlignment(a.id as any)}
                className={`px-3 py-1 text-xs font-sans uppercase tracking-wider border transition-all flex items-center gap-1.5 ${
                  alignment === a.id ? 'border-border text-foreground bg-white/10' : 'border-transparent text-muted-foreground hover:bg-white/5'
                }`}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${a.color}`} />
                {a.label}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mt-6">
          <div className="text-xs font-sans text-muted-foreground/50">
            {body.split(/\s+/).filter(w => w.length > 0).length} words
          </div>
          <div className="flex gap-3">
            <Button
              variant="ghost"
              onClick={() => {
                if (isInline) setIsComposing(false);
                if (onCancel) onCancel();
              }}
              className="font-sans uppercase tracking-wider text-xs"
            >
              {isInline ? "Withdraw" : "Cancel"}
            </Button>
            <Button
              onClick={() => {
                if (onSubmit) onSubmit();
                if (isInline) {
                  setIsComposing(false);
                  setBody("");
                }
              }}
              className="bg-indigo-900 hover:bg-indigo-800 text-indigo-100 font-sans uppercase tracking-wider text-xs border border-indigo-500/50 rounded-none shadow-[0_0_15px_rgba(79,70,229,0.3)]"
            >
              {isInline ? "Speak" : "Inscribe"}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}