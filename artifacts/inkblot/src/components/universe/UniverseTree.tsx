import { useMemo } from "react";
import { motion } from "framer-motion";
import { TRUNK_NODES, BRANCHES, SHADOW_BRANCHES } from "./data";
import { TrunkNode, BranchNode } from "./types";

interface UniverseTreeProps {
  mode: "tree" | "shadow";
  onSelectNode: (node: TrunkNode | BranchNode) => void;
}

// Deterministic hash from string → number in [0, 1)
function hashFrac(s: string, salt = 0): number {
  let h = salt * 2654435761;
  for (let i = 0; i < s.length; i++) {
    h = Math.imul(h ^ s.charCodeAt(i), 2654435761);
  }
  return ((h >>> 0) % 1000) / 1000;
}

const STRENGTH_TREE: Record<string, { strokeWidth: number; color: string; opacity: number; r: number; dash?: string }> = {
  thriving: { strokeWidth: 5,   color: "#6366f1", opacity: 0.95, r: 9  },
  major:    { strokeWidth: 3,   color: "#60a5fa", opacity: 0.75, r: 6  },
  minor:    { strokeWidth: 2,   color: "#818cf8", opacity: 0.45, r: 4  },
  fading:   { strokeWidth: 1.5, color: "#4b5563", opacity: 0.25, r: 3, dash: "4 5" },
};

const STRENGTH_SHADOW: Record<string, { strokeWidth: number; color: string; opacity: number; r: number; dash?: string }> = {
  thriving: { strokeWidth: 4,   color: "#c026d3", opacity: 0.90, r: 8  },
  major:    { strokeWidth: 2.5, color: "#9333ea", opacity: 0.65, r: 5  },
  minor:    { strokeWidth: 1.5, color: "#6d28d9", opacity: 0.40, r: 3  },
  fading:   { strokeWidth: 1,   color: "#3730a3", opacity: 0.18, r: 2, dash: "2 7" },
};

