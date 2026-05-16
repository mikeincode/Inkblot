import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, PenTool } from "lucide-react";
import { UniverseTree } from "@/components/universe/UniverseTree";
import { NodePanel } from "@/components/universe/NodePanel";
import { TimelineRibbon } from "@/components/universe/TimelineRibbon";
import { RecentNodes } from "@/components/universe/RecentNodes";
import { RisingShadowBranches } from "@/components/universe/shadow/RisingShadowBranches";
import { UndergroundTimelines } from "@/components/universe/shadow/UndergroundTimelines";
import { MutatingNarratives } from "@/components/universe/shadow/MutatingNarratives";
import { CanonWars } from "@/components/universe/shadow/CanonWars";
import { TrunkNode, BranchNode } from "@/components/universe/types";
import ashfallImg from "@assets/ashfall-kingdoms.png";

export function UniversePage() {
  const [, setLocation] = useLocation();
  const [mode, setMode] = useState<"tree" | "shadow">("tree");
  const [selectedNode, setSelectedNode] = useState<TrunkNode | BranchNode | null>(null);

  const isShadow = mode === "shadow";

  return (
    <div
      className="min-h-screen transition-colors duration-1000 relative"
      style={{
        backgroundColor: isShadow ? "#030106" : "hsl(var(--background))",
        color: isShadow ? "#e9d5ff" : "hsl(var(--foreground))",
      }}
    >
      {/* FAB - Grow a Node */}
      <div className="fixed bottom-8 right-8 z-40">
        <button
          onClick={() => setLocation(`/universe/ashfall-kingdoms/node/new?mode=${mode}`)}
          className={`flex items-center gap-3 px-6 py-4 rounded-full font-serif text-lg tracking-wide transition-all duration-300 hover:scale-105 shadow-xl ${
            isShadow 
              ? "bg-[#3b0764] text-[#fdf4ff] shadow-[0_0_30px_rgba(147,51,234,0.4)] hover:shadow-[0_0_40px_rgba(147,51,234,0.6)] border border-[#c026d3]/50" 
              : "bg-indigo-900 text-indigo-50 shadow-[0_0_30px_rgba(79,70,229,0.4)] hover:shadow-[0_0_40px_rgba(79,70,229,0.6)] border border-indigo-500/50"
          }`}
        >
          <PenTool className="w-5 h-5" />
          {isShadow ? "Release into Shadow" : "Grow a Node"}
        </button>
      </div>

      {/* Back Nav */}
      <nav className="absolute top-0 left-0 w-full z-20 p-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
        <Link
          href="/"
          data-testid="link-back-universes"
          className="flex items-center gap-2 text-white/70 hover:text-white transition-colors font-medium text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          All Universes
        </Link>
        <Link 
          href="/universe/ashfall-kingdoms/review"
          className="text-indigo-300/80 hover:text-indigo-200 transition-colors font-medium text-sm flex items-center gap-2"
        >
          Keeper's Review →
        </Link>
      </nav>

      {/* HEADER BANNER */}
      <section className="relative h-[60vh] min-h-[480px] flex items-end pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={ashfallImg} alt="Ashfall Kingdoms" className="w-full h-full object-cover" />
          <div
            className="absolute inset-0 transition-colors duration-1000"
            style={{
              background: isShadow
                ? "linear-gradient(to top, #030106 0%, rgba(3,1,6,0.75) 50%, transparent 100%)"
                : "linear-gradient(to top, hsl(var(--background)) 0%, hsl(var(--background)/0.6) 50%, transparent 100%)",
            }}
          />
          {isShadow && (
            <div className="absolute inset-0 bg-[#3b0764]/25 mix-blend-multiply transition-opacity duration-1000" />
          )}
        </div>

        <div className="container relative z-10 mx-auto px-6 flex flex-col md:flex-row items-end justify-between gap-8">
          {/* Universe identity */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-3 drop-shadow-lg"
            >
              Ashfall Kingdoms
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-white/75 font-light mb-5"
            >
              An empire of ash and remembered fire.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center gap-3 text-sm text-white/55 font-medium"
            >
              <span>by Solvara Meth</span>
              <span>·</span>
              <span>142 Branches</span>
              <span>·</span>
              <span>89 Contributors</span>
              <span>·</span>
              <span>12 Timelines</span>
              <span>·</span>
              <span className="text-[#818cf8]">Last node: 2m ago</span>
            </motion.div>
          </div>

          {/* TREE / SHADOW TOGGLE */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-end gap-2 shrink-0"
          >
            <div className="flex bg-black/50 backdrop-blur-md border border-white/10 p-1 rounded-full">
              <button
                data-testid="btn-mode-tree"
                onClick={() => setMode("tree")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  !isShadow
                    ? "bg-indigo-700 text-white shadow-[0_0_18px_rgba(99,102,241,0.55)]"
                    : "text-white/45 hover:text-white"
                }`}
              >
                Tree
              </button>
              <button
                data-testid="btn-mode-shadow"
                onClick={() => setMode("shadow")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isShadow
                    ? "bg-[#7e22ce] text-white shadow-[0_0_22px_rgba(126,34,206,0.65)]"
                    : "text-white/45 hover:text-white"
                }`}
              >
                Shadow
              </button>
            </div>
            <span className="text-xs text-white/35 mr-4 font-light tracking-wide">
              {isShadow ? "Unrestricted creation" : "Canon structure"}
            </span>
          </motion.div>
        </div>
      </section>

      {/* SHADOW MODE LABEL */}
      <AnimatePresence>
        {isShadow && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-[#3b0764]/50 bg-[#0d001a]/80 overflow-hidden"
          >
            <div className="container mx-auto px-6 py-4 flex items-center gap-4">
              <div className="w-1.5 h-1.5 rounded-full bg-[#c026d3] shadow-[0_0_8px_#c026d3] animate-pulse" />
              <p className="text-xs text-[#a78bfa]/70 font-light tracking-wide">
                You are viewing the <span className="text-[#c084fc]">Shadow</span> — an unrestricted ecosystem outside canon governance. Branches here have no approval process. Timelines grow without limits.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* THE LIVING TREE */}
      <section className="relative px-4">
        <UniverseTree mode={mode} onSelectNode={setSelectedNode} />
      </section>

      <NodePanel selectedNode={selectedNode} onClose={() => setSelectedNode(null)} />

      {/* TREE MODE — curated canon sections */}
      <AnimatePresence>
        {!isShadow && (
          <motion.div
            key="tree-sections"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <TimelineRibbon />
            <RecentNodes />
          </motion.div>
        )}
      </AnimatePresence>

      {/* SHADOW MODE — the underground ecosystem, revealed layer by layer */}
      <AnimatePresence>
        {isShadow && (
          <motion.div
            key="shadow-sections"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Shadow keeps the canon timeline ribbon but de-emphasised */}
            <div className="opacity-40 pointer-events-none">
              <TimelineRibbon />
            </div>

            {/* Shadow-specific ecosystem layers */}
            <RisingShadowBranches />
            <UndergroundTimelines />
            <MutatingNarratives />
            <CanonWars />

            {/* Shadow footer call to action */}
            <section className="py-24 border-t border-[#3b0764]/30 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[#030106]" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-[#7e22ce]/10 blur-[100px] rounded-full pointer-events-none" />
              <div className="relative z-10 container mx-auto px-6">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="font-serif text-3xl text-[#e9d5ff] italic mb-4"
                >
                  "The Shadow has no canon. Only consensus."
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-[#a78bfa]/60 font-light max-w-md mx-auto text-sm leading-relaxed"
                >
                  Anyone can create here. No approval. No hierarchy. Only the weight of other creators choosing to build upon what you leave behind.
                </motion.p>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
