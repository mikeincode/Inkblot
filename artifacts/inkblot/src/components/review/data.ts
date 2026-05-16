export type Submission = {
  id: string;
  title: string;
  type: string;
  author: string;
  authorInitial: string;
  branch: string;
  timeline: string;
  trunkAnchor: string;
  shadowInfluence: boolean;
  mutationAncestry: string | null;
  submittedAt: string;
  excerpt: string;
  body: string;
  contributorNote: string;
};

export const PENDING_SUBMISSIONS: Submission[] = [
  {
    id: "sub1",
    title: "The Ember Oath",
    type: "Lore",
    author: "Kael Theron",
    authorInitial: "K",
    branch: "b4",         // Ember Wars Retold
    timeline: "Cinder Campaign II",
    trunkAnchor: "t4",    // Age of Embers
    shadowInfluence: false,
    mutationAncestry: null,
    submittedAt: "2h ago",
    excerpt: "Before each campaign began, the soldiers of the four kingdoms swore an oath over cooling embers. The words were never written — only spoken, and only once.",
    body: `Before each campaign began, the soldiers of the four kingdoms swore an oath over cooling embers. The words were never written — only spoken, and only once.

The Ember Oath bound the speaker to the fire. To break it was not merely a dishonor — it was believed to invite the Second Burning upon one's bloodline. Three generations. Three burnings. So it was said.

General Maret Solh was the last keeper of the full oath. She died at the Siege of Varek Crossing without passing the words on. What survives is a fragment: "In ash we were born. In ash we will end. Let the fire remember what we forget."

Historians debate whether the oath was tactical — a binding of soldier loyalty — or genuinely theological. The truth may be that the soldiers themselves did not know.`,
    contributorNote: "This lore fills the gap between t4 and t5 — the psychological framework soldiers used before the Second Burning.",
  },
  {
    id: "sub2",
    title: "The Glass Council",
    type: "Faction",
    author: "Nara Vel",
    authorInitial: "N",
    branch: "b7",         // The Glass Prophets
    timeline: "Prophecy's End",
    trunkAnchor: "t1",    // The First Ember
    shadowInfluence: true,
    mutationAncestry: "Seers who foresaw the First Ember",
    submittedAt: "5h ago",
    excerpt: "Twelve prophets who each saw the First Ember from a different angle. Twelve different truths. Twelve irreconcilable records.",
    body: `Twelve prophets who each saw the First Ember from a different angle. Twelve different truths. Twelve irreconcilable records.

The Glass Council was formed not to reconcile these visions — that was agreed to be impossible — but to preserve each one intact, sealed in glass archives beneath the oldest temple. One seer per vision. One vault per seer.

The Council's mandate: never interpret. Never synthesize. Only preserve.

This made them the most powerful and most useless scholars in the Ashfall world. They held the truth in eleven different containers. None of them could tell you which container to open.`,
    contributorNote: "This connects The Glass Prophets branch (b7) back to the First Ember. Has shadow influence because I referenced the Ashur Never Died branch for the 12th seer's vision.",
  },
  {
    id: "sub3",
    title: "Solvara's First Word",
    type: "Myth",
    author: "J.R. Scribe",
    authorInitial: "J",
    branch: "b6",         // Solvara's Shadow
    timeline: "Before the Crown",
    trunkAnchor: "t6",    // Solvara's Ascent
    shadowInfluence: false,
    mutationAncestry: null,
    submittedAt: "1d ago",
    excerpt: "The myth holds that Solvara spoke one word before she was named queen. Not a name. Not a vow. A question.",
    body: `The myth holds that Solvara spoke one word before she was named queen. Not a name. Not a vow. A question.

"Still?"

The chamberlains who heard it recorded it differently. Some wrote "Still?" as in: is the fire still burning? Others wrote "Still" as a command — an instruction to the room to hold its breath.

One record — the Vel Codex, now considered apocryphal — writes it as "Stilled," past tense. As if she was announcing something already completed.

The myth survives because no one agreed on what she meant. A truth that cannot be settled becomes a story. A story that persists becomes mythology.`,
    contributorNote: "This is purely mythological — meant to be ambiguous and unresolvable. I'd like it canonized but understand if it becomes a branch instead.",
  },
  {
    id: "sub4",
    title: "The Ash Market",
    type: "Location",
    author: "Tev Ashhar",
    authorInitial: "T",
    branch: "b1",         // The Forgotten Vaults
    timeline: "Beneath the Old Keep",
    trunkAnchor: "t2",    // Rise of the Ashfall Kingdoms
    shadowInfluence: false,
    mutationAncestry: null,
    submittedAt: "2d ago",
    excerpt: "Below the capital's foundation stones, merchants traded in things that should not have survived the Cinder Wars.",
    body: `Below the capital's foundation stones, merchants traded in things that should not have survived the Cinder Wars.

The Ash Market had no official name. It was called the Market because things were sold there. It was called Ash because everything for sale was touched by burning — scorched documents, melted coins restruck with new faces, fabric that smelled of smoke no matter how many times it was washed.

The most valuable goods were the provenance records — papers proving that a given family, a given bloodline, had existed before the Cinder Wars. These were sold to families who had survived but whose records had not. A new past, purchased with old coin.

The Market was never officially discovered. It was simply stopped being discussed. One generation's necessity is the next generation's disgrace.`,
    contributorNote: "This fills out the underground economy of the Rise era. Could work as canon or as a Forgotten Vaults branch node.",
  },
];
