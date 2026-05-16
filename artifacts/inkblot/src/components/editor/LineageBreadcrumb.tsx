import { BRANCHES, SHADOW_BRANCHES } from "@/components/universe/data";
import { BranchNode } from "@/components/universe/types";

interface LineageBreadcrumbProps {
  mode: "tree" | "shadow";
  selectedBranchId: string;
  onBranchChange: (branchId: string) => void;
  selectedTimeline: string;
  onTimelineChange: (timeline: string) => void;
}

const TIMELINE_OPTIONS: Record<string, string[]> = {
  b1: ["Beneath the Old Keep", "The Vault Keepers"],
  b2: ["Ashur's Memory", "The Remnant Cult"],
  b3: ["The Cold Years", "After the Failure"],
  b4: ["Cinder Campaign I", "Cinder Campaign II", "The Final Siege"],
  b5: ["Under the Mountain", "The Hidden Court"],
  b6: ["Before the Crown", "The Price Paid"],
  b7: ["The First Sight", "Prophecy's End"],
  s1: ["The Walking God Arc", "Mortal Disguises", "The God's War"],
  s2: ["The Erased Bloodlines", "The Fifth Throne"],
  s3: ["Steam Age I", "The Worker Uprising", "Cinder City Chronicles"],
  s4: ["The Endless War", "No Peace Possible"],
  s5: ["The Heir's Journey", "A Throne Denied"],
  s6: ["The Second Creation", "Two Gods, One Cinder"],
  s7: ["The Voting Wars", "Democratic Collapse"],
  s8: ["The Frozen Continent", "After the Ice"],
  s9: ["The Betrayal Court", "The Burning Queen's Path"],
  s10: ["The Unnamed Campaigns", "Before History Began"],
};

export function LineageBreadcrumb({
  mode,
  selectedBranchId,
  onBranchChange,
  selectedTimeline,
  onTimelineChange,
}: LineageBreadcrumbProps) {
  const branches = mode === "tree" ? BRANCHES : SHADOW_BRANCHES;
  const isShadow = mode === "shadow";
  const timelines = TIMELINE_OPTIONS[selectedBranchId] || [];

  const glowColor = isShadow ? "shadow-[0_0_12px_#c026d3]" : "shadow-[0_0_12px_#6366f1]";
  const lineColor = isShadow ? "stroke-purple-900/50" : "stroke-indigo-900/50";
  const dotColor = isShadow ? "bg-purple-500" : "bg-indigo-500";
  const newNodeDot = isShadow ? "bg-fuchsia-500 shadow-[0_0_15px_#c026d3]" : "bg-blue-400 shadow-[0_0_15px_#60a5fa]";

  return (
    <div className="relative flex items-center w-full max-w-3xl mx-auto py-8">
      {/* Background connecting line */}
      <svg className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-10 pointer-events-none" preserveAspectRatio="none">
        <path d="M 40,20 C 100,20 150,20 200,20 C 250,20 300,20 350,20 C 400,20 450,20 500,20" className={lineColor} strokeWidth="1" fill="none" strokeDasharray="4 4" />
      </svg>

      <div className="flex w-full justify-between items-start relative z-10">
        
        {/* Step 1: Universe */}
        <div className="flex flex-col items-center gap-2 group cursor-pointer w-24">
          <div className={`w-3 h-3 rounded-full ${dotColor} ${glowColor}`} />
          <span className="text-xs font-serif text-white/50 group-hover:text-white/80 transition-colors text-center">
            Ashfall Kingdoms
          </span>
        </div>

        {/* Step 2: Branch */}
        <div className="flex flex-col items-center gap-2 w-32">
          <div className={`w-3 h-3 rounded-full ${dotColor} ${glowColor}`} />
          <select
            data-testid="select-branch"
            value={selectedBranchId}
            onChange={(e) => onBranchChange(e.target.value)}
            className="appearance-none bg-transparent text-xs font-serif text-white/70 hover:text-white border-b border-white/10 hover:border-white/30 pb-1 focus:outline-none text-center cursor-pointer w-full"
          >
            {branches.map((b) => (
              <option key={b.id} value={b.id} className="bg-black text-white">
                {b.label}
              </option>
            ))}
          </select>
        </div>

        {/* Step 3: Timeline */}
        <div className="flex flex-col items-center gap-2 w-36">
          <div className={`w-3 h-3 rounded-full ${dotColor} ${glowColor}`} />
          <select
            data-testid="select-timeline"
            value={selectedTimeline}
            onChange={(e) => onTimelineChange(e.target.value)}
            className="appearance-none bg-transparent text-xs font-serif text-white/70 hover:text-white border-b border-white/10 hover:border-white/30 pb-1 focus:outline-none text-center cursor-pointer w-full"
          >
            <option value="" disabled className="bg-black text-white/50">Select Timeline</option>
            {timelines.map((t) => (
              <option key={t} value={t} className="bg-black text-white">
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Step 4: New Node */}
        <div className="flex flex-col items-center gap-2 w-24">
          <div className={`w-4 h-4 rounded-full ${newNodeDot} animate-pulse`} />
          <span className={`text-xs font-serif font-medium ${isShadow ? "text-fuchsia-300" : "text-blue-300"} text-center`}>
            New Node
          </span>
        </div>

      </div>
    </div>
  );
}
