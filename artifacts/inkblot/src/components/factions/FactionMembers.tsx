import { FactionData } from "./data";

interface FactionMembersProps {
  faction: FactionData;
}

export function FactionMembers({ faction }: FactionMembersProps) {
  // Members are pre-sorted by resonance in data.ts, but let's ensure it.
  const sortedMembers = [...faction.members].sort((a, b) => b.resonance - a.resonance);

  return (
    <div className="flex flex-col" data-testid="faction-members">
      <div className="text-xs tracking-widest text-muted-foreground uppercase mb-8">
        THE ORDER
      </div>

      <div className="space-y-3 mb-10">
        {sortedMembers.map((member, i) => (
          <div 
            key={member.username} 
            className="flex items-center justify-between p-4 bg-card/30 border border-white/5 relative overflow-hidden group hover:bg-card/60 transition-colors"
          >
            <div 
              className="absolute left-0 top-0 bottom-0 w-0.5 opacity-60"
              style={{ backgroundColor: faction.primaryColor }}
            />
            
            <div className="flex flex-col gap-1 pl-3">
              <div className="flex items-center gap-3">
                <span className="font-serif text-lg text-foreground group-hover:text-white transition-colors">{member.displayName}</span>
                <span className="text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-full bg-white/5 text-muted-foreground border border-white/10">
                  {member.role}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>@{member.username}</span>
                <span className="opacity-30">•</span>
                <span className="opacity-70">Joined {member.joinedCycle}</span>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <span 
                className="font-serif text-xl"
                style={{ color: faction.primaryColor, textShadow: `0 0 10px ${faction.primaryColor}40` }}
              >
                {member.resonance.toLocaleString()}
              </span>
              <span className="text-[10px] tracking-widest uppercase text-muted-foreground/60">
                resonance
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-6 border-t border-border/50 text-center">
        <div className="font-serif text-3xl mb-2 text-foreground">
          {faction.totalResonance.toLocaleString()} total resonance
        </div>
        <div className="text-sm italic font-serif text-muted-foreground">
          Combined interpretive weight of the order.
        </div>
      </div>
    </div>
  );
}
