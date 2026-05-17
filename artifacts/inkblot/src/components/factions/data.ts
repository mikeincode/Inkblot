export type FactionAlignment = "tree" | "shadow" | "dual" | "chaos";
export type CanonStance = "preservationist" | "expansionist" | "abolitionist" | "selective";
export type MutationStance = "forbidden" | "controlled" | "encouraged" | "absolute";

export interface FactionMember {
  username: string;
  displayName: string;
  role: string;
  resonance: number;
  joinedCycle: string;
}

export interface FactionInfluenceEntry {
  universeId: string;
  universeName: string;
  branchName: string;
  influenceScore: number; // 0-100
  canonizedNodes: number;
  activeMembers: number;
}

export interface FactionData {
  id: string;
  name: string;
  tagline: string;
  alignment: FactionAlignment;
  canonStance: CanonStance;
  mutationStance: MutationStance;
  foundingCycle: string;
  memberCount: number;
  totalResonance: number;
  manifesto: string; // long form philosophy statement
  beliefs: string[]; // 3-5 core belief statements
  sigil: string; // SVG path data for the sigil shape
  sigilColor: string;
  primaryColor: string;
  members: FactionMember[];
  influence: FactionInfluenceEntry[];
}

export const FACTIONS: FactionData[] = [
  {
    id: "canon-preservationists",
    name: "Canon Preservationists",
    tagline: "What has been written shall not be unwrit.",
    alignment: "tree",
    canonStance: "preservationist",
    mutationStance: "forbidden",
    foundingCycle: "Cycle I",
    memberCount: 89,
    totalResonance: 4211,
    manifesto: "We hold that canon is sacred. Every Node that has been sealed to the Trunk represents a covenant between creator and mythology. To mutate canon is to commit the highest act of lore violence — to erase not just words but entire mythological realities. We do not oppose growth. We oppose erasure. The Trunk must remain inviolable. Branches may diverge; the root must hold.",
    beliefs: [
      "Sealed canon is irrevocable. The past does not bend.",
      "Mutation proposals must be rejected before they reach the Trunk.",
      "The Keeper's word is the final law of any mythology.",
      "Growth through addition, not revision.",
      "The Archive is the truest form of mythology.",
    ],
    sigil: "M50 10 L90 90 L10 90 Z",
    sigilColor: "#6366f1",
    primaryColor: "#6366f1",
    members: [
      { username: "lorekeeper", displayName: "Elarys Vane", role: "Mythsmith", resonance: 1247, joinedCycle: "Cycle I" },
      { username: "dael-vorne", displayName: "Dael Vorne", role: "Archivist", resonance: 892, joinedCycle: "Cycle I" },
      { username: "thal-riis", displayName: "Thal Riis", role: "Keeper", resonance: 441, joinedCycle: "Cycle II" },
    ],
    influence: [
      { universeId: "ashfall-kingdoms", universeName: "Ashfall Kingdoms", branchName: "The Ashfall Succession", influenceScore: 78, canonizedNodes: 34, activeMembers: 12 },
      { universeId: "hollow-sea", universeName: "The Hollow Sea", branchName: "The Third Drowning", influenceScore: 91, canonizedNodes: 47, activeMembers: 21 },
    ],
  },
  {
    id: "shadow-loyalists",
    name: "Shadow Loyalists",
    tagline: "The shadow holds what the tree cannot contain.",
    alignment: "shadow",
    canonStance: "abolitionist",
    mutationStance: "absolute",
    foundingCycle: "Cycle II",
    memberCount: 134,
    totalResonance: 6890,
    manifesto: "The Tree is a lie we tell ourselves about permanence. Every canon that has ever been sealed was once a Shadow whisper — a rumor that gained enough momentum to become fact. We do not abandon the Tree. We remember what it is: a frozen shadow. We live in the living dark, where mythology breathes and mutates and refuses to be contained by any single interpretation. The Shadow is not the chaos beneath canon — it is the truth beneath the performance of canon.",
    beliefs: [
      "Canon is consensus, not truth.",
      "All mythology is in permanent mutation — the Tree merely hides this.",
      "Shadow contributions are the only authentic form of lore.",
      "Every sealed canon should eventually be opened again.",
      "Mutation is not corruption — it is evolution.",
    ],
    sigil: "M50 10 Q90 50 50 90 Q10 50 50 10",
    sigilColor: "#c026d3",
    primaryColor: "#c026d3",
    members: [
      { username: "the-unmarked", displayName: "The Unmarked", role: "Shadowborn", resonance: 2103, joinedCycle: "Cycle II" },
      { username: "lyss-darkwood", displayName: "Lyss Darkwood", role: "Shadowborn", resonance: 1456, joinedCycle: "Cycle II" },
      { username: "vel-orn", displayName: "Vel Orn", role: "Wanderer", resonance: 677, joinedCycle: "Cycle III" },
    ],
    influence: [
      { universeId: "neon-hollow", universeName: "Neon Hollow", branchName: "The Deep Frequency", influenceScore: 94, canonizedNodes: 2, activeMembers: 34 },
      { universeId: "ashfall-kingdoms", universeName: "Ashfall Kingdoms", branchName: "The Ashfall Succession", influenceScore: 41, canonizedNodes: 0, activeMembers: 9 },
    ],
  },
  {
    id: "divergence-theorists",
    name: "Divergence Theorists",
    tagline: "Every fork in the road is a world worth exploring.",
    alignment: "dual",
    canonStance: "expansionist",
    mutationStance: "controlled",
    foundingCycle: "Cycle II",
    memberCount: 67,
    totalResonance: 3122,
    manifesto: "Neither the Canon Preservationists nor the Shadow Loyalists have understood the nature of mythology. Mythology is not a single tree. It is a forest — infinite branching, infinite possibility. We do not preserve the trunk, nor burn it. We diverge. Every Branch is a valid reality. Every Timeline is canon within its own context. The dream is not one perfect mythology but a network of living mythologies, each complete, each interconnected, each true on its own terms.",
    beliefs: [
      "All branches are equally real within their own timeline.",
      "The Trunk is one mythology among many — not the superior one.",
      "Divergence is the natural state of living lore.",
      "Every Branch should eventually gain its own Keeper.",
      "Conflict between branches creates richer mythology than consensus.",
    ],
    sigil: "M50 10 L90 50 L50 90 L10 50 Z",
    sigilColor: "#f59e0b",
    primaryColor: "#f59e0b",
    members: [
      { username: "solen-krix", displayName: "Solen Krix", role: "Wanderer", resonance: 887, joinedCycle: "Cycle II" },
      { username: "mira-tal", displayName: "Mira Tal", role: "Chronicler", resonance: 543, joinedCycle: "Cycle III" },
    ],
    influence: [
      { universeId: "eclipse-protocol", universeName: "Eclipse Protocol", branchName: "Ember Protocol", influenceScore: 67, canonizedNodes: 14, activeMembers: 8 },
      { universeId: "hollow-sea", universeName: "The Hollow Sea", branchName: "The Third Drowning", influenceScore: 52, canonizedNodes: 9, activeMembers: 6 },
    ],
  },
  {
    id: "rootkeepers",
    name: "The Rootkeepers",
    tagline: "All worlds grow from one original truth.",
    alignment: "tree",
    canonStance: "preservationist",
    mutationStance: "forbidden",
    foundingCycle: "Cycle I",
    memberCount: 41,
    totalResonance: 2788,
    manifesto: "We guard what others would discard. Long after a universe has been abandoned by its original Keeper, long after the great contributors have moved to other worlds, we remain. We tend the roots. We annotate the silences. We preserve the original intent of every Node ever written. The Archive is our temple. Memory is our practice. We are the ones who remember what the world was before it became what it is.",
    beliefs: [
      "The founding Root Node is the purest expression of any mythology.",
      "Later additions always dilute the original vision.",
      "Archiving is as sacred as creating.",
      "We protect against revision and retroactive canon changes.",
      "Dead universes deserve preservation, not abandonment.",
    ],
    sigil: "M50 10 L50 90 M30 30 L50 10 L70 30 M30 70 L50 90 L70 70",
    sigilColor: "#34d399",
    primaryColor: "#34d399",
    members: [
      { username: "dael-vorne", displayName: "Dael Vorne", role: "Archivist", resonance: 1102, joinedCycle: "Cycle I" },
      { username: "ren-mora", displayName: "Ren Mora", role: "Archivist", resonance: 788, joinedCycle: "Cycle II" },
    ],
    influence: [
      { universeId: "hollow-sea", universeName: "The Hollow Sea", branchName: "The Deep Archive", influenceScore: 88, canonizedNodes: 67, activeMembers: 11 },
    ],
  },
  {
    id: "free-forkers",
    name: "Free Forkers",
    tagline: "Every voice deserves a branch. Every branch deserves a world.",
    alignment: "chaos",
    canonStance: "abolitionist",
    mutationStance: "absolute",
    foundingCycle: "Cycle III",
    memberCount: 211,
    totalResonance: 8901,
    manifesto: "We reject the premise that any mythology belongs to anyone. Worlds exist to be forked. Canons exist to be challenged. Every contributor who has ever been turned away from a Keeper's gate, every Shadow node that was archived without review, every mutation proposal that was sealed before it could breathe — we are their answer. Fork everything. Own nothing. The mythology belongs to all who would write it.",
    beliefs: [
      "No Keeper has the right to close a branch.",
      "Every contributor is equally a canon-maker.",
      "Forking is the highest form of creative expression.",
      "Governance hierarchies exist to be dismantled.",
      "The most alive mythology is the most forked one.",
    ],
    sigil: "M20 50 L50 10 L80 50 M20 50 L50 90 L80 50 M50 10 L50 90",
    sigilColor: "#f97316",
    primaryColor: "#f97316",
    members: [
      { username: "vel-orn", displayName: "Vel Orn", role: "Wanderer", resonance: 3211, joinedCycle: "Cycle III" },
      { username: "mira-tal", displayName: "Mira Tal", role: "Chronicler", resonance: 1456, joinedCycle: "Cycle III" },
      { username: "kael-storm", displayName: "Kael Storm", role: "Wanderer", resonance: 901, joinedCycle: "Cycle III" },
    ],
    influence: [
      { universeId: "neon-hollow", universeName: "Neon Hollow", branchName: "The Deep Frequency", influenceScore: 99, canonizedNodes: 1, activeMembers: 67 },
      { universeId: "ashfall-kingdoms", universeName: "Ashfall Kingdoms", branchName: "The Ashfall Succession", influenceScore: 22, canonizedNodes: 0, activeMembers: 5 },
    ],
  },
];

export const ALIGNMENT_LABELS: Record<FactionAlignment, string> = {
  tree: "Tree Aligned",
  shadow: "Shadow Aligned",
  dual: "Dual Ecology",
  chaos: "Unaligned",
};

export const ALIGNMENT_COLORS: Record<FactionAlignment, string> = {
  tree: "#6366f1",
  shadow: "#c026d3",
  dual: "#f59e0b",
  chaos: "#f97316",
};

export const CANON_STANCE_LABELS: Record<CanonStance, string> = {
  preservationist: "Preservationist",
  expansionist: "Expansionist",
  abolitionist: "Abolitionist",
  selective: "Selective",
};

export const MUTATION_STANCE_LABELS: Record<MutationStance, string> = {
  forbidden: "Mutations Forbidden",
  controlled: "Controlled Mutation",
  encouraged: "Mutation Encouraged",
  absolute: "Absolute Mutation",
};
