import { motion } from "framer-motion";
import type { UniverseData } from "@/pages/CreateUniversePage";

interface StepCreationMythProps {
  data: UniverseData;
  updateData: (updates: Partial<UniverseData>) => void;
}

const PROMPTS = [
  "The First Light",
  "Before Time Began",
  "The Primordial Word",
  "The God Who Broke"
];

export function StepCreationMyth({ data, updateData }: StepCreationMythProps) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-12" data-testid="step-creation-myth">
      <div className="flex-1 flex flex-col">
        <div className="mb-10">
          <p className="text-sm font-serif text-muted-foreground mb-2">{data.name}</p>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">Plant the First Root.</h2>
          <p className="text-lg text-muted-foreground/80 font-light">
            This becomes the origin of everything. The first event. The primordial truth.
          </p>
        </div>

        <div className="mb-8 relative group">
          <input
            type="text"
            value={data.rootNodeTitle}
            onChange={(e) => updateData({ rootNodeTitle: e.target.value })}
            placeholder="Name the first event, myth, or truth..."
            className="w-full bg-transparent border-none outline-none font-serif text-3xl text-foreground placeholder:text-muted-foreground/30 focus:ring-0 pb-2"
            style={{ caretColor: "#6366f1" }}
          />
          <div className="absolute bottom-0 left-0 h-[1px] w-full bg-border" />
          <motion.div 
            className="absolute bottom-0 left-0 h-[1px] bg-primary"
            initial={{ width: 0 }}
            animate={{ width: data.rootNodeTitle.length > 0 ? "100%" : 0 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="relative flex-1 min-h-[280px] bg-card/30 rounded-lg p-6 border border-border/50">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')" }} />
          
          <textarea
            value={data.creationMyth}
            onChange={(e) => updateData({ creationMyth: e.target.value })}
            placeholder="Write the creation myth. The origin of this world. The first breath of mythology."
            className="w-full h-full min-h-[240px] bg-transparent border-none outline-none font-serif text-lg text-foreground/90 placeholder:text-muted-foreground/30 focus:ring-0 resize-none relative z-10 leading-relaxed"
            style={{ caretColor: "#6366f1" }}
          />
          <div className="absolute bottom-4 right-6 text-xs font-sans text-muted-foreground">
            {data.creationMyth.trim().split(/\s+/).filter(w => w.length > 0).length} words
          </div>
        </div>
      </div>

      <div className="w-full md:w-64 pt-8 md:pt-32">
        <p className="text-xs tracking-widest text-muted-foreground uppercase mb-4">Inspiration</p>
        <div className="flex flex-col gap-3">
          {PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => updateData({ rootNodeTitle: prompt })}
              className="text-left px-4 py-3 text-sm font-serif text-foreground/70 border border-border/50 rounded hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}