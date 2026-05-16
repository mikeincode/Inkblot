import { motion } from "framer-motion";
import { Swords } from "lucide-react";
import { CANON_WARS } from "../data";
import { CanonWar } from "../types";

const STATUS_CONFIG: Record<CanonWar["status"], { label: string; color: string }> = {
  escalating: { label: "Escalating",  color: "#dc2626" },
  active:     { label: "Active",      color: "#9f1239" },
  settled:    { label: "Settled",     color: "#374151" },
};

export function CanonWars() {
  return (
    <section className="py-20 border-t border-[#3b0764]/40 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#030106] to-[#0a0010] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <Swords className="w-4 h-4 text-[#dc2626]" />
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-[#dc2626]">Contested Narratives</span>
          </div>
          <h2 className="font-serif text-4xl text-[#f0eee8] mb-3">Unofficial Canon Wars</h2>
          <p className="text-[#a78bfa]/70 font-light max-w-xl">
            When the Shadow can't agree. Competing truths fighting for the right to be remembered.
          </p>
        </motion.div>

        <div className="flex flex-col gap-8">
          {CANON_WARS.map((war, idx) => {
            const total = war.nodeCountA + war.nodeCountB;
            const pctA = Math.round((war.nodeCountA / total) * 100);
            const pctB = 100 - pctA;
            const cfg = STATUS_CONFIG[war.status];

            return (
              <motion.div
                key={war.id}
                data-testid={`canon-war-${war.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="border border-[#3b0764]/50 bg-[#0d001a]/60 p-7"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif text-xl text-[#f0eee8] italic leading-snug max-w-xl">
                    "{war.title}"
                  </h3>
                  <span
                    className="text-[10px] font-medium tracking-[0.15em] uppercase px-3 py-1 border ml-4 shrink-0"
                    style={{ color: cfg.color, borderColor: cfg.color + "60" }}
                  >
                    {cfg.label}
                  </span>
                </div>

                <p className="text-[#a78bfa]/60 text-sm font-light mb-7 leading-relaxed">
                  {war.summary}
                </p>

                {/* battle bar */}
                <div className="mb-5">
                  <div className="flex h-2 overflow-hidden rounded-none mb-3">
                    <motion.div
                      className="h-full bg-[#6b21a8]"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${pctA}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 + idx * 0.1, ease: "easeOut" }}
                    />
                    <motion.div
                      className="h-full bg-[#dc2626]"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${pctB}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 + idx * 0.1, ease: "easeOut" }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-[#6b7280]">
                    <span>{pctA}% · {war.nodeCountA} nodes</span>
                    <span>{war.nodeCountB} nodes · {pctB}%</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="border border-[#6b21a8]/40 p-4">
                    <div className="text-[10px] tracking-widest uppercase text-[#6b21a8] mb-2">Interpretation A</div>
                    <p className="text-[#c084fc] text-sm font-light">{war.sideA}</p>
                  </div>
                  <div className="border border-[#9f1239]/40 p-4">
                    <div className="text-[10px] tracking-widest uppercase text-[#9f1239] mb-2">Interpretation B</div>
                    <p className="text-[#fca5a5]/80 text-sm font-light">{war.sideB}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
