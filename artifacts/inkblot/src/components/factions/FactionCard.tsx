import { Link } from "wouter";
import { 
  FactionData, 
  ALIGNMENT_COLORS, 
  ALIGNMENT_LABELS, 
  CANON_STANCE_LABELS, 
  MUTATION_STANCE_LABELS 
} from "./data";
import { Card, CardContent } from "@/components/ui/card";

interface FactionCardProps {
  faction: FactionData;
}

export function FactionCard({ faction }: FactionCardProps) {
  return (
    <Link href={`/factions/${faction.id}`}>
      <Card 
        className="group min-h-[380px] h-full flex flex-col cursor-pointer border-border transition-all duration-500 hover:-translate-y-1 relative overflow-hidden"
        data-testid={`faction-card-${faction.id}`}
        style={{
          background: `radial-gradient(150% 100% at 50% 100%, ${faction.primaryColor}08 0%, hsl(var(--card)) 100%)`
        }}
      >
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background: `radial-gradient(100% 80% at 50% 100%, ${faction.primaryColor}15 0%, transparent 100%)`
          }}
        />
        
        <CardContent className="flex flex-col h-full p-8 relative z-10">
          <div className="flex justify-center mb-8 relative">
            <div 
              className="absolute inset-0 rounded-full opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
              style={{ backgroundColor: faction.primaryColor }}
            />
            <svg 
              viewBox="0 0 100 100" 
              className="w-20 h-20 relative z-10 transition-all duration-500"
              style={{ filter: `drop-shadow(0 0 4px ${faction.primaryColor}40)` }}
            >
              <circle cx="50" cy="50" r="48" fill="none" stroke={faction.primaryColor} strokeWidth="1" strokeDasharray="2 4" opacity="0.2" className="group-hover:opacity-40 transition-opacity duration-500" />
              <path 
                d={faction.sigil} 
                fill="none" 
                stroke={faction.sigilColor} 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
            </svg>
          </div>

          <h3 className="font-serif text-2xl md:text-3xl text-foreground text-center mb-2 tracking-wide group-hover:text-white transition-colors">
            {faction.name}
          </h3>
          <p className="font-serif italic text-muted-foreground text-center text-sm mb-6">
            {faction.tagline}
          </p>

          <div 
            className="w-full h-px mb-6 opacity-30 group-hover:opacity-60 transition-opacity" 
            style={{ backgroundColor: faction.primaryColor }} 
          />

          <div className="flex flex-col items-center gap-4 flex-grow">
            <div className="flex items-center gap-2 border border-white/5 rounded-full px-3 py-1 bg-white/5">
              <div 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: ALIGNMENT_COLORS[faction.alignment] }} 
              />
              <span className="text-xs text-muted-foreground">
                {ALIGNMENT_LABELS[faction.alignment]}
              </span>
            </div>
            
            <div className="text-[10px] tracking-widest uppercase text-muted-foreground/60 text-center">
              {CANON_STANCE_LABELS[faction.canonStance]} · {MUTATION_STANCE_LABELS[faction.mutationStance]}
            </div>
          </div>

          <div className="mt-8 mb-6 flex justify-between items-end border-t border-white/5 pt-4">
            <div className="flex flex-col">
              <span className="font-serif text-foreground">{faction.memberCount} members</span>
            </div>
            <div className="flex flex-col text-right">
              <span 
                className="font-serif"
                style={{ color: faction.primaryColor, textShadow: `0 0 10px ${faction.primaryColor}40` }}
              >
                {faction.totalResonance.toLocaleString()} resonance
              </span>
            </div>
          </div>

          <div 
            className="text-xs tracking-widest uppercase text-center mt-auto transition-colors"
            style={{ color: faction.primaryColor }}
          >
            Enter the Order &rarr;
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
