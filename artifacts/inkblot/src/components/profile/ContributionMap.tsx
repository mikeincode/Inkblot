import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const NODE_DATA = [
  // Hollow Sea (Branch 1)
  { cx: 280, cy: 174, type: "canon", delay: 1.5, universe: "The Hollow Sea" },
  { cx: 220, cy: 150, type: "shadow", delay: 1.7 },
  { cx: 160, cy: 124, type: "branch", delay: 1.9 },
  
  // Ashfall Kingdoms (Branch 2)
  { cx: 360, cy: 180, type: "canon", delay: 1.6, universe: "Ashfall Kingdoms" },
  { cx: 320, cy: 154, type: "canon", delay: 1.8 },
  { cx: 290, cy: 135, type: "shadow", delay: 2.0 },

  // Neon Hollow (Branch 3)
  { cx: 580, cy: 180, type: "shadow", delay: 1.7, universe: "Neon Hollow" },
  { cx: 660, cy: 148, type: "branch", delay: 1.9 },
  { cx: 705, cy: 134, type: "shadow", delay: 2.1 },

  // Eclipse Protocol (Branch 4)
  { cx: 620, cy: 174, type: "branch", delay: 1.8, universe: "Eclipse Protocol" },
  { cx: 740, cy: 140, type: "shadow", delay: 2.0 },
  { cx: 830, cy: 124, type: "canon", delay: 2.2 },
];

export function ContributionMap() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const drawVariant = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (custom: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: { pathLength: { delay: custom, duration: 1.5, ease: "easeOut" }, opacity: { delay: custom, duration: 0.2 } }
    })
  };

  const nodeVariant = {
    hidden: { opacity: 0, scale: 0 },
    visible: (custom: number) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: custom, duration: 0.5, type: "spring" }
    })
  };

  const textVariant = {
    hidden: { opacity: 0 },
    visible: (custom: number) => ({
      opacity: 1,
      transition: { delay: custom, duration: 0.8 }
    })
  };

  return (
    <section className="py-24 w-full bg-background overflow-hidden border-b border-border/30" data-testid="contribution-map">
      <div className="container mx-auto px-6 mb-12">
        <h2 className="font-serif text-3xl text-foreground tracking-wide font-medium">Contribution Lineage</h2>
      </div>

      <div className="w-full max-w-[1200px] mx-auto overflow-x-auto hide-scrollbar">
        <div className="min-w-[800px] h-[300px] md:h-[400px]" ref={ref}>
          <svg viewBox="0 0 1000 400" className="w-full h-full">
            <defs>
              <filter id="glow-canon" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="glow-branch" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Main Trunk */}
            <motion.path
              d="M500 400 L500 200"
              stroke="var(--color-primary)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              variants={drawVariant}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0.3}
            />

            {/* Branch 1 - Hollow Sea */}
            <motion.path
              d="M500 200 Q350 150 150 120"
              stroke="#60a5fa"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              variants={drawVariant}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0.8}
            />

            {/* Branch 2 - Ashfall */}
            <motion.path
              d="M500 200 Q400 160 280 130"
              stroke="#f59e0b"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              variants={drawVariant}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={1.1}
            />

            {/* Branch 3 - Neon Hollow */}
            <motion.path
              d="M500 200 Q600 160 720 130"
              stroke="#c026d3"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              variants={drawVariant}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={1.4}
            />

            {/* Branch 4 - Eclipse Protocol */}
            <motion.path
              d="M500 200 Q650 150 850 120"
              stroke="#34d399"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              variants={drawVariant}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={1.7}
            />

            {/* Nodes */}
            {NODE_DATA.map((node, i) => {
              const isCanon = node.type === "canon";
              const isShadow = node.type === "shadow";
              const r = isCanon ? 6 : isShadow ? 3 : 4;
              const fill = isCanon ? "#f0eee8" : isShadow ? "#7e22ce" : "#60a5fa";
              const filter = isCanon ? "url(#glow-canon)" : isShadow ? "none" : "url(#glow-branch)";

              return (
                <motion.g key={i}>
                  <motion.circle
                    cx={node.cx}
                    cy={node.cy}
                    r={r}
                    fill={fill}
                    filter={filter}
                    variants={nodeVariant}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    custom={node.delay}
                  />
                  {node.universe && (
                    <motion.text
                      x={node.cx}
                      y={node.cy - 16}
                      fill="var(--color-muted-foreground)"
                      fontSize="10"
                      fontFamily="var(--font-sans)"
                      textAnchor="middle"
                      variants={textVariant}
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                      custom={node.delay + 0.3}
                    >
                      {node.universe}
                    </motion.text>
                  )}
                </motion.g>
              );
            })}
          </svg>
        </div>
      </div>
    </section>
  );
}