import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { RISING_SHADOW_BRANCHES } from "../data";

export function RisingShadowBranches() {
  return (
    <section className="py-20 border-t border-[#3b0764]/40 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0010] to-[#030106] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="w-4 h-4 text-[#c026d3]" />
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-[#c026d3]">Rising in the Shadow</span>
          </div>
          <h2 className="font-serif text-4xl text-[#f0eee8] mb-3">Underground Branches</h2>
          <p className="text-[#a78bfa]/70 font-light max-w-xl">
            Branches gaining mass faster than any canon structure can track. No governance. No approval.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {RISING_SHADOW_BRANCHES.map((branch, idx) => (
            <motion.div
              key={branch.id}
              data-testid={`rising-branch-${branch.id}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group cursor-pointer relative"
            >
              <div className="border border-[#3b0764]/60 bg-[#0d001a]/80 p-6 hover:border-[#7e22ce]/80 hover:bg-[#0d001a] transition-all duration-300 relative overflow-hidden">
                {/* glow bar */}
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#7e22ce] opacity-60 group-hover:opacity-100 shadow-[0_0_12px_rgba(126,34,206,0.8)] transition-opacity" />

                <div className="flex items-start justify-between mb-4 pl-4">
                  <h3 className="font-serif text-2xl text-[#e9d5ff] group-hover:text-white transition-colors">
                    {branch.label}
                  </h3>
                  <span className="text-xs text-[#a21caf] font-medium whitespace-nowrap ml-4 mt-1">{branch.growth}</span>
                </div>

                <p className="text-[#a78bfa]/70 text-sm font-light leading-relaxed mb-5 pl-4">
                  {branch.summary}
                </p>

                <div className="flex items-center justify-between pl-4">
                  <div className="flex gap-5 text-xs text-[#7c3aed]/80">
                    <span>{branch.nodes} nodes</span>
                    <span>{branch.contributors} contributors</span>
                  </div>
                  <div className="flex gap-2 flex-wrap justify-end">
                    {branch.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 border border-[#4c1d95]/60 text-[#a78bfa] tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
