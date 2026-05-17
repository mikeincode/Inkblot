import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FactionData } from "./data";

interface FactionInfluenceProps {
  faction: FactionData;
}

export function FactionInfluence({ faction }: FactionInfluenceProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const totalBranches = faction.influence.length;
  const uniqueUniverses = new Set(faction.influence.map(i => i.universeId)).size;

  return (
    <div className="flex flex-col h-full" data-testid="faction-influence" ref={ref}>
      <div className="text-xs tracking-widest text-muted-foreground uppercase mb-8">
        INFLUENCE ACROSS THE NETWORK
      </div>

      <div className="space-y-8 mb-12">
        {faction.influence.map((entry, i) => (
          <div key={i} className="flex flex-col">
            <div className="flex justify-between items-baseline mb-2">
              <div className="flex flex-col">
                <span className="font-serif text-lg text-foreground">{entry.universeName}</span>
                <span className="font-serif text-sm italic text-muted-foreground">{entry.branchName}</span>
              </div>
              <span className="font-serif text-foreground/80">{entry.influenceScore}%</span>
            </div>
            
            <div className="h-1.5 w-full bg-muted overflow-hidden rounded-full mb-3">
              <motion.div 
                className="h-full rounded-full"
                style={{ backgroundColor: faction.primaryColor, boxShadow: `0 0 8px ${faction.primaryColor}80` }}
                initial={{ width: 0 }}
                animate={isInView ? { width: `${entry.influenceScore}%` } : { width: 0 }}
                transition={{ duration: 1.5, delay: i * 0.2, ease: "easeOut" }}
              />
            </div>
            
            <div className="flex justify-between text-xs text-muted-foreground/60 tracking-wide">
              <span>{entry.canonizedNodes} canonized nodes</span>
              <span>{entry.activeMembers} active members</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-6 border-t border-border/50 text-center">
        <p className="font-serif text-muted-foreground italic text-lg leading-relaxed">
          This order holds significant influence in {totalBranches} active branches across {uniqueUniverses} universes.
        </p>
      </div>
    </div>
  );
}
