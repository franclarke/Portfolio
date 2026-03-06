import type { ProjectTrack } from "@/content/data/projects";

export type AtlasFaceKey =
  | "vision"
  | "genai"
  | "ml-systems"
  | "reliability"
  | "experience"
  | "football-lab";

export interface AtlasFace {
  key: AtlasFaceKey;
  label: string;
  description: string;
  sectionId: "pareto" | "projects" | "reliability" | "experience";
  track?: ProjectTrack;
}

export const atlasFaces: AtlasFace[] = [
  {
    key: "vision",
    label: "Vision",
    description: "Computer vision and detection systems",
    sectionId: "projects",
    track: "applied-ai",
  },
  {
    key: "genai",
    label: "GenAI",
    description: "Generative pipelines and inference APIs",
    sectionId: "projects",
    track: "applied-ai",
  },
  {
    key: "ml-systems",
    label: "ML Systems",
    description: "Trade-offs, optimization, and system design",
    sectionId: "pareto",
  },
  {
    key: "reliability",
    label: "Reliability",
    description: "QA gates, snapshots, and traces",
    sectionId: "reliability",
  },
  {
    key: "experience",
    label: "Experience",
    description: "Education and professional journey",
    sectionId: "experience",
  },
  {
    key: "football-lab",
    label: "Football Lab",
    description: "Tactical intelligence and scouting analytics",
    sectionId: "projects",
    track: "football-lab",
  },
];

export const atlasFaceByKey = atlasFaces.reduce((acc, face) => {
  acc[face.key] = face;
  return acc;
}, {} as Record<AtlasFaceKey, AtlasFace>);
