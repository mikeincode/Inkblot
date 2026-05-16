import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { UniverseTree } from "@/components/universe/UniverseTree";
import { NodePanel } from "@/components/universe/NodePanel";
import { TimelineRibbon } from "@/components/universe/TimelineRibbon";
import { RecentNodes } from "@/components/universe/RecentNodes";
import ashfallImg from "@assets/ashfall-kingdoms.png";

export function UniversePage() {
  const [mode, setMode] = useState<"tree" | "shadow">("tree");
  const [selectedNode, setSelectedNode] = useState<any | null>(null);

  const isShadow = mode === "shadow";

  return (
    <div className={`min-h-screen transition-colors duration-1000 ${isShadow ? "bg-[#030106] text-[#e2d5f8]" : "bg-background text-foreground"}`}>
      
      {/* Back Nav */}
      <nav className="absolute top-0 left-0 w-full z-20 p-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
        <Link href="/" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors font-medium text-sm">
          <ArrowLeft className="w-4 h-4" />
          All Universes
        </Link>
      </nav>

      {/* HEADER BANNER */}
      <section className="relative h-[60vh] min-h-[500px] flex items-end pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={ashfallImg} alt="Ashfall Kingdoms" className="w-full h-full object-cover" />
          <div className={`absolute inset-0 transition-colors duration-1000 ${isShadow ? "bg-gradient-to-t from-[#030106] via-[#030106]/80 to-transparent mix-blend-multiply" : "bg-gradient-to-t from-background via-background/60 to-transparent"}`} />
          {isShadow && <div className="absolute inset-0 bg-[#3b0764]/20 mix-blend-overlay transition-opacity duration-1000" />}
        </div>

        <div className="container relative z-10 mx-auto px-6 flex flex-col md:flex-row items-end justify-between gap-8">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-4 drop-shadow-lg"
            >
              Ashfall Kingdoms
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl text-white/80 font-light mb-6"
            >
              An empire of ash and remembered fire.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center gap-4 text-sm text-white/60 font-medium"
            >
              <span>by Solvara Meth</span>
              <span>·</span>
              <span>142 Branches</span>
              <span>·</span>
              <span>89 Contributors</span>
              <span>·</span>
              <span>12 Timelines</span>
              <span>·</span>
              <span className="text-primary/80">Last node: 2m ago</span>
            </motion.div>
          </div>

          {/* TOGGLE */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-end gap-2"
          >
            <div className="flex bg-black/40 backdrop-blur-md border border-white/10 p-1 rounded-full">
              <button 
                onClick={() => setMode("tree")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${!isShadow ? "bg-primary text-white shadow-[0_0_15px_rgba(55,48,163,0.5)]" : "text-white/50 hover:text-white"}`}
              >
                Tree
              </button>
              <button 
                onClick={() => setMode("shadow")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${isShadow ? "bg-[#7e22ce] text-white shadow-[0_0_20px_rgba(126,34,206,0.6)]" : "text-white/50 hover:text-white"}`}
              >
                Shadow
              </button>
            </div>
            <span className="text-xs text-white/40 mr-4 font-light">
              {isShadow ? "Unrestricted creation" : "Canon structure"}
            </span>
          </motion.div>
        </div>
      </section>

      {/* THE LIVING TREE */}
      <section className="relative">
        <UniverseTree mode={mode} onSelectNode={setSelectedNode} />
      </section>

      <NodePanel selectedNode={selectedNode} onClose={() => setSelectedNode(null)} />

      {/* LOWER CONTENT - Hide in Shadow Mode */}
      <AnimatePresence>
        {!isShadow && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <TimelineRibbon />
            <RecentNodes />
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
}
