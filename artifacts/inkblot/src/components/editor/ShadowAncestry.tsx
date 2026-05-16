import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TRUNK_NODES, SHADOW_BRANCHES } from "@/components/universe/data";
import { Switch } from "@/components/ui/switch";

interface ShadowAncestryProps {
  mode: "tree" | "shadow";
  branchId: string;
  remixOriginParam: string | null;
}

export function ShadowAncestry({ mode, branchId, remixOriginParam }: ShadowAncestryProps) {
  const [selectedRemix, setSelectedRemix] = useState<string>(remixOriginParam || "");
  const [publishImmediately, setPublishImmediately] = useState(true);

  if (mode !== "shadow") return null;

  const branchData = SHADOW_BRANCHES.find(b => b.id === branchId);
  const selectedNodeData = TRUNK_NODES.find(t => t.id === selectedRemix);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10, height: 0 }}
        animate={{ opacity: 1, y: 0, height: "auto" }}
        exit={{ opacity: 0, y: 10, height: 0 }}
        className="w-full space-y-6 bg-[#1a0b2e]/30 border border-[#3b0764]/50 p-6 rounded-md mt-6"
      >
        <h3 className="text-sm uppercase tracking-widest text-[#d8b4fe] mb-2 font-sans flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#c026d3] animate-pulse" />
          Shadow Ancestry
        </h3>

        {/* Remix Origin */}
        <div>
          <label className="text-xs text-white/50 block mb-2 font-sans">Is this Node remixing an existing canon Node?</label>
          <select
            data-testid="select-remix"
            value={selectedRemix}
            onChange={(e) => setSelectedRemix(e.target.value)}
            className="w-full bg-black/50 border border-white/10 text-white/80 p-2 rounded-sm text-sm focus:border-[#c026d3] focus:outline-none transition-colors"
          >
            <option value="">No, this is an original Shadow node</option>
            {TRUNK_NODES.map(node => (
              <option key={node.id} value={node.id}>{node.label}</option>
            ))}
          </select>
        </div>

        {/* Mutation Chain Visual */}
        {selectedRemix && selectedNodeData && (
          <div className="bg-black/40 p-4 rounded-sm border border-fuchsia-900/30">
            <div className="text-xs text-fuchsia-400 mb-3">This node mutates: {selectedNodeData.label}</div>
            <div className="flex items-center gap-2 text-sm text-white/60">
              <span className="font-serif">{selectedNodeData.label}</span>
              <span className="text-[#c026d3] text-lg leading-none">→</span>
              <span className="font-serif text-[#e9d5ff] drop-shadow-[0_0_5px_#c026d3]">This Mutation</span>
            </div>
          </div>
        )}

        {/* Fork Lineage Fake State */}
        {remixOriginParam === "s3" && (
          <div className="bg-black/40 p-4 rounded-sm border border-fuchsia-900/30">
            <div className="text-xs text-fuchsia-400 mb-3">Ancestry</div>
            <div className="flex items-center gap-2 text-sm text-white/60 text-xs">
              <span>The Second Burning</span>
              <span className="text-[#c026d3]">→</span>
              <span>Cinder Punk</span>
              <span className="text-[#c026d3]">→</span>
              <span className="text-[#e9d5ff]">Your Node</span>
            </div>
          </div>
        )}

        {/* Publish Immediately Toggle */}
        <div className="flex items-start justify-between border-t border-white/5 pt-4">
          <div>
            <div className="text-sm text-white/90">Release immediately into the Shadow</div>
            <div className="text-xs text-white/40 mt-1">Shadow nodes become visible to all contributors the moment they are created.</div>
          </div>
          <Switch
            checked={publishImmediately}
            onCheckedChange={setPublishImmediately}
            className="data-[state=checked]:bg-[#c026d3]"
          />
        </div>

        {/* Velocity */}
        {branchData && (
          <div className="border-t border-white/5 pt-4 flex items-center justify-between text-xs">
            <span className="text-white/50">Community Velocity</span>
            <span className="text-[#d8b4fe] flex items-center gap-1">
              {branchData.nodes} nodes <span className="opacity-50">·</span> {branchData.strength}
            </span>
          </div>
        )}

      </motion.div>
    </AnimatePresence>
  );
}
