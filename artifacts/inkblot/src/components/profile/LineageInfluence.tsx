import { PROFILE_DATA } from "./data";

export function LineageInfluence() {
  const { stats } = PROFILE_DATA;
  const depthLevels = 9;

  return (
    <div className="flex flex-col gap-6" data-testid="lineage-influence">
      <h2 className="font-serif text-3xl text-foreground font-medium mb-2">Lineage Depth</h2>
      
      <div className="bg-card border border-border p-8 flex flex-col gap-10">
        
        {/* Depth Meter */}
        <div className="flex items-center gap-6">
          <div className="relative flex flex-col items-center justify-between h-64 py-2">
            <div className="absolute top-0 bottom-0 w-px bg-border left-1/2 -translate-x-1/2" />
            
            {Array.from({ length: depthLevels }).map((_, i) => {
              const active = i < stats.lineageDepth;
              return (
                <div key={i} className="relative z-10 flex items-center justify-center bg-card w-4 h-4">
                  <div 
                    className={`w-2 h-2 rounded-full transition-all duration-500 ${
                      active 
                        ? "bg-primary shadow-[0_0_8px_rgba(99,102,241,0.8)]" 
                        : "border border-muted-foreground/30 bg-transparent"
                    }`}
                  />
                </div>
              );
            })}
          </div>
          
          <div className="flex flex-col justify-between h-64 py-1 text-xs text-muted-foreground tracking-widest uppercase">
            <span>Generation I</span>
            <span>Generation V</span>
            <span className="text-primary font-medium">Generation IX</span>
          </div>
        </div>

        {/* Stats Rows */}
        <div className="flex flex-col gap-5 border-t border-border pt-8">
          <div className="flex items-end justify-between border-b border-border/50 pb-2">
            <span className="font-serif text-lg text-muted-foreground">Nodes spawning branches</span>
            <span className="font-serif text-2xl text-accent">{stats.branchesSprouted}</span>
          </div>
          <div className="flex items-end justify-between border-b border-border/50 pb-2">
            <span className="font-serif text-lg text-muted-foreground">Deepest chain</span>
            <span className="font-serif text-2xl text-primary">{stats.lineageDepth} gen</span>
          </div>
          <div className="flex items-end justify-between border-b border-border/50 pb-2">
            <span className="font-serif text-lg text-muted-foreground">Influence radius</span>
            <span className="font-serif text-2xl text-foreground">143 souls</span>
          </div>
        </div>

        {/* Quote */}
        <div className="mt-2">
          <p className="font-serif italic text-muted-foreground/60 text-center leading-relaxed">
            "The truest measure of a mythmaker is not how much they wrote — but how much grew from what they planted."
          </p>
        </div>
      </div>
    </div>
  );
}