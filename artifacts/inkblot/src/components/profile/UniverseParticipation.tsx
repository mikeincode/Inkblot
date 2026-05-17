import { Link } from "wouter";
import { PROFILE_DATA } from "./data";

export function UniverseParticipation() {
  const data = PROFILE_DATA;

  return (
    <div className="flex flex-col gap-6" data-testid="universe-participation">
      <h2 className="font-serif text-3xl text-foreground font-medium mb-2">Worlds Inhabited</h2>
      
      <div className="flex flex-col gap-4">
        {data.universes.map((uni) => (
          <Link key={uni.id} href={`/universe/${uni.id}`}>
            <div 
              className="group relative bg-card border border-border p-6 transition-all duration-300 hover:-translate-y-[2px] cursor-pointer overflow-hidden"
              style={{ borderLeftColor: uni.color, borderLeftWidth: '3px' }}
            >
              {/* Subtle hover glow */}
              <div 
                className="absolute left-0 top-0 bottom-0 w-32 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at left, ${uni.color}, transparent)` }}
              />
              
              <div className="relative z-10 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-2xl text-foreground group-hover:text-white transition-colors">{uni.name}</h3>
                  <div 
                    className="px-2 py-0.5 border text-[10px] uppercase tracking-widest"
                    style={{ borderColor: `${uni.color}40`, color: uni.color }}
                  >
                    {uni.role}
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex flex-col gap-1">
                    <span className="text-lg font-serif text-foreground/90 leading-none">{uni.nodesContributed}</span>
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Nodes</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-lg font-serif text-primary leading-none drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]">{uni.canonizedNodes}</span>
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Canonized</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-lg font-serif text-accent leading-none">{uni.branchesSeeded}</span>
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Branches</span>
                  </div>
                </div>

                <span className="text-xs font-sans text-muted-foreground/60 mt-1">
                  Active {uni.lastActive}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}