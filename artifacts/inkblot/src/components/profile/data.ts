export type RoleIdentity =
  | "Keeper"
  | "Chronicler"
  | "Wanderer"
  | "Architect"
  | "Archivist"
  | "Shadowborn"
  | "Mythsmith";

export const ROLE_DESCRIPTIONS: Record<RoleIdentity, string> = {
  Keeper: "Guardian of canon. Holds the final word on what becomes truth.",
  Chronicler: "Storyteller of the living record. Documents what others create.",
  Wanderer: "Explorer of branches. Leaves echoes across many worlds.",
  Architect: "Builder of worlds. Structures the bones of mythology.",
  Archivist: "Cataloguer of lore. Preserves the deep history.",
  Shadowborn: "Dweller in the Shadow. Mutations and remixes are their art.",
  Mythsmith: "Forger of myth. Creates foundational nodes that outlast their creator.",
};

export type ContributionType = "canon" | "shadow" | "branch" | "review";

export interface ContributionEntry {
  id: string;
  type: ContributionType;
  title: string;
  universe: string;
  timestamp: string;
  canonized?: boolean;
}

export interface UniverseParticipationEntry {
  id: string;
  name: string;
  role: RoleIdentity;
  nodesContributed: number;
  canonizedNodes: number;
  branchesSeeded: number;
  lastActive: string;
  color: string;
}

export interface ProfileData {
  username: string;
  displayName: string;
  role: RoleIdentity;
  memberSince: string;
  lore: string;
  stats: {
    canonizedNodes: number;
    shadowMutations: number;
    branchesSprouted: number;
    universesJoined: number;
    lineageDepth: number;
    totalContributions: number;
  };
  universes: UniverseParticipationEntry[];
  recentContributions: ContributionEntry[];
  factions: string[];
}

export const PROFILE_DATA: ProfileData = {
  username: "lorekeeper",
  displayName: "Elarys Vane",
  role: "Mythsmith",
  memberSince: "Year I of the Archive",
  lore: "Born in the shadow of the first tree, Elarys writes mythology that outlasts the worlds that contain it. Eleven canonized roots. Three branches that became their own trunks. The Hollow Sea bends around her words.",
  stats: {
    canonizedNodes: 47,
    shadowMutations: 112,
    branchesSprouted: 18,
    universesJoined: 6,
    lineageDepth: 9,
    totalContributions: 231,
  },
  universes: [
    { id: "hollow-sea", name: "The Hollow Sea", role: "Keeper", nodesContributed: 89, canonizedNodes: 34, branchesSeeded: 7, lastActive: "2 hours ago", color: "#60a5fa" },
    { id: "ashfall-kingdoms", name: "Ashfall Kingdoms", role: "Chronicler", nodesContributed: 67, canonizedNodes: 11, branchesSeeded: 5, lastActive: "1 day ago", color: "#f59e0b" },
    { id: "neon-hollow", name: "Neon Hollow", role: "Shadowborn", nodesContributed: 41, canonizedNodes: 2, branchesSeeded: 4, lastActive: "3 days ago", color: "#c026d3" },
    { id: "eclipse-protocol", name: "Eclipse Protocol", role: "Wanderer", nodesContributed: 23, canonizedNodes: 0, branchesSeeded: 2, lastActive: "1 week ago", color: "#34d399" },
  ],
  recentContributions: [
    { id: "c1", type: "canon", title: "The Third Drowning", universe: "The Hollow Sea", timestamp: "2 hours ago", canonized: true },
    { id: "c2", type: "shadow", title: "What the Salt Remembers", universe: "The Hollow Sea", timestamp: "1 day ago", canonized: false },
    { id: "c3", type: "branch", title: "The Ashfall Succession", universe: "Ashfall Kingdoms", timestamp: "2 days ago", canonized: false },
    { id: "c4", type: "canon", title: "Protocol Zero", universe: "Eclipse Protocol", timestamp: "3 days ago", canonized: true },
    { id: "c5", type: "shadow", title: "Neon Requiem", universe: "Neon Hollow", timestamp: "4 days ago", canonized: false },
    { id: "c6", type: "review", title: "Canon Review: The First Tide", universe: "The Hollow Sea", timestamp: "5 days ago", canonized: true },
    { id: "c7", type: "branch", title: "Ember Protocol", universe: "Eclipse Protocol", timestamp: "1 week ago", canonized: false },
    { id: "c8", type: "canon", title: "The God Who Broke", universe: "Ashfall Kingdoms", timestamp: "2 weeks ago", canonized: true },
  ],
  factions: ["Circle of the Deep Archive", "Hollow Sea Keepers", "The Ashfall Chroniclers"],
};