import { useMemo } from "react";
import { motion } from "framer-motion";
import { TRUNK_NODES, BRANCHES, SHADOW_BRANCHES } from "./data";
import { TrunkNode, BranchNode } from "./types";

interface UniverseTreeProps {
  mode: "tree" | "shadow";
  onSelectNode: (node: TrunkNode | BranchNode) => void;
}

export function UniverseTree({ mode, onSelectNode }: UniverseTreeProps) {
  const isShadow = mode === "shadow";

  const getBranchStyle = (strength: string) => {
    switch (strength) {
      case "thriving": return { strokeWidth: 4, color: "var(--color-primary)", opacity: 0.9, r: 8 };
      case "major": return { strokeWidth: 3, color: "var(--color-accent)", opacity: 0.7, r: 6 };
      case "minor": return { strokeWidth: 2, color: "var(--color-secondary)", opacity: 0.5, r: 4 };
      case "fading": return { strokeWidth: 1.5, color: "var(--color-muted-foreground)", opacity: 0.3, r: 3, dash: "4 4" };
      default: return { strokeWidth: 2, color: "var(--color-primary)", opacity: 0.6, r: 5 };
    }
  };

  const getShadowBranchStyle = (strength: string) => {
    switch (strength) {
      case "thriving": return { strokeWidth: 3, color: "#9f1239", opacity: 0.8, r: 6 };
      case "major": return { strokeWidth: 2, color: "#6b21a8", opacity: 0.6, r: 5 };
      case "minor": return { strokeWidth: 1.5, color: "#4c1d95", opacity: 0.4, r: 3 };
      case "fading": return { strokeWidth: 1, color: "#312e81", opacity: 0.2, r: 2, dash: "2 6" };
      default: return { strokeWidth: 2, color: "#831843", opacity: 0.5, r: 4 };
    }
  };

  // Layout calculations
  const trunkX = 150;
  const startY = 100;
  const nodeSpacingY = 120;

  const renderTrunk = () => {
    return TRUNK_NODES.map((node, i) => {
      const cy = startY + i * nodeSpacingY;
      const nextCy = cy + nodeSpacingY;
      
      return (
        <g key={node.id}>
          {i < TRUNK_NODES.length - 1 && (
            <motion.line
              x1={trunkX}
              y1={cy}
              x2={trunkX}
              y2={nextCy}
              stroke={isShadow ? "#4c1d95" : "var(--color-primary)"}
              strokeWidth={isShadow ? 2 : 6}
              opacity={isShadow ? 0.3 : 0.8}
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: i * 0.2 }}
            />
          )}
          
          <motion.circle
            cx={trunkX}
            cy={cy}
            r={isShadow ? 6 : 10}
            fill={isShadow ? "#7e22ce" : "var(--color-primary)"}
            className="cursor-pointer transition-transform hover:scale-150"
            onClick={() => onSelectNode(node)}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring", delay: i * 0.2 }}
          />
          
          {/* Trunk glow */}
          {!isShadow && (
            <motion.circle
              cx={trunkX}
              cy={cy}
              r={16}
              fill="var(--color-primary)"
              opacity="0.3"
              className="pointer-events-none"
              animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            />
          )}

          <text x={trunkX - 25} y={cy + 5} textAnchor="end" fill={isShadow ? "#a78bfa" : "var(--color-foreground)"} fontSize="14" className="font-serif pointer-events-none drop-shadow-md">
            {node.label}
          </text>
        </g>
      );
    });
  };

  const renderBranches = (branches: BranchNode[], isShadowMode: boolean) => {
    return branches.map((branch, i) => {
      const trunkNodeIndex = TRUNK_NODES.findIndex(n => n.id === branch.trunkNodeId);
      if (trunkNodeIndex === -1) return null;

      const startCy = startY + trunkNodeIndex * nodeSpacingY;
      
      const style = isShadowMode ? getShadowBranchStyle(branch.strength) : getBranchStyle(branch.strength);
      
      // Determine direction (shadow branches can go left or right, canon goes right)
      const direction = isShadowMode && i % 2 !== 0 ? -1 : 1;
      
      // Calculate end point with some organic variation
      const endX = trunkX + direction * (150 + Math.random() * 200 + (branch.nodes * 2));
      const endY = startCy + (Math.random() * 100 - 50);
      
      // Control points for bezier curve
      const cp1X = trunkX + direction * 50;
      const cp1Y = startCy + (isShadowMode ? (Math.random() * 60 - 30) : 0);
      const cp2X = endX - direction * 50;
      const cp2Y = endY;

      const pathData = `M ${trunkX} ${startCy} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`;

      return (
        <g key={branch.id}>
          <motion.path
            d={pathData}
            fill="none"
            stroke={style.color}
            strokeWidth={style.strokeWidth}
            opacity={style.opacity}
            strokeDasharray={style.dash}
            strokeLinecap="round"
            className="cursor-pointer hover:opacity-100 transition-opacity"
            onClick={() => onSelectNode(branch)}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.5 + Math.random() }}
          />
          
          {/* Branch endpoint cluster */}
          <motion.circle
            cx={endX}
            cy={endY}
            r={style.r}
            fill={style.color}
            className="cursor-pointer hover:scale-150 transition-transform"
            onClick={() => onSelectNode(branch)}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 2.5 }}
          />

          <text x={endX + (direction * 15)} y={endY + 5} textAnchor={direction === 1 ? "start" : "end"} fill={style.color} fontSize="12" className="pointer-events-none opacity-70">
            {branch.label}
          </text>
        </g>
      );
    });
  };

  return (
    <div className={`w-full relative ${isShadow ? 'h-[800px]' : 'h-[1000px]'} overflow-hidden`}>
      {isShadow && (
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.85\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')", mixBlendMode: "overlay" }} />
      )}
      
      <svg width="100%" height="100%" className="absolute inset-0">
        {renderBranches(BRANCHES, false)}
        {isShadow && renderBranches(SHADOW_BRANCHES, true)}
        {renderTrunk()}
      </svg>
    </div>
  );
}
