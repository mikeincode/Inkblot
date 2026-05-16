import { motion } from "framer-motion";
import { SHADOW_TIMELINES } from "../data";
import { ShadowTimeline } from "../types";

const VELOCITY_CONFIG: Record<ShadowTimeline["velocity"], { label: string; color: string; pulse: boolean }> = {
  explosive: { label: "Explosive growth", color: "#dc2626", pulse: true },
  fast:      { label: "Fast moving",      color: "#9f1239", pulse: true },
  steady:    { label: "Steady flow",      color: "#6b21a8", pulse: false },
  decaying:  { label: "Decaying",         color: "#374151", pulse: false },
};

export function UndergroundTimelines() {
  return (
    <section className="py-20 border-t border-[#3b0764]/40 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#030106] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-[#9f1239]">Unofficial Timelines</span>
          </div>
          <h2 className="font-serif text-4xl text-[#f0eee8] mb-3">Underground Timelines</h2>
          <p className="text-[#a78bfa]/70 font-light max-w-xl">
            Timelines evolving outside canon governance. No curator approval. No merge requests. Just growth.
          </p>
        </motion.div>

        <div className="flex flex-col gap-4">
          {SHADOW_TIMELINES.map((timeline, idx) => {
            const cfg = VELOCITY_CONFIG[timeline.velocity];
            const progressPct = Math.min(100, (timeline.nodes / 120) * 100);

            return (
              <motion.div
                key={timeline.id}
                data-testid={`shadow-timeline-${timeline.id}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group cursor-pointer border border-[#3b0764]/40 bg-[#0a0010]/60 hover:border-[#7e22ce]/60 transition-all duration-300 relative overflow-hidden"
              >
                {/* animated left border */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-0.5 transition-opacity"
                  style={{ backgroundColor: cfg.color, boxShadow: `0 0 8px ${cfg.color}`, opacity: cfg.pulse ? 0.9 : 0.4 }}
                />

                <div className="p-5 pl-6">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className="font-serif text-xl text-[#e9d5ff] group-hover:text-white transition-colors mb-0.5">
                        {timeline.label}
                      </h3>
                      <span className="text-xs text-[#6b21a8]">from {timeline.originBranch}</span>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xs font-medium mb-1" style={{ color: cfg.color }}>{cfg.label}</div>
                      <div className="text-xs text-[#6b7280]">{timeline.lastActivity}</div>
                    </div>
                  </div>

                  <p className="text-[#a78bfa]/60 text-sm font-light leading-relaxed mb-4">
                    {timeline.summary}
                  </p>

                  <div className="flex items-center gap-6">
                    <div className="flex gap-4 text-xs text-[#7c3aed]/70">
                      <span>{timeline.nodes} nodes</span>
                      <span>{timeline.contributors} contributors</span>
                    </div>
                    <div className="flex-1 h-px bg-[#1e1030] relative overflow-hidden">
                      <motion.div
                        className="absolute left-0 top-0 h-full"
                        style={{ backgroundColor: cfg.color, opacity: 0.7 }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${progressPct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.3 + idx * 0.1, ease: "easeOut" }}
                      />
                    </div>
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
