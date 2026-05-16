import { motion } from "framer-motion";
import { GitFork } from "lucide-react";
import { MUTATION_EVENTS } from "../data";

export function MutatingNarratives() {
  return (
    <section className="py-20 border-t border-[#3b0764]/40 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#030106]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#3b0764]/10 blur-[80px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <GitFork className="w-4 h-4 text-[#7e22ce]" />
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-[#7e22ce]">Community Mutations</span>
          </div>
          <h2 className="font-serif text-4xl text-[#f0eee8] mb-3">Mutating Narratives</h2>
          <p className="text-[#a78bfa]/70 font-light max-w-xl">
            Canon nodes remixed, inverted, and reborn. The Shadow doesn't delete — it transforms.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {MUTATION_EVENTS.map((mutation, idx) => (
            <motion.div
              key={mutation.id}
              data-testid={`mutation-${mutation.id}`}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group cursor-pointer border border-[#3b0764]/50 bg-[#0a0010]/70 hover:border-[#7e22ce]/70 transition-all duration-300 p-6"
            >
              {/* mutation arrow header */}
              <div className="flex items-center gap-3 mb-5">
                <span className="text-sm text-[#6b7280] font-serif italic truncate max-w-[36%]">{mutation.original}</span>
                <div className="flex items-center gap-2 shrink-0">
                  <div className="h-px w-5 bg-[#7e22ce]/60" />
                  <GitFork className="w-3 h-3 text-[#7e22ce]" />
                  <div className="h-px w-5 bg-[#7e22ce]/60" />
                </div>
                <span className="text-sm text-[#c084fc] font-serif italic truncate max-w-[36%]">{mutation.mutation}</span>
              </div>

              <p className="text-[#a78bfa]/70 text-sm font-light leading-relaxed mb-5">
                {mutation.summary}
              </p>

              <div className="flex items-center justify-between text-xs">
                <div className="text-[#6b21a8]">
                  in <span className="text-[#a78bfa]">{mutation.branch}</span>
                  <span className="text-[#4c1d95] mx-2">·</span>
                  by <span className="text-[#a78bfa]">{mutation.mutatedBy}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#9f1239]">
                  <GitFork className="w-3 h-3" />
                  <span>{mutation.forkCount} forks</span>
                  <span className="text-[#4c1d95] ml-2">{mutation.time}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
