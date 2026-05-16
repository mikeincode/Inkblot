export const NODE_TYPES = [
  { id: "character",   label: "Character",          desc: "A person, being, or entity within the world." },
  { id: "lore",        label: "Lore",               desc: "Knowledge, history, or world-truth." },
  { id: "chapter",     label: "Chapter",            desc: "A narrative progression event." },
  { id: "world-event", label: "World Event",        desc: "A moment that reshapes the universe." },
  { id: "artifact",    label: "Artifact",           desc: "An object of power, myth, or significance." },
  { id: "myth",        label: "Myth",               desc: "A belief, legend, or oral tradition." },
  { id: "divergence",  label: "Timeline Divergence",desc: "A point where reality splits." },
  { id: "faction",     label: "Faction",            desc: "A group, order, or organized power." },
  { id: "location",    label: "Location",           desc: "A place that carries narrative weight." },
  { id: "mutation",    label: "Mutation",           desc: "A remix or inversion of existing canon." },
  { id: "shadow-rumor",label: "Shadow Rumor",       desc: "Unofficial lore. May or may not be true." },
];

interface NodeTypeSelectorProps {
  mode: "tree" | "shadow";
  selectedType: string;
  onSelect: (typeId: string) => void;
}

export function NodeTypeSelector({ mode, selectedType, onSelect }: NodeTypeSelectorProps) {
  const isShadow = mode === "shadow";

  return (
    <div className="w-full">
      <h3 className="text-sm uppercase tracking-widest text-white/40 mb-4 font-sans">Type</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 overflow-x-auto snap-x md:overflow-visible pb-4 md:pb-0">
        {NODE_TYPES.map((type) => {
          const isShadowOnly = type.id === "mutation" || type.id === "shadow-rumor";
          const isLocked = isShadowOnly && !isShadow;
          const isSelected = selectedType === type.id;
          
          let borderClass = "border-white/5 hover:border-white/20";
          if (isSelected) {
            borderClass = isShadow 
              ? "border-[#c026d3] shadow-[0_0_15px_rgba(192,38,211,0.3)]" 
              : "border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.3)]";
          } else if (isLocked) {
            borderClass = "border-white/5 opacity-40 grayscale cursor-not-allowed";
          } else if (isShadowOnly && isShadow) {
            borderClass = "border-fuchsia-900/40 shadow-[0_0_10px_rgba(192,38,211,0.1)] hover:border-fuchsia-500/50";
          }

          return (
            <button
              key={type.id}
              data-testid={`btn-type-${type.id}`}
              disabled={isLocked}
              onClick={() => !isLocked && onSelect(type.id)}
              className={`snap-start min-w-[140px] text-left p-4 rounded-sm bg-black/40 border transition-all duration-300 flex flex-col gap-2 ${borderClass}`}
            >
              <div className={`font-serif text-lg ${isSelected ? (isShadow ? "text-fuchsia-300" : "text-indigo-300") : "text-white/80"} ${isShadowOnly && isShadow && !isSelected ? "text-fuchsia-400/70" : ""}`}>
                {type.label}
              </div>
              <div className="text-[10px] text-white/40 font-sans leading-relaxed">
                {type.desc}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
