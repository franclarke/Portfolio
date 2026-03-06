export interface ProfileIdentity {
  name: string;
  role: string;
  location: string;
  headline: string;
  summary: string;
}

export interface ProfileContact {
  email: string;
  github: string;
  linkedin: string;
  cvHref: string;
}

export interface EducationEntry {
  institution: string;
  degree: string;
  period: string;
  focus: string;
}

export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  type: string;
  highlights: string[];
  stack: string[];
}

export interface MilestoneEntry {
  id: string;
  period: string;
  title: string;
  description: string;
  tags: string[];
}

export const profile = {
  identity: {
    name: "Francisco Clarke",
    role: "Junior AI Engineer - Generative AI and Applied ML",
    location: "Bahia Blanca, Argentina",
    headline: "From noisy data to reliable decisions.",
    summary:
      "Applied AI/ML engineer with hands-on production experience across computer vision, generative audio systems, and decision APIs. I build systems that balance quality, latency, and reliability under real-world constraints.",
  } satisfies ProfileIdentity,
  contact: {
    email: "ffranclarke@gmail.com",
    github: "https://github.com/franclarke",
    linkedin: "https://linkedin.com/in/franciscoclarke",
    cvHref: "/cv/Clarke-Francisco.pdf",
  } satisfies ProfileContact,
  education: [
    {
      institution: "Universidad Nacional del Sur",
      degree: "Information Systems Engineering",
      period: "2018 - 2026",
      focus:
        "Thesis/PPS: Voice cloning for AAC devices with optimized TTS and hardware-aware deployment.",
    },
  ] satisfies EducationEntry[],
  experience: [
    {
      company: "Neufitech SRL",
      role: "Junior AI Engineer - Generative AI (Applied ML)",
      period: "Sep 2025 - Present",
      type: "Internship / Professional Practice",
      highlights: [
        "Developed and debugged FastAPI endpoints for model inference and internal tooling.",
        "Built end-to-end ML pipelines from ingestion to inference with reproducible workflows.",
        "Implemented raw-audio pipelines: cleaning, segmentation, metadata generation, and validation.",
        "Optimized constrained deployments with quantization and LoRA/QLoRA strategies.",
        "Collaborated with domain experts to validate outputs and iterate on system behavior.",
      ],
      stack: [
        "Python",
        "FastAPI",
        "PyTorch",
        "Docker",
        "Git",
        "GitHub Actions",
        "FFmpeg",
        "AWS/S3 (basic)",
      ],
    },
  ] satisfies ExperienceEntry[],
  careerMilestones: [
    {
      id: "uns",
      period: "2018 - 2026",
      title: "Information Systems Engineering - UNS",
      description:
        "Built strong systems and data foundations while specializing in applied ML deployment.",
      tags: ["Systems", "Data", "Engineering"],
    },
    {
      id: "neufitech",
      period: "Sep 2025 - Present",
      title: "Neufitech SRL - Junior AI Engineer",
      description:
        "Applied GenAI work focused on audio generation, inference APIs, and constrained deployment.",
      tags: ["GenAI", "Applied ML", "Production"],
    },
    {
      id: "aac",
      period: "Current Track",
      title: "AAC Voice Cloning Research",
      description:
        "Optimizing personalized TTS for assistive communication devices with hardware-aware trade-offs.",
      tags: ["TTS", "Optimization", "Assistive Tech"],
    },
    {
      id: "football",
      period: "Future Track",
      title: "Football Intelligence Lab",
      description:
        "Developing computer vision and decision intelligence systems for tactical analysis in football.",
      tags: ["Vision", "Decisioning", "Football Lab"],
    },
  ] satisfies MilestoneEntry[],
};
