import { useState } from "react";
import { FACTIONS, FactionAlignment } from "@/components/factions/data";
import { FactionCard } from "@/components/factions/FactionCard";

export function FactionsDirectoryPage() {
  const [filter, setFilter] = useState<FactionAlignment | "all">("all");

  const filteredFactions = filter === "all" 
    ? FACTIONS 
    : FACTIONS.filter(f => f.alignment === filter);

  const filters: { label: string, value: FactionAlignment | "all", dotColor?: string }[] = [
    { label: "All", value: "all" },
    { label: "Tree Aligned", value: "tree", dotColor: "#6366f1" },
    { label: "Shadow Aligned", value: "shadow", dotColor: "#c026d3" },
    { label: "Dual", value: "dual", dotColor: "#f59e0b" },
    { label: "Unaligned", value: "chaos", dotColor: "#f97316" },
  ];

  return (
    <div className="min-h-screen bg-background pt-32 pb-24" data-testid="factions-directory-page">
      <div className="container mx-auto px-6">
        
        {/* Header Section */}
        <div className="max-w-4xl mb-16">
          <div className="text-xs tracking-widest text-muted-foreground uppercase mb-6">
            THE INTERPRETIVE ORDERS
          </div>
          <h1 className="font-serif text-5xl md:text-7xl text-foreground font-medium mb-6 tracking-wide">
            Schools of Mythology
          </h1>
          <p className="font-serif text-xl md:text-2xl text-muted-foreground italic max-w-3xl leading-relaxed">
            Every mythology develops schools of interpretation. These are the living orders of Inkblot — each with its own philosophy, its own doctrine, its own belief about what stories are for.
          </p>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-primary/30 via-accent/10 to-transparent mb-12" />

        {/* Filter Row */}
        <div className="flex flex-wrap items-center gap-3 mb-16">
          {filters.map(f => {
            const isActive = filter === f.value;
            return (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs tracking-widest uppercase transition-all ${
                  isActive 
                    ? "bg-white/10 border-white/20 text-foreground" 
                    : "bg-transparent border-white/5 text-muted-foreground hover:bg-white/5 hover:text-foreground/80"
                }`}
              >
                {f.dotColor && (
                  <div 
                    className="w-2 h-2 rounded-full" 
                    style={{ 
                      backgroundColor: f.dotColor,
                      opacity: isActive ? 1 : 0.4,
                      boxShadow: isActive ? `0 0 8px ${f.dotColor}` : "none"
                    }} 
                  />
                )}
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Faction Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {filteredFactions.map(faction => (
            <FactionCard key={faction.id} faction={faction} />
          ))}
        </div>

        {/* Bottom Note */}
        <div className="max-w-2xl mx-auto text-center border-t border-border/50 pt-16">
          <p className="font-serif text-muted-foreground/60 italic text-sm leading-relaxed">
            "Inkblot does not endorse any faction's philosophy. These are the ideological movements that have emerged from the living mythology ecosystem."
          </p>
        </div>

      </div>
    </div>
  );
}