export function UniverseTree({ mode, onSelectNode }: UniverseTreeProps) {
  const isShadow = mode === "shadow";

  const TRUNK_X = 180;
  const START_Y = 80;
  const SPACING_Y = 110;

  // Pre-compute branch layouts deterministically
  const treeLayout = useMemo(() => {
    const layout = (branches: BranchNode[], shadowMode: boolean) =>
      branches.map((branch, i) => {
        const trunkIdx = TRUNK_NODES.findIndex(n => n.id === branch.trunkNodeId);
        if (trunkIdx === -1) return null;

        const originY = START_Y + trunkIdx * SPACING_Y;

        // deterministic direction: shadow branches can go left OR right
        const goLeft = shadowMode && hashFrac(branch.id, 1) > 0.45;
        const dir = goLeft ? -1 : 1;

        const spreadBase = shadowMode ? 120 : 160;
        const nodeExtra = branch.nodes * (shadowMode ? 1.4 : 1.8);
        const jitterX = hashFrac(branch.id, 2) * (shadowMode ? 80 : 40);
        const endX = TRUNK_X + dir * (spreadBase + nodeExtra + jitterX);

        const jitterY = (hashFrac(branch.id, 3) - 0.5) * (shadowMode ? 90 : 60);
        const endY = originY + jitterY;

        const cp1X = TRUNK_X + dir * 55;
        const cp1Y = originY + (hashFrac(branch.id, 4) - 0.5) * (shadowMode ? 55 : 20);
        const cp2X = endX - dir * 40;
        const cp2Y = endY + (hashFrac(branch.id, 5) - 0.5) * (shadowMode ? 40 : 10);

        const path = `M ${TRUNK_X} ${originY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`;
        const delay = 0.4 + i * (shadowMode ? 0.06 : 0.12);

        return { branch, originY, endX, endY, dir, path, delay };
      }).filter(Boolean);

    return layout;
  }, []);

  const shadowLayout = useMemo(() => {
    const layout = (branches: BranchNode[], shadowMode: boolean) =>
      branches.map((branch, i) => {
        const trunkIdx = TRUNK_NODES.findIndex(n => n.id === branch.trunkNodeId);
        if (trunkIdx === -1) return null;

        const originY = START_Y + trunkIdx * SPACING_Y;
        const goLeft = hashFrac(branch.id, 1) > 0.45;
        const dir = goLeft ? -1 : 1;

        const spreadBase = 100;
        const nodeExtra = branch.nodes * 1.4;
        const jitterX = hashFrac(branch.id, 2) * 80;
        const endX = TRUNK_X + dir * (spreadBase + nodeExtra + jitterX);

        const jitterY = (hashFrac(branch.id, 3) - 0.5) * 90;
        const endY = originY + jitterY;

        const cp1X = TRUNK_X + dir * 55;
        const cp1Y = originY + (hashFrac(branch.id, 4) - 0.5) * 55;
        const cp2X = endX - dir * 40;
        const cp2Y = endY + (hashFrac(branch.id, 5) - 0.5) * 40;

        const path = `M ${TRUNK_X} ${originY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`;
        const delay = 0.4 + i * 0.06;

        return { branch, originY, endX, endY, dir, path, delay };
      }).filter(Boolean);

    return layout(SHADOW_BRANCHES, true);
  }, []);

  const canonLayout = useMemo(() => {
    return BRANCHES.map((branch, i) => {
      const trunkIdx = TRUNK_NODES.findIndex(n => n.id === branch.trunkNodeId);
      if (trunkIdx === -1) return null;

      const originY = START_Y + trunkIdx * SPACING_Y;
      const dir = 1;
      const endX = TRUNK_X + (160 + branch.nodes * 1.8 + hashFrac(branch.id, 2) * 40);
      const jitterY = (hashFrac(branch.id, 3) - 0.5) * 60;
      const endY = originY + jitterY;

      const cp1X = TRUNK_X + 55;
      const cp1Y = originY + (hashFrac(branch.id, 4) - 0.5) * 20;
      const cp2X = endX - 40;
      const cp2Y = endY + (hashFrac(branch.id, 5) - 0.5) * 10;

      const path = `M ${TRUNK_X} ${originY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`;
      const delay = 0.4 + i * 0.12;

      return { branch, originY, endX, endY, dir, path, delay };
    }).filter(Boolean);
  }, []);

  const totalHeight = START_Y + (TRUNK_NODES.length - 1) * SPACING_Y + 120;

  return (
    <div
      className="w-full relative overflow-x-auto overflow-y-hidden transition-colors duration-700"
      style={{ height: totalHeight }}
    >
      {/* Shadow ink-wash overlay */}
      {isShadow && (
        <div
          className="absolute inset-0 pointer-events-none z-10 opacity-30"
          style={{
            background: "radial-gradient(ellipse 60% 60% at 50% 40%, #3b076430 0%, transparent 70%)",
            mixBlendMode: "screen",
          }}
        />
      )}

      <svg width="100%" height="100%" className="absolute inset-0">
        <defs>
          <filter id="glow-tree">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glow-shadow">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Canon branches — always visible */}
        {canonLayout.map((item) => {
          if (!item) return null;
          const style = STRENGTH_TREE[item.branch.strength] ?? STRENGTH_TREE.minor;
          return (
            <g key={item.branch.id} filter={item.branch.strength === "thriving" ? "url(#glow-tree)" : undefined}>
              <motion.path
                d={item.path}
                fill="none"
                stroke={style.color}
                strokeWidth={style.strokeWidth}
                opacity={isShadow ? style.opacity * 0.3 : style.opacity}
                strokeDasharray={style.dash}
                strokeLinecap="round"
                className="cursor-pointer hover:opacity-100 transition-opacity"
                onClick={() => onSelectNode(item.branch)}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.8, delay: item.delay, ease: "easeOut" }}
              />
              <motion.circle
                cx={item.endX}
                cy={item.endY}
                r={style.r}
                fill={style.color}
                opacity={isShadow ? 0.2 : style.opacity}
                className="cursor-pointer"
                onClick={() => onSelectNode(item.branch)}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, delay: item.delay + 1.8, type: "spring" }}
              />
              {!isShadow && (
                <text
                  x={item.endX + 14}
                  y={item.endY + 5}
                  fill={style.color}
                  fontSize="12"
                  fontFamily="'Cormorant Garamond', serif"
                  className="pointer-events-none"
                  opacity={style.opacity * 0.9}
                >
                  {item.branch.label}
                </text>
              )}
            </g>
          );
        })}

        {/* Shadow branches — revealed in shadow mode, dense and bilateral */}
        {isShadow && shadowLayout.map((item) => {
          if (!item) return null;
          const style = STRENGTH_SHADOW[item.branch.strength] ?? STRENGTH_SHADOW.minor;
          return (
            <g key={item.branch.id} filter={item.branch.strength === "thriving" ? "url(#glow-shadow)" : undefined}>
              <motion.path
                d={item.path}
                fill="none"
                stroke={style.color}
                strokeWidth={style.strokeWidth}
                opacity={style.opacity}
                strokeDasharray={style.dash}
                strokeLinecap="round"
                className="cursor-pointer hover:opacity-100 transition-opacity"
                onClick={() => onSelectNode(item.branch)}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.4, delay: item.delay, ease: "easeOut" }}
              />
              <motion.circle
                cx={item.endX}
                cy={item.endY}
                r={style.r}
                fill={style.color}
                className="cursor-pointer"
                onClick={() => onSelectNode(item.branch)}
                initial={{ scale: 0 }}
                animate={{ scale: 1, opacity: [0, style.opacity, style.opacity * 0.85, style.opacity] }}
                transition={{ duration: 0.4, delay: item.delay + 1.4, type: "spring" }}
              />
              <text
                x={item.endX + (item.dir * 14)}
                y={item.endY + 5}
                textAnchor={item.dir === 1 ? "start" : "end"}
                fill={style.color}
                fontSize="11"
                fontFamily="'Cormorant Garamond', serif"
                className="pointer-events-none"
                opacity={style.opacity * 0.8}
              >
                {item.branch.label}
              </text>
            </g>
          );
        })}

        {/* Trunk */}
        {TRUNK_NODES.map((node, i) => {
          const cy = START_Y + i * SPACING_Y;
          const nextCy = cy + SPACING_Y;
          const trunkColor = isShadow ? "#4c1d95" : "#6366f1";

          return (
            <g key={node.id}>
              {i < TRUNK_NODES.length - 1 && (
                <motion.line
                  x1={TRUNK_X} y1={cy} x2={TRUNK_X} y2={nextCy}
                  stroke={trunkColor}
                  strokeWidth={isShadow ? 2 : 5}
                  opacity={isShadow ? 0.35 : 0.9}
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: i * 0.15 }}
                />
              )}

              {/* Pulse halo */}
              {!isShadow && (
                <motion.circle
                  cx={TRUNK_X} cy={cy} r={18}
                  fill="#6366f1"
                  className="pointer-events-none"
                  animate={{ scale: [1, 1.6, 1], opacity: [0.15, 0.4, 0.15] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
                />
              )}

              <motion.circle
                cx={TRUNK_X} cy={cy}
                r={isShadow ? 5 : 10}
                fill={isShadow ? "#7e22ce" : "#6366f1"}
                filter={isShadow ? undefined : "url(#glow-tree)"}
                className="cursor-pointer"
                onClick={() => onSelectNode(node)}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, type: "spring", delay: i * 0.15 }}
              />

              <text
                x={TRUNK_X - 20}
                y={cy + 5}
                textAnchor="end"
                fill={isShadow ? "#a78bfa" : "#f0eee8"}
                fontSize="13"
                fontFamily="'Cormorant Garamond', serif"
                className="pointer-events-none"
                opacity={isShadow ? 0.5 : 0.9}
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
