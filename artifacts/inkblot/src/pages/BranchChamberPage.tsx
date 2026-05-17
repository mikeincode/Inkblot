import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChamberHeader } from "@/components/chamber/ChamberHeader";
import { ChamberSidebar } from "@/components/chamber/ChamberSidebar";
import { DiscussionThread } from "@/components/chamber/DiscussionThread";
import { ThreadComposer } from "@/components/chamber/ThreadComposer";
import { BRANCH_DATA, ThreadType, THREAD_TYPE_LABELS, THREAD_TYPE_COLORS } from "@/components/chamber/data";
import { Button } from "@/components/ui/button";

export function BranchChamberPage() {
  const [activeFilter, setActiveFilter] = useState<ThreadType | "all">("all");
  const [composing, setComposing] = useState(false);
  const [expandedThread, setExpandedThread] = useState<string | null>(null);

  const filteredThreads = BRANCH_DATA.threads.filter(t => 
    activeFilter === "all" || t.type === activeFilter
  );

  return (
    <div className="min-h-[100dvh] bg-background text-foreground flex flex-col">
      <ChamberHeader data={BRANCH_DATA} />

      <main className="flex-1 container mx-auto px-6 py-10 md:py-16">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Main Thread Area */}
          <div className="w-full lg:w-[65%] flex flex-col">
            
            {/* Action & Filter Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-border/30">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setActiveFilter("all")}
                  className={`px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] font-sans transition-all duration-300 ${
                    activeFilter === "all" 
                      ? "bg-white/10 text-white" 
                      : "text-muted-foreground hover:bg-white/5"
                  }`}
                >
                  All Threads
                </button>
                
                {(Object.keys(THREAD_TYPE_LABELS) as ThreadType[]).map((type) => {
                  const isActive = activeFilter === type;
                  const color = THREAD_TYPE_COLORS[type];
                  return (
                    <button
                      key={type}
                      onClick={() => setActiveFilter(type)}
                      className={`px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] font-sans transition-all duration-300 flex items-center gap-2 ${
                        isActive ? "bg-white/10 text-white" : "text-muted-foreground hover:bg-white/5"
                      }`}
                    >
                      <div 
                        className="w-1.5 h-1.5 rounded-full" 
                        style={{ 
                          backgroundColor: isActive ? color : `${color}60`,
                          boxShadow: isActive ? `0 0 6px ${color}` : 'none' 
                        }} 
                      />
                      {THREAD_TYPE_LABELS[type]}
                    </button>
                  );
                })}
              </div>

              <Button
                onClick={() => setComposing(true)}
                className="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 rounded-none tracking-widest uppercase text-xs h-9 shrink-0 shadow-[0_0_15px_rgba(99,102,241,0.1)]"
                data-testid="btn-inscribe"
              >
                Inscribe a Thread
              </Button>
            </div>

            {/* Composer */}
            <AnimatePresence>
              {composing && (
                <ThreadComposer 
                  onCancel={() => setComposing(false)}
                  onSubmit={() => setComposing(false)}
                />
              )}
            </AnimatePresence>

            {/* Threads List */}
            <div className="flex flex-col gap-6">
              <AnimatePresence mode="popLayout">
                {filteredThreads.map((thread) => (
                  <DiscussionThread
                    key={thread.id}
                    thread={thread}
                    isExpanded={expandedThread === thread.id}
                    onToggle={() => setExpandedThread(expandedThread === thread.id ? null : thread.id)}
                  />
                ))}
              </AnimatePresence>
              
              {filteredThreads.length === 0 && (
                <div className="text-center py-20 font-serif italic text-muted-foreground/60 border border-dashed border-border/50">
                  No records found in the archives for this classification.
                </div>
              )}
            </div>

          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-[35%] lg:sticky lg:top-10">
            <ChamberSidebar data={BRANCH_DATA} />
          </div>

        </div>
      </main>
    </div>
  );
}