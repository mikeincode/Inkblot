import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { LineageBreadcrumb } from "@/components/editor/LineageBreadcrumb";
import { NodeTypeSelector } from "@/components/editor/NodeTypeSelector";
import { ShadowAncestry } from "@/components/editor/ShadowAncestry";
import { SubmitFlow } from "@/components/editor/SubmitFlow";
import { BRANCHES, SHADOW_BRANCHES } from "@/components/universe/data";

const PLACEHOLDER_MAP: Record<string, string> = {
  character: "Describe who this being is, what they want, what they fear...",
  lore: "Write the truth of this world as if a chronicler remembers it...",
  "world-event": "Describe the moment the world changed...",
  myth: "Tell the story as it is told around fires, in whispers...",
  mutation: "What does this remix change? What remains? What is inverted?",
  "shadow-rumor": "What do people say, even if no one can prove it?",
};

export function NodeEditorPage() {
  const [, setLocation] = useLocation();
  const [mode, setMode] = useState<"tree" | "shadow">("tree");
  const [branch, setBranch] = useState<string>("b1");
  const [timeline, setTimeline] = useState<string>("");
  const [remixParam, setRemixParam] = useState<string | null>(null);
  
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [nodeType, setNodeType] = useState("lore");
  const [contributorNote, setContributorNote] = useState("");

  const isShadow = mode === "shadow";

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const m = searchParams.get("mode");
    if (m === "shadow") setMode("shadow");
    
    const b = searchParams.get("branch");
    if (b) setBranch(b);
    else if (m === "shadow") setBranch("s1");
    else setBranch("b1");

    const r = searchParams.get("remix");
    if (r) setRemixParam(r);
  }, []);

  const handleBranchChange = (newBranch: string) => {
    setBranch(newBranch);
    setTimeline("");
  };

  const getBranchLabel = () => {
    const list = isShadow ? SHADOW_BRANCHES : BRANCHES;
    return list.find(b => b.id === branch)?.label || "Unknown Branch";
  };

  const handleModeToggle = (newMode: "tree" | "shadow") => {
    setMode(newMode);
    setBranch(newMode === "shadow" ? "s1" : "b1");
    setTimeline("");
    if (newMode === "tree" && (nodeType === "mutation" || nodeType === "shadow-rumor")) {
      setNodeType("lore");
    }
  };

  const wordCount = body.trim().split(/\s+/).filter(w => w.length > 0).length;
  const placeholder = PLACEHOLDER_MAP[nodeType] || "Write the mythology...";

  return (
    <div 
      className="min-h-screen transition-colors duration-1000 overflow-x-hidden"
      style={{
        backgroundColor: isShadow ? "#030106" : "hsl(var(--background))",
        color: isShadow ? "#e9d5ff" : "hsl(var(--foreground))",
      }}
    >
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.2 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      {/* AMBIENT HEADER */}
      <header className="relative w-full z-10 pt-8 pb-12 px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex flex-col">
            <Link
              href="/universe/ashfall-kingdoms"
              className="text-xs text-white/50 hover:text-white/80 transition-colors mb-4 inline-flex items-center gap-2"
            >
              ← Ashfall Kingdoms
            </Link>
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-serif mb-2">
              Ashfall Kingdoms
            </span>
            <h1 className="font-serif text-3xl md:text-5xl text-white">
              {isShadow ? "Release a Node into the Shadow." : "Plant a Node into the Canon."}
            </h1>
            <p className="text-sm font-light text-white/50 mt-2">
              {isShadow 
                ? "What you write here grows freely. No approval. No limits." 
                : "What you write here enters the official mythology, pending canonization."}
            </p>
          </div>

          <div className="flex bg-black/50 backdrop-blur-md border border-white/10 p-1 rounded-full shrink-0">
            <button
              onClick={() => handleModeToggle("tree")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                !isShadow
                  ? "bg-indigo-700 text-white shadow-[0_0_18px_rgba(99,102,241,0.55)]"
                  : "text-white/45 hover:text-white"
              }`}
            >
              Tree
            </button>
            <button
              onClick={() => handleModeToggle("shadow")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                isShadow
                  ? "bg-[#7e22ce] text-white shadow-[0_0_22px_rgba(126,34,206,0.65)]"
                  : "text-white/45 hover:text-white"
              }`}
            >
              Shadow
            </button>
          </div>
        </div>
      </header>

      {/* LINEAGE BREADCRUMB */}
      <div className="border-b border-white/5 bg-black/20 hidden md:block">
        <LineageBreadcrumb 
          mode={mode}
          selectedBranchId={branch}
          onBranchChange={handleBranchChange}
          selectedTimeline={timeline}
          onTimelineChange={setTimeline}
        />
      </div>
      
      {/* Mobile abbreviated lineage */}
      <div className="md:hidden py-4 px-6 border-b border-white/5 flex items-center justify-center gap-2 text-sm text-white/50">
        <span>{getBranchLabel()}</span>
        <span className={isShadow ? "text-[#c026d3]" : "text-indigo-400"}>→</span>
        <span className={isShadow ? "text-fuchsia-300" : "text-blue-300"}>New Node</span>
      </div>

      {/* THE WRITING SURFACE */}
      <main className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Left Column: Writing Area */}
          <div className="w-full lg:w-[60%] flex flex-col">
            <div className="relative mb-8">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Name this piece of mythology..."
                className={`w-full bg-transparent border-none text-4xl md:text-5xl font-serif text-white placeholder:text-white/20 focus:outline-none focus:ring-0 caret-${isShadow ? "[#c026d3]" : "indigo-400"}`}
                style={{ caretColor: isShadow ? "#c026d3" : "#818cf8" }}
              />
              <div className={`absolute bottom-[-12px] left-0 w-full h-[1px] ${isShadow ? "bg-[#c026d3]/30 shadow-[0_0_8px_#c026d3]" : "bg-indigo-400/30 shadow-[0_0_8px_#818cf8]"}`} />
            </div>

            <div className="relative flex-grow">
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder={placeholder}
                className="w-full min-h-[320px] bg-transparent border-none text-lg md:text-xl font-light text-white/90 placeholder:text-white/20 focus:outline-none focus:ring-0 resize-y leading-relaxed"
                style={{ caretColor: isShadow ? "#c026d3" : "#818cf8" }}
              />
              <div className="absolute bottom-2 right-2 text-xs font-mono text-white/30">
                {wordCount} words
              </div>
            </div>

            <div className="hidden lg:block mt-8">
              <SubmitFlow mode={mode} title={title} onSubmitComplete={() => setLocation("/universe/ashfall-kingdoms")} />
            </div>
          </div>

          {/* Right Column: Context Panel */}
          <div className="w-full lg:w-[40%] flex flex-col gap-10 border-t lg:border-t-0 lg:border-l border-white/5 pt-10 lg:pt-0 lg:pl-10">
            
            {/* Lineage Summary */}
            <div>
              <h3 className="text-sm uppercase tracking-widest text-white/40 mb-3 font-sans">Lineage</h3>
              <div className="flex flex-col gap-2 text-sm text-white/60 bg-black/30 p-4 rounded-sm border border-white/5">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20" /> Ashfall Kingdoms
                </div>
                <div className="flex items-center gap-2 pl-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20" /> {getBranchLabel()}
                </div>
                <div className="flex items-center gap-2 pl-8">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20" /> {timeline || "Unassigned Timeline"}
                </div>
              </div>
            </div>

            <NodeTypeSelector 
              mode={mode}
              selectedType={nodeType}
              onSelect={setNodeType}
            />

            <ShadowAncestry 
              mode={mode}
              branchId={branch}
              remixOriginParam={remixParam}
            />

            <div>
              <h3 className="text-sm uppercase tracking-widest text-white/40 mb-3 font-sans">Contributor Note</h3>
              <textarea
                value={contributorNote}
                onChange={(e) => setContributorNote(e.target.value)}
                placeholder="Leave a note for collaborators about your intentions..."
                className="w-full h-24 bg-black/30 border border-white/10 text-white/80 p-3 text-sm focus:border-white/30 focus:outline-none rounded-sm resize-none"
              />
            </div>

            <div className="lg:hidden mt-8 mb-12">
              <SubmitFlow mode={mode} title={title} onSubmitComplete={() => setLocation("/universe/ashfall-kingdoms")} />
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
