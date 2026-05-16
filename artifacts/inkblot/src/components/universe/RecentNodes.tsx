import { motion } from "framer-motion";

const RECENT_NODES = [
  { title: "The Obsidian Treaty", branch: "The Iron Compact", author: "Elara V.", type: "Lore", time: "2h ago", excerpt: "They carved the words not into stone, but into the still-warm glass of the crater..." },
  { title: "Death of General Mar", branch: "Ember Wars Retold", author: "Kael T.", type: "Event", time: "5h ago", excerpt: "The general fell without a sound, his armor pierced by a sliver of cooling magma..." },
  { title: "Vaults of the Nameless", branch: "The Forgotten Vaults", author: "J.R. Scribe", type: "Location", time: "12h ago", excerpt: "Beneath the oldest keep, where the ash never settles, lies a door bound in chains of light..." },
  { title: "The First Betrayal", branch: "Solvara's Shadow", author: "M. Ren", type: "Chapter", time: "1d ago", excerpt: "Even before she claimed the crown, Solvara knew the price of loyalty was steep..." },
];

export function RecentNodes() {
  return (
    <div className="container mx-auto px-6 py-24 max-w-4xl">
      <h3 className="font-serif text-3xl text-foreground text-center mb-16 italic">Recent Contributions</h3>
      
      <div className="flex flex-col gap-12 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
        {RECENT_NODES.map((node, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group cursor-pointer"
          >
            <div className="flex items-center justify-center w-3 h-3 rounded-full border-2 border-primary bg-background shadow-[0_0_10px_rgba(55,48,163,0.5)] absolute left-6 md:left-1/2 -translate-x-1.5 md:-translate-x-1.5 group-hover:scale-150 group-hover:bg-primary transition-all duration-300 z-10" />
            
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] pl-10 md:pl-0">
              <div className="bg-card/50 hover:bg-card border border-border/50 p-6 transition-all duration-300 group-hover:border-primary/50 group-hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium tracking-wider text-accent uppercase">{node.type}</span>
                  <span className="text-xs text-muted-foreground">{node.time}</span>
                </div>
                
                <h4 className="font-serif text-2xl text-foreground mb-2 group-hover:text-primary transition-colors">{node.title}</h4>
                <div className="text-sm text-muted-foreground mb-4">in <span className="text-secondary">{node.branch}</span></div>
                
                <p className="text-muted-foreground/80 font-light text-sm italic mb-6 leading-relaxed">
                  "{node.excerpt}"
                </p>
                
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-6 h-6 rounded-full bg-border flex items-center justify-center text-xs font-serif">
                    {node.author.charAt(0)}
                  </div>
                  <span className="text-xs text-muted-foreground">{node.author}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
