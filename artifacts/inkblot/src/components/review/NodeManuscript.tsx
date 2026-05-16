import { Submission } from "./data";
import { BRANCHES, TRUNK_NODES } from "../universe/data";

export function NodeManuscript({ submission }: { submission: Submission }) {
  const branchName = BRANCHES.find(b => b.id === submission.branch)?.label || submission.branch;
  const trunkName = TRUNK_NODES.find(t => t.id === submission.trunkAnchor)?.label || submission.trunkAnchor;

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto relative">
      {/* Subtle parchment texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      <div className="max-w-3xl mx-auto w-full p-8 md:p-12 lg:p-16 relative z-10">
        <header className="mb-12">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6 drop-shadow-sm leading-tight">
            {submission.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/50">
            <span className="text-indigo-200">by {submission.author}</span>
            <span>·</span>
            <span className="uppercase tracking-widest text-xs">{submission.type}</span>
            <span>·</span>
            <span>{submission.submittedAt}</span>
          </div>
          <div className="h-px w-full bg-gradient-to-r from-indigo-500/20 via-white/5 to-transparent mt-8" />
        </header>

        <article className="prose prose-invert prose-lg md:prose-xl max-w-none">
          {submission.body.split('\n\n').map((paragraph, i) => (
            <p key={i} className="font-serif leading-loose text-white/80 mb-6">
              {paragraph}
            </p>
          ))}
        </article>

        <div className="mt-16 pt-8 border-t border-white/10">
          <h4 className="text-xs uppercase tracking-[0.15em] text-white/40 mb-3">Contributor's Note</h4>
          <p className="font-serif italic text-white/60 text-lg leading-relaxed border-l border-white/10 pl-4">
            {submission.contributorNote}
          </p>
        </div>

        <div className="mt-16 text-[10px] tracking-[0.2em] text-white/30 uppercase text-center pb-12">
          Submitted From: {branchName} <span className="mx-2 opacity-50">→</span> {submission.timeline}
        </div>
      </div>
    </div>
  );
}
