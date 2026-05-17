export type ThreadType =
  | "canon-debate"
  | "lore-theory"
  | "mutation-proposal"
  | "timeline-analysis"
  | "branch-strategy"
  | "shadow-rumor";

export const THREAD_TYPE_LABELS: Record<ThreadType, string> = {
  "canon-debate": "Canon Debate",
  "lore-theory": "Lore Theory",
  "mutation-proposal": "Mutation Proposal",
  "timeline-analysis": "Timeline Analysis",
  "branch-strategy": "Branch Strategy",
  "shadow-rumor": "Shadow Rumor",
};

export const THREAD_TYPE_COLORS: Record<ThreadType, string> = {
  "canon-debate": "#f59e0b",    // amber — contested, heat
  "lore-theory": "#60a5fa",     // blue — scholarly
  "mutation-proposal": "#c026d3", // violet — shadow energy
  "timeline-analysis": "#34d399", // emerald — analytical
  "branch-strategy": "#6366f1",  // indigo — structural
  "shadow-rumor": "#7e22ce",     // deep purple — whispered
};

export interface ReplyEntry {
  id: string;
  author: string;
  authorRole: string;
  body: string;
  timestamp: string;
  alignment: "tree" | "shadow" | "neutral";
}

export interface ThreadEntry {
  id: string;
  type: ThreadType;
  title: string;
  body: string;
  author: string;
  authorRole: string;
  timestamp: string;
  resonance: number;
  replies: ReplyEntry[];
  isPinned?: boolean;
  isSealed?: boolean;
}

export interface BranchData {
  id: string;
  universeName: string;
  universeId: string;
  branchName: string;
  branchTagline: string;
  rootNodeTitle: string;
  branchDepth: number;
  activeContributors: number;
  governance: string;
  threads: ThreadEntry[];
  factions: { name: string; alignment: "tree" | "shadow"; memberCount: number }[];
  relatedBranches: { id: string; name: string; depth: number }[];
}

export const BRANCH_DATA: BranchData = {
  id: "ashfall-succession",
  universeName: "Ashfall Kingdoms",
  universeId: "ashfall-kingdoms",
  branchName: "The Ashfall Succession",
  branchTagline: "Who rules after the last king breaks?",
  rootNodeTitle: "The God Who Broke",
  branchDepth: 3,
  activeContributors: 34,
  governance: "Curated Tree",
  threads: [
    {
      id: "t1",
      type: "canon-debate",
      title: "Did the Second Heir actually burn the treaty — or was this retconned?",
      body: "The original Root Node states the treaty was sealed in ashstone, which is supposedly indestructible. Yet Node 17 by Chronicler Mave has the Second Heir burning it in the Great Hall. These two canonical records cannot coexist. One must be challenged before the Trunk accepts either.",
      author: "Elarys Vane",
      authorRole: "Mythsmith",
      timestamp: "3 hours ago",
      resonance: 47,
      isPinned: true,
      replies: [
        {
          id: "r1",
          author: "Chronicler Mave",
          authorRole: "Chronicler",
          body: "The ashstone reference is in the Closed Version of the treaty, not the one ratified after the God's Breaking. Two treaties existed. Both were authentic. The burning was of the second copy.",
          timestamp: "2 hours ago",
          alignment: "tree",
        },
        {
          id: "r2",
          author: "Solen Krix",
          authorRole: "Wanderer",
          body: "This debate hinges on whether Node 4 or Node 9 established the primary continuity. The timeline forks here — we should seed a new Branch rather than fight over one Trunk.",
          timestamp: "1 hour ago",
          alignment: "neutral",
        },
        {
          id: "r3",
          author: "The Unmarked",
          authorRole: "Shadowborn",
          body: "From the Shadow: there is a third version of this scene. The heir burned nothing. The fire was the God's final breath escaping the ashstone. Both of you are looking at shadows of a deeper truth.",
          timestamp: "45 minutes ago",
          alignment: "shadow",
        },
      ],
    },
    {
      id: "t2",
      type: "lore-theory",
      title: "The Ashfall Kings were never human — a lineage analysis",
      body: "Cross-referencing Nodes 2, 5, 11, and 23 reveals a pattern: every King of the Ash throne has lived exactly 99 years, regardless of birth or war. This cannot be coincidence. The throne does not select rulers — it devours them slowly, feeding the land with their century.",
      author: "Dael Vorne",
      authorRole: "Archivist",
      timestamp: "1 day ago",
      resonance: 89,
      replies: [
        {
          id: "r4",
          author: "Elarys Vane",
          authorRole: "Mythsmith",
          body: "This tracks with the Hollow Root theory I submitted last cycle. The throne is not a seat — it is a ritual container. The King is always already the sacrifice.",
          timestamp: "23 hours ago",
          alignment: "tree",
        },
      ],
    },
    {
      id: "t3",
      type: "mutation-proposal",
      title: "Proposal: The Succession was never a political event — it was a summoning",
      body: "I am proposing a Shadow mutation of Node 12. The current canonical reading frames the Succession as a war of inheritance. I argue it was instead a deliberate ritual — the Heir was not fighting for the throne but completing a millennium-long invocation. Attached: 3 root nodes supporting this reading.",
      author: "Lyss Darkwood",
      authorRole: "Shadowborn",
      timestamp: "2 days ago",
      resonance: 31,
      replies: [],
    },
    {
      id: "t4",
      type: "timeline-analysis",
      title: "Mapping the three surviving timelines after Node 17",
      body: "Following Node 17's canonization, the Branch now has three active timelines diverging from it. This analysis maps where each timeline is heading and what canon gaps each one is racing to fill first.",
      author: "Solen Krix",
      authorRole: "Wanderer",
      timestamp: "3 days ago",
      resonance: 22,
      replies: [],
    },
    {
      id: "t5",
      type: "shadow-rumor",
      title: "Something stirs in the deep Shadow — the God did not break",
      body: "This is not a theory. This is a report. Three separate Shadow nodes, written by contributors who do not know each other, have independently described the same thing: a voice in the ash. The God is not dead. It is waiting.",
      author: "The Unmarked",
      authorRole: "Shadowborn",
      timestamp: "4 days ago",
      resonance: 67,
      isSealed: false,
      replies: [
        {
          id: "r5",
          author: "Dael Vorne",
          authorRole: "Archivist",
          body: "I have verified the three nodes referenced. They share no authorial fingerprint. This is either genuine emergence or the most sophisticated coordination this Branch has seen.",
          timestamp: "3 days ago",
          alignment: "neutral",
        },
      ],
    },
    {
      id: "t6",
      type: "branch-strategy",
      title: "We need a Keeper decision on the Succession timeline before it splinters further",
      body: "The Branch currently has 3 competing canon readings for the same 48-hour period post-Node 17. Without a Keeper ruling, the Branch will splinter into 3 parallel sub-branches. This is a call for Keeper action — or a community vote on which reading becomes canon.",
      author: "Dael Vorne",
      authorRole: "Archivist",
      timestamp: "5 days ago",
      resonance: 14,
      replies: [],
    },
  ],
  factions: [
    { name: "The Ashborne", alignment: "tree", memberCount: 14 },
    { name: "The Unmarked Succession", alignment: "shadow", memberCount: 9 },
    { name: "Children of the Breaking", alignment: "tree", memberCount: 11 },
  ],
  relatedBranches: [
    { id: "god-who-broke", name: "The God Who Broke", depth: 1 },
    { id: "ember-protocol", name: "Ember Protocol", depth: 2 },
    { id: "silent-throne", name: "The Silent Throne", depth: 4 },
  ],
};