import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { AnimatePresence } from "framer-motion";

import { PENDING_SUBMISSIONS } from "@/components/review/data";
import { SubmissionQueue } from "@/components/review/SubmissionQueue";
import { NodeManuscript } from "@/components/review/NodeManuscript";
import { LineageContext } from "@/components/review/LineageContext";
import { OutcomePanel } from "@/components/review/OutcomePanel";

import { CanonizeAnimation } from "@/components/review/ceremonies/CanonizeAnimation";
import { BranchAnimation } from "@/components/review/ceremonies/BranchAnimation";
import { ShadowAnimation } from "@/components/review/ceremonies/ShadowAnimation";
import { ArchiveAnimation } from "@/components/review/ceremonies/ArchiveAnimation";

type Outcome = "canonize" | "branch" | "shadow" | "archive";

export function CanonReviewPage() {
  const [queue, setQueue] = useState(PENDING_SUBMISSIONS);
  const [selectedId, setSelectedId] = useState(PENDING_SUBMISSIONS[0]?.id);
  const [selectedOutcome, setSelectedOutcome] = useState<Outcome | null>(null);
  const [ceremony, setCeremony] = useState<Outcome | null>(null);

  const selectedSubmission = queue.find(s => s.id === selectedId);

  const handleConfirm = () => {
    if (selectedOutcome) {
      setCeremony(selectedOutcome);
    }
  };

  const handleCeremonyComplete = () => {
    // Remove from queue
    const newQueue = queue.filter(s => s.id !== selectedId);
    setQueue(newQueue);
    if (newQueue.length > 0) {
      setSelectedId(newQueue[0].id);
    } else {
      setSelectedId("");
    }
    setSelectedOutcome(null);
    setCeremony(null);
  };

  return (
    <div className="h-screen w-full flex flex-col bg-[#050508] text-[#f0eee8] overflow-hidden relative">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(to bottom, rgba(5,5,8,1) 0%, rgba(20,20,30,0.3) 50%, rgba(5,5,8,1) 100%)`
      }} />
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 1px, #fff 1px, #fff 2px)`
      }} />

      {/* Header */}
      <header className="h-16 shrink-0 border-b border-white/5 flex items-center justify-between px-6 z-10 bg-[#050508]/80 backdrop-blur-md">
        <Link 
          href="/universe/ashfall-kingdoms"
          className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Ashfall Kingdoms
        </Link>
        <div className="text-xs tracking-[0.3em] uppercase text-white/40">Keeper's Review</div>
        <div className="text-xs text-indigo-300 bg-indigo-900/30 px-3 py-1 rounded-full border border-indigo-500/20">
          {queue.length} Pending
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden relative z-10">
        {queue.length > 0 && selectedSubmission ? (
          <>
            <SubmissionQueue 
              submissions={queue} 
              selectedId={selectedId} 
              onSelect={(id) => {
                setSelectedId(id);
                setSelectedOutcome(null);
              }} 
            />
            <NodeManuscript submission={selectedSubmission} />
            <LineageContext submission={selectedSubmission} selectedOutcome={selectedOutcome} />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h2 className="font-serif text-3xl text-white/50 mb-2">The Queue is Empty</h2>
              <p className="text-white/30 text-sm">No mythological evolutions pending judgment.</p>
            </div>
          </div>
        )}
      </main>

      {/* Outcome Panel */}
      {queue.length > 0 && selectedSubmission && (
        <div className="shrink-0 z-20">
          <OutcomePanel 
            selectedOutcome={selectedOutcome}
            onSelectOutcome={setSelectedOutcome}
            onConfirm={handleConfirm}
          />
        </div>
      )}

      {/* Ceremonies */}
      <AnimatePresence>
        {ceremony === "canonize" && <CanonizeAnimation key="canonize" onComplete={handleCeremonyComplete} />}
        {ceremony === "branch" && <BranchAnimation key="branch" onComplete={handleCeremonyComplete} />}
        {ceremony === "shadow" && <ShadowAnimation key="shadow" onComplete={handleCeremonyComplete} />}
        {ceremony === "archive" && <ArchiveAnimation key="archive" onComplete={handleCeremonyComplete} />}
      </AnimatePresence>
    </div>
  );
}
