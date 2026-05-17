import { motion } from "framer-motion";
import { PROFILE_DATA, type RoleIdentity } from "./data";

function getRoleColor(role: RoleIdentity) {
  switch (role) {
    case "Keeper": return "bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]";
    case "Chronicler": return "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]";
    case "Wanderer": return "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]";
    case "Architect": return "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]";
    case "Archivist": return "bg-slate-400 shadow-[0_0_8px_rgba(148,163,184,0.8)]";
    case "Shadowborn": return "bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.8)]";
    case "Mythsmith": return "bg-[#a78bfa] shadow-[0_0_10px_rgba(167,139,250,0.8)]";
    default: return "bg-primary shadow-[0_0_8px_rgba(99,102,241,0.8)]";
  }
}

export function ProfileHero() {
  const data = PROFILE_DATA;

  return (
    <section className="relative min-h-[70vh] w-full flex flex-col justify-center overflow-hidden border-b border-primary/20 pb-12 pt-24" data-testid="profile-hero">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-background pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(99,102,241,0.05),_transparent_50%)] pointer-events-none" />
      
      {/* Abstract Tree Background Right Side */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none opacity-[0.06] blur-[2px] flex items-center justify-end">
        <svg viewBox="0 0 400 600" className="h-[120%] w-auto stroke-primary fill-none">
          <path d="M 200 600 L 200 400 Q 150 250 50 150 M 200 400 Q 250 200 350 100 M 200 300 Q 300 200 380 250" strokeWidth="2" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Section: Identity */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-2"
          >
            <div className="flex items-center gap-3">
              <span className={`w-2 h-2 rounded-full ${getRoleColor(data.role)}`} />
              <span className="text-[10px] tracking-[0.2em] font-medium uppercase text-muted-foreground">
                {data.role}
              </span>
            </div>
            
            <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl text-foreground font-medium leading-none tracking-tight text-[#f0eee8]">
              {data.displayName}
            </h1>
            
            <span className="text-sm font-sans text-muted-foreground">
              @{data.username}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <p className="font-serif italic text-xl md:text-2xl text-muted-foreground/80 max-w-2xl leading-relaxed">
              "{data.lore}"
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col gap-4 mt-2"
          >
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground/50">
              Member since {data.memberSince}
            </span>

            <div className="flex flex-wrap gap-2">
              {data.factions.map((faction, i) => (
                <div 
                  key={i}
                  className="px-3 py-1 border border-primary/20 rounded-none text-xs text-primary-foreground/70 font-serif tracking-wide shadow-[0_0_10px_rgba(99,102,241,0.05)]"
                >
                  {faction}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Section: Stats */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="lg:col-span-4 grid grid-cols-2 gap-x-8 gap-y-10"
        >
          <div className="flex flex-col gap-1">
            <span className="font-serif text-4xl lg:text-5xl text-primary drop-shadow-[0_0_10px_rgba(99,102,241,0.4)]">{data.stats.canonizedNodes}</span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Canonized Nodes</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-serif text-4xl lg:text-5xl text-[#c026d3] drop-shadow-[0_0_10px_rgba(192,38,211,0.4)]">{data.stats.shadowMutations}</span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Shadow Mutations</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-serif text-4xl lg:text-5xl text-[#60a5fa] drop-shadow-[0_0_10px_rgba(96,165,250,0.4)]">{data.stats.branchesSprouted}</span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Branches Sprouted</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-serif text-4xl lg:text-5xl text-foreground/80">{data.stats.universesJoined}</span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Universes Joined</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}