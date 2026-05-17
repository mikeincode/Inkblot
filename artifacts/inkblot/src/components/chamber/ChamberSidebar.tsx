import { Link } from "wouter";
import { BranchData } from "./data";
import { motion } from "framer-motion";

interface ChamberSidebarProps {
  data: BranchData;
}

export function ChamberSidebar({ data }: ChamberSidebarProps) {
  return (
    <div className="flex flex-col gap-10">
      {/* Branch Quote */}
      <section>
        <blockquote className="font-serif italic text-2xl text-muted-foreground/80 leading-relaxed border-l-[3px] border-border/50 pl-6 py-2">
          "Every branch believes it is the true trunk."
        </blockquote>
      </section>

      {/* Governance */}
      <section>
        <div className="bg-black/30 border border-border/50 p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 blur-[40px] pointer-events-none" />
          <h3 className="text-[10px] uppercase tracking-[0.2em] font-sans text-muted-foreground mb-3">
            Governance
          </h3>
          <div className="font-serif text-xl text-foreground mb-2">{data.governance}</div>
          <p className="font-sans text-sm text-muted-foreground/70 leading-relaxed">
            New nodes require Keeper approval before being sealed to the canon. Shadow proposals must gather significant resonance to challenge existing truths.
          </p>
        </div>
      </section>

      {/* Factions */}
      <section>
        <h3 className="text-[10px] uppercase tracking-[0.2em] font-sans text-muted-foreground mb-4">
          Factions of This Chamber
        </h3>
        <div className="flex flex-col gap-3">
          {data.factions.map((faction, i) => {
            const isTree = faction.alignment === "tree";
            const color = isTree ? "indigo" : "violet";
            const borderColor = isTree ? "border-indigo-500/50" : "border-violet-500/50";
            const textColor = isTree ? "text-indigo-400" : "text-violet-400";
            
            return (
              <motion.div
                key={faction.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`bg-card/50 border border-border/30 border-l-2 ${borderColor} p-4 flex flex-col gap-1 transition-all duration-300 hover:-translate-y-px hover:bg-card hover:shadow-lg group cursor-default`}
              >
                <div className="flex justify-between items-start">
                  <div className="font-serif text-foreground group-hover:text-white transition-colors">
                    {faction.name}
                  </div>
                  <span className={`text-[9px] uppercase tracking-widest font-sans ${textColor} bg-${color}-500/10 px-1.5 py-0.5`}>
                    {faction.alignment}
                  </span>
                </div>
                <div className="text-xs font-sans text-muted-foreground">
                  {faction.memberCount} members
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Adjacent Realities */}
      <section>
        <h3 className="text-[10px] uppercase tracking-[0.2em] font-sans text-muted-foreground mb-6">
          Adjacent Realities
        </h3>
        <div className="relative pl-3">
          <div className="absolute left-[3.5px] top-2 bottom-2 w-px bg-border/50" />
          
          <div className="flex flex-col gap-5 relative z-10">
            {/* Current branch in tree */}
            <div className="flex items-center gap-4 relative">
              <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_#6366f1]" />
              <div>
                <div className="font-serif text-foreground leading-none mb-1">{data.branchName}</div>
                <div className="text-[10px] uppercase tracking-wider text-indigo-400 font-sans">Current (Depth {data.branchDepth})</div>
              </div>
            </div>

            {data.relatedBranches.map((branch, i) => (
              <div key={branch.id} className="flex items-center gap-4 relative group">
                <div className="w-2 h-2 rounded-full bg-border group-hover:bg-muted-foreground transition-colors" />
                <div>
                  <Link href={`/universe/${data.universeId}/branch/${branch.id}/chamber`} className="font-serif text-muted-foreground group-hover:text-foreground transition-colors leading-none block mb-1">
                    {branch.name}
                  </Link>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground/50 font-sans">Depth {branch.depth}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}