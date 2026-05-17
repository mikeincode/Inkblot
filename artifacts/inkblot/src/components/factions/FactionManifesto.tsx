import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FactionData } from "./data";

interface FactionManifestoProps {
  faction: FactionData;
}

export function FactionManifesto({ faction }: FactionManifestoProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 border-b border-border/50" data-testid="faction-manifesto">
      <div className="container mx-auto px-6 max-w-4xl">
        <div 
          className="text-xs tracking-widest text-muted-foreground uppercase mb-12 pl-4 border-l-4"
          style={{ borderColor: faction.primaryColor }}
        >
          THE DOCTRINE
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-20"
        >
          <p className="font-serif text-xl md:text-2xl leading-relaxed text-foreground ml-4 md:ml-12 border-l border-white/5 pl-6 md:pl-8">
            {faction.manifesto}
          </p>
        </motion.div>

        <div className="mb-24" ref={ref}>
          <h3 className="text-sm font-serif italic text-muted-foreground mb-8 text-center">Core Beliefs</h3>
          <div className="space-y-6">
            {faction.beliefs.map((belief, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="flex items-start gap-6"
              >
                <div 
                  className="shrink-0 w-8 h-8 rounded-full border flex items-center justify-center text-sm mt-0.5"
                  style={{ 
                    borderColor: `${faction.primaryColor}50`,
                    color: faction.primaryColor,
                    boxShadow: `0 0 10px ${faction.primaryColor}20 inset`
                  }}
                >
                  {i + 1}
                </div>
                <p className="font-serif text-lg md:text-xl text-foreground/90 leading-relaxed">
                  {belief}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="p-8 border bg-card/50 relative"
          style={{ borderColor: `${faction.primaryColor}30` }}
        >
          <div 
            className="absolute top-0 left-0 w-full h-1"
            style={{ background: `linear-gradient(90deg, transparent, ${faction.primaryColor}50, transparent)` }}
          />
          <p className="font-serif text-xl md:text-2xl text-center italic text-foreground leading-relaxed">
            "We of the {faction.name} hold these truths not as opinion but as interpretive law."
          </p>
        </motion.div>
      </div>
    </section>
  );
}
