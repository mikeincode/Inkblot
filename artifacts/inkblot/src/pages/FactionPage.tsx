import { useParams } from "wouter";
import { FACTIONS } from "@/components/factions/data";
import { FactionBanner } from "@/components/factions/FactionBanner";
import { FactionManifesto } from "@/components/factions/FactionManifesto";
import { FactionInfluence } from "@/components/factions/FactionInfluence";
import { FactionMembers } from "@/components/factions/FactionMembers";
import { Button } from "@/components/ui/button";

export function FactionPage() {
  const { id } = useParams<{ id: string }>();
  const faction = FACTIONS.find(f => f.id === id);

  if (!faction) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground font-serif text-2xl">
        Order not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" data-testid={`faction-page-${faction.id}`}>
      <FactionBanner faction={faction} />
      
      <FactionManifesto faction={faction} />

      <section className="py-24 border-b border-border/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <FactionInfluence faction={faction} />
            <FactionMembers faction={faction} />
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section className="py-32 relative overflow-hidden flex items-center justify-center text-center">
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${faction.primaryColor} 0%, transparent 70%)`
          }}
        />
        
        <div className="container relative z-10 px-6 max-w-2xl">
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
            Declare Your Alignment.
          </h2>
          <p className="font-serif italic text-muted-foreground text-lg md:text-xl mb-12">
            Joining an Order is a declaration of interpretive philosophy, not social affiliation. Your contributions will be marked with this faction's alignment.
          </p>
          
          <Button 
            size="lg"
            className="h-14 px-8 mb-6 font-serif text-lg tracking-wide rounded-none hover:-translate-y-1 transition-transform"
            style={{ 
              backgroundColor: `${faction.primaryColor}30`,
              color: faction.primaryColor,
              border: `1px solid ${faction.primaryColor}60`,
              textShadow: `0 0 10px ${faction.primaryColor}40`,
              boxShadow: `0 0 20px ${faction.primaryColor}15 inset`
            }}
          >
            Pledge to {faction.name}
          </Button>
          
          <p className="text-xs text-muted-foreground/60 tracking-wide font-sans">
            You may hold allegiance to multiple Orders across different branches.
          </p>
        </div>
      </section>
    </div>
  );
}
