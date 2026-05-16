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
  strength: string;
  nodes: number;
  contributors: number;
  summary?: string;
};
