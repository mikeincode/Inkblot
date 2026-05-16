export type TrunkNode = {
  id: string;
  label: string;
  type: string;
  depth: number;
  summary: string;
};

export type BranchNode = {
  id: string;
  label: string;
  trunkNodeId: string;
  strength: "thriving" | "major" | "minor" | "fading";
  nodes: number;
  contributors: number;
  summary?: string;
  forks?: number;
};

export type ShadowTimeline = {
  id: string;
  label: string;
  originBranch: string;
  nodes: number;
  contributors: number;
  velocity: "explosive" | "fast" | "steady" | "decaying";
  summary: string;
  lastActivity: string;
};

export type MutationEvent = {
  id: string;
  original: string;
  mutation: string;
  branch: string;
  mutatedBy: string;
  forkCount: number;
  summary: string;
  time: string;
};

export type CanonWar = {
  id: string;
  title: string;
  sideA: string;
  sideB: string;
  nodeCountA: number;
  nodeCountB: number;
  summary: string;
  status: "active" | "settled" | "escalating";
};

export type RisingShadowBranch = {
  id: string;
  label: string;
  trunkNodeId: string;
  nodes: number;
  contributors: number;
  growth: string;
  summary: string;
  tags: string[];
};
