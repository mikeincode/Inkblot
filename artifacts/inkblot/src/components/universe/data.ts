import { TrunkNode, BranchNode } from "./types";

export const TRUNK_NODES: TrunkNode[] = [
  { id: "t1", label: "The First Ember", type: "origin", depth: 0, summary: "The world-seed event. Fire born from the dying god Ashur." },
  { id: "t2", label: "Rise of the Ashfall Kingdoms", type: "chapter", depth: 1, summary: "Four kingdoms form in the aftermath of the Cinder Wars." },
  { id: "t3", label: "The Iron Compact", type: "lore", depth: 2, summary: "A political treaty signed in ash and blood." },
  { id: "t4", label: "Age of Embers", type: "chapter", depth: 3, summary: "A century of fragile peace before the Second Burning." },
  { id: "t5", label: "The Second Burning", type: "event", depth: 4, summary: "Volcanic catastrophe reshapes the continent." },
  { id: "t6", label: "Solvara's Ascent", type: "canon", depth: 5, summary: "The Last Ember Queen rises from the ruins." },
];

export const BRANCHES: BranchNode[] = [
  { id: "b1", label: "The Forgotten Vaults", trunkNodeId: "t2", strength: "major", nodes: 18, contributors: 12, summary: "What lies buried beneath the oldest kingdom?" },
  { id: "b2", label: "Ashur's Remnants", trunkNodeId: "t3", strength: "major", nodes: 31, contributors: 24, summary: "A cult that worships the original dying god." },
  { id: "b3", label: "The Cold Compact", trunkNodeId: "t3", strength: "minor", nodes: 4, contributors: 2, summary: "An alternate treaty that never existed in canon." },
  { id: "b4", label: "Ember Wars Retold", trunkNodeId: "t4", strength: "thriving", nodes: 67, contributors: 41, summary: "The full history from the soldiers' perspective." },
  { id: "b5", label: "The Ninth Kingdom", trunkNodeId: "t5", strength: "minor", nodes: 7, contributors: 3, summary: "A secret kingdom hidden in volcanic tunnels." },
  { id: "b6", label: "Solvara's Shadow", trunkNodeId: "t6", strength: "major", nodes: 22, contributors: 15, summary: "What the Ember Queen sacrificed to rise." },
  { id: "b7", label: "The Glass Prophets", trunkNodeId: "t1", strength: "fading", nodes: 2, contributors: 1, summary: "Seers who foresaw the First Ember." },
];

export const SHADOW_BRANCHES: BranchNode[] = [
  { id: "s1", label: "Ashur Never Died", trunkNodeId: "t1", strength: "thriving", nodes: 89, contributors: 52, summary: "What if the god survived?" },
  { id: "s2", label: "The Fifth Kingdom", trunkNodeId: "t2", strength: "major", nodes: 34, contributors: 18 },
  { id: "s3", label: "Cinder Punk", trunkNodeId: "t5", strength: "thriving", nodes: 113, contributors: 77, summary: "Industrial revolution in a volcanic wasteland." },
  { id: "s4", label: "No Compact, Ever", trunkNodeId: "t3", strength: "fading", nodes: 3, contributors: 1 },
  { id: "s5", label: "The Ember Queen's Daughter", trunkNodeId: "t6", strength: "major", nodes: 28, contributors: 14 },
];
