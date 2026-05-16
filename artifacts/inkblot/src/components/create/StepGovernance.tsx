import { motion } from "framer-motion";
import type { UniverseData } from "@/pages/CreateUniversePage";

interface StepGovernanceProps {
  data: UniverseData;
  updateData: (updates: Partial<UniverseData>) => void;
}

const GOVERNANCE_ARCHETYPES = [
  {
    id: "closed",
    name: "Closed Tree",
    philosophy: "Only the Keeper controls canon. All evolution passes through a single gatekeeper.",
    implication: "The world evolves slowly and deliberately. Every node is intentional.",
    visual: <path d="M30 80 L30 20" strokeWidth="3" />,
    color: "#6366f1",
  },
  {
    id: "curated",
    name: "Curated Tree",
    philosophy: "Community submissions require canonization review. The Keeper shapes canon collaboratively.",
    implication: "The world grows through collective contribution, refined by editorial judgment.",
    visual: <><path d="M30 80 L30 20" strokeWidth="3" /><path d="M30 50 Q45 40 50 25" strokeWidth="2" /><path d="M30 60 Q15 50 10 35" strokeWidth="2" /></>,
    color: "#60a5fa",
  },
  {
    id: "open",
    name: "Open Tree",
    philosophy: "Trusted contributors collaboratively evolve canon without central approval.",
    implication: "The world grows rapidly. Trusted voices share authorship.",
    visual: <><path d="M30 80 L30 40" strokeWidth="3" /><path d="M30 50 Q45 40 50 15" strokeWidth="2" /><path d="M30 60 Q15 45 10 20" strokeWidth="2" /><path d="M30 40 Q40 25 30 10" strokeWidth="2" /></>,
    color: "#34d399",
  },
  {
    id: "wild",
    name: "Wild Shadow",
    philosophy: "Minimal canon governance. Community-driven evolution. The Shadow is the primary ecosystem.",
    implication: "The world is chaotic and alive. Canon is fluid. Everything forks.",
    visual: <><path d="M30 80 L30 50" strokeWidth="3" /><path d="M30 60 Q50 50 60 20" strokeWidth="1" /><path d="M30 70 Q10 50 5 25" strokeWidth="1" /><path d="M30 50 Q40 20 20 5" strokeWidth="1" /><path d="M30 55 Q20 30 40 10" strokeWidth="1" /><path d="M15 40 Q25 20 10 5" strokeWidth="1" /></>,
    color: "#c026d3",
  },
  {
    id: "dual",
    name: "Dual Ecology",
    philosophy: "Structured Tree with active Shadow ecosystem interplay. Two parallel systems co-exist.",
    implication: "The world has both governed canon and unrestricted evolution. Most complex, most alive.",
    visual: <><path d="M30 80 L30 20" strokeWidth="3" stroke="#f59e0b" /><path d="M30 50 Q45 40 50 25" strokeWidth="2" stroke="#f59e0b" /><path d="M30 80 Q15 90 10 105" strokeWidth="1" stroke="#c026d3" /><path d="M30 80 Q45 95 50 110" strokeWidth="1" stroke="#c026d3" /></>,
    color: "#f59e0b",
  },
];

export function StepGovernance({ data, updateData }: StepGovernanceProps) {
  const handleSelect = (id: string) => {
    let shadowEnabled = true;
    let freeForks = true;
    let mutationsAllowed = true;
    let shadowCanInfluenceCanon = false;

    if (id === "closed") {
      shadowEnabled = false; freeForks = false; mutationsAllowed = false;
    } else if (id === "curated") {
      shadowEnabled = true; freeForks = false; mutationsAllowed = false; shadowCanInfluenceCanon = true;
    } else if (id === "open") {
      shadowEnabled = true; freeForks = true; mutationsAllowed = true; shadowCanInfluenceCanon = false;
    } else if (id === "wild") {
      shadowEnabled = true; freeForks = true; mutationsAllowed = true; shadowCanInfluenceCanon = false;
    } else if (id === "dual") {
      shadowEnabled = true; freeForks = true; mutationsAllowed = true; shadowCanInfluenceCanon = true;
    }

    updateData({ 
      governance: id,
      shadowEnabled,
      freeForks,
      mutationsAllowed,
      shadowCanInfluenceCanon
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8" data-testid="step-governance">
      <div className="mb-12">
        <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">How will this world be governed?</h2>
        <p className="text-lg text-muted-foreground/80 font-light">
          Choose the philosophy that shapes how mythology evolves here.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {GOVERNANCE_ARCHETYPES.map((arch) => {
          const isSelected = data.governance === arch.id;
          return (
            <motion.button
              key={arch.id}
              onClick={() => handleSelect(arch.id)}
              whileHover={{ y: -2 }}
              className={`relative text-left p-6 rounded-lg border transition-all duration-300 overflow-hidden flex items-center gap-6
                ${isSelected ? 'bg-card/80 border-transparent shadow-lg' : 'bg-card/30 border-border/50 hover:border-border'}
              `}
              style={{
                boxShadow: isSelected ? `0 0 20px -5px ${arch.color}40, inset 4px 0 0 ${arch.color}` : `inset 0 0 0 transparent`,
              }}
            >
              {isSelected && (
                <div 
                  className="absolute inset-0 opacity-10 pointer-events-none" 
                  style={{ background: `radial-gradient(circle at left, ${arch.color}, transparent 60%)` }}
                />
              )}
              
              <div className="flex-1 relative z-10">
                <h3 className="text-2xl font-serif text-foreground mb-2">{arch.name}</h3>
                <p className="text-foreground/80 mb-2 font-sans text-sm">{arch.philosophy}</p>
                <p className="text-muted-foreground italic font-serif text-sm">{arch.implication}</p>
              </div>

              <div className="w-16 h-20 opacity-60 flex-shrink-0 relative z-10 hidden sm:block">
                <svg viewBox="0 0 60 120" className="w-full h-full fill-none" style={{ stroke: isSelected ? arch.color : 'currentColor' }}>
                  {arch.visual}
                </svg>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}