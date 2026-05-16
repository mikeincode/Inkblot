import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import type { UniverseData } from "@/pages/CreateUniversePage";

interface StepEcologyProps {
  data: UniverseData;
  updateData: (updates: Partial<UniverseData>) => void;
}

export function StepEcology({ data, updateData }: StepEcologyProps) {
  const getSummary = () => {
    if (!data.shadowEnabled && !data.freeForks) {
      return "A structured canon ecosystem. Growth is intentional, branches are curated, the Tree governs all.";
    }
    if (data.shadowEnabled && data.freeForks && data.mutationsAllowed && data.shadowCanInfluenceCanon) {
      return "A living, breathing mythology where everything grows, remixes, and influences canon. Chaotic and alive.";
    }
    if (data.shadowEnabled && !data.shadowCanInfluenceCanon) {
      return "A dual world. The Tree remains pure while the Shadow grows wild, forever parallel but never mixing.";
    }
    if (!data.freeForks && data.shadowCanInfluenceCanon) {
      return "A curated reality. The community proposes in the Shadow, but only the worthy ascend to the Tree.";
    }
    return "A balanced ecosystem where creativity flows freely but canon retains its shape.";
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8" data-testid="step-ecology">
      <div className="mb-12">
        <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">Define the ecology.</h2>
        <p className="text-lg text-muted-foreground/80 font-light">
          How does growth happen in this world?
        </p>
      </div>

      <div className="flex flex-col border-y border-border/50 divide-y divide-border/50">
        <div className={`p-6 flex items-center justify-between transition-colors ${data.shadowEnabled ? 'bg-purple-900/5' : ''}`}>
          <div className="flex-1 pr-6">
            <Label htmlFor="shadow" className="text-xl font-serif text-foreground mb-1 block">Shadow Ecosystem</Label>
            <p className="text-sm text-muted-foreground">Does the Shadow exist in this world?</p>
          </div>
          <Switch 
            id="shadow" 
            checked={data.shadowEnabled}
            onCheckedChange={(c) => updateData({ shadowEnabled: c })}
            className={data.shadowEnabled ? 'data-[state=checked]:bg-purple-600' : ''}
          />
        </div>

        <div className={`p-6 flex items-center justify-between transition-colors ${data.freeForks ? 'bg-blue-900/5' : ''}`}>
          <div className="flex-1 pr-6">
            <Label htmlFor="forks" className="text-xl font-serif text-foreground mb-1 block">Free Forking</Label>
            <p className="text-sm text-muted-foreground">Can branches fork without permission?</p>
          </div>
          <Switch 
            id="forks" 
            checked={data.freeForks}
            onCheckedChange={(c) => updateData({ freeForks: c })}
            className={data.freeForks ? 'data-[state=checked]:bg-blue-500' : ''}
          />
        </div>

        <div className={`p-6 flex items-center justify-between transition-colors ${data.mutationsAllowed ? 'bg-green-900/5' : ''}`}>
          <div className="flex-1 pr-6">
            <Label htmlFor="mutations" className="text-xl font-serif text-foreground mb-1 block">Mutation Permissions</Label>
            <p className="text-sm text-muted-foreground">Can contributors remix and mutate existing canon nodes?</p>
          </div>
          <Switch 
            id="mutations" 
            checked={data.mutationsAllowed}
            onCheckedChange={(c) => updateData({ mutationsAllowed: c })}
            className={data.mutationsAllowed ? 'data-[state=checked]:bg-green-500' : ''}
          />
        </div>

        <div className={`p-6 flex items-center justify-between transition-colors ${data.shadowCanInfluenceCanon ? 'bg-amber-900/5' : ''}`}>
          <div className="flex-1 pr-6">
            <Label htmlFor="influence" className="text-xl font-serif text-foreground mb-1 block">Shadow → Canon Influence</Label>
            <p className="text-sm text-muted-foreground">Can Shadow contributions be canonized into the Tree?</p>
          </div>
          <Switch 
            id="influence" 
            checked={data.shadowCanInfluenceCanon}
            onCheckedChange={(c) => updateData({ shadowCanInfluenceCanon: c })}
            className={data.shadowCanInfluenceCanon ? 'data-[state=checked]:bg-amber-500' : ''}
          />
        </div>
      </div>

      <div className="mt-12 p-6 bg-card/30 rounded-lg border border-border/50 text-center">
        <p className="font-serif text-xl text-foreground italic leading-relaxed">
          "{getSummary()}"
        </p>
      </div>
    </div>
  );
}