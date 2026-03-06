export type ProjectTrack = "applied-ai" | "football-lab";
export type ProjectDomain = "vision" | "genai" | "ml-systems" | "data-pipeline";
export type ArtifactMode = "video-demo" | "demo-only";

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  track: ProjectTrack;
  domains: ProjectDomain[];
  artifactMode: ArtifactMode;
  description: {
    explain: string;
    builder: string;
  };
  modelCard: {
    task: string;
    data: string;
    model: string;
    keyMetric: string;
    latency: string;
    failureModes: string[];
  };
  tags: string[];
  status: "live" | "in-progress" | "research";
  caseStudy: {
    problem: string;
    approach: string;
    architecture: { step: string; detail: string }[];
    results: { label: string; value: string; note?: string }[];
    lessons: string[];
  };
}

export const projects: Project[] = [
  {
    slug: "tactical-vision",
    title: "Tactical Vision",
    tagline: "Computer vision for defensive shape intelligence",
    track: "football-lab",
    domains: ["vision", "ml-systems"],
    artifactMode: "demo-only",
    description: {
      explain:
        "From broadcast video, this system detects all players and the ball in real time, maps them to a normalized pitch, and measures whether a team block is compact or stretched.",
      builder:
        "YOLOv10 for player and ball detection, ByteTrack for identity persistence, homography via DLT for pitch projection, and threshold alerts when inter-line distance breaks tactical compactness rules.",
    },
    modelCard: {
      task: "Object Detection + Tracking + Tactical Metrics",
      data: "Broadcast football video (1080p, 25fps)",
      model: "YOLOv10-M (CUDA) + ByteTrack",
      keyMetric: "mAP@0.5: 0.89 | MOTA: 0.78",
      latency: "~28ms/frame on GTX 1650",
      failureModes: [
        "Camera angle changes can break homography",
        "Dense midfield occlusion degrades tracking",
        "Goalkeeper-net overlap causes false negatives",
      ],
    },
    tags: ["Computer Vision", "YOLOv10", "CUDA", "Tracking", "Homography"],
    status: "in-progress",
    caseStudy: {
      problem:
        "Coaches need objective feedback on defensive compactness during matches, but manual analysis is slow and subjective.",
      approach:
        "Build a real-time vision pipeline from broadcast footage to tactical metrics with a calibrated 2D pitch representation and alerting logic.",
      architecture: [
        { step: "Ingest", detail: "Decode 1080p stream and sample tactical frames" },
        { step: "Detect", detail: "Run YOLOv10-M for players and ball localization" },
        { step: "Track", detail: "Apply ByteTrack for temporal identity continuity" },
        { step: "Project", detail: "Estimate homography and map to 105x68m coordinates" },
        { step: "Analyze", detail: "Compute line distances, hull area, and compactness score" },
        { step: "Alert", detail: "Trigger tactical warnings when distance > 15m" },
      ],
      results: [
        { label: "mAP@0.5", value: "0.89", note: "Player and ball detection quality" },
        { label: "MOTA", value: "0.78", note: "Tracking consistency" },
        { label: "Latency", value: "28ms/frame", note: "Consumer GPU viable" },
        { label: "Homography RMSE", value: "1.2m", note: "Projection precision" },
      ],
      lessons: [
        "Adaptive homography recalibration is required for broadcast camera switches.",
        "Consumer-GPU optimization drove model sizing decisions without major quality loss.",
        "Tactical stakeholders trust metrics more when visual overlays explain them frame-by-frame.",
      ],
    },
  },
  {
    slug: "decision-intelligence",
    title: "Decision Intelligence",
    tagline: "Risk-reward pass recommendation engine",
    track: "football-lab",
    domains: ["ml-systems", "data-pipeline"],
    artifactMode: "demo-only",
    description: {
      explain:
        "Given a passing context, this engine scores all options and recommends the best expected value decision by balancing completion probability and expected threat gain.",
      builder:
        "StatsBomb freeze-frame features, xT lookup grid, defender pressure geometry, and a calibrated XGBoost/LightGBM ensemble produce ranked pass recommendations in milliseconds.",
    },
    modelCard: {
      task: "Pass Outcome Prediction + Decision Ranking",
      data: "StatsBomb open events + freeze frames",
      model: "XGBoost + LightGBM ensemble",
      keyMetric: "AUC-ROC: 0.83 | Brier: 0.18",
      latency: "~2ms per evaluated decision",
      failureModes: [
        "Event-data granularity limits temporal context",
        "No off-ball movement forecasting",
        "xT grid is static under dynamic pressure states",
      ],
    },
    tags: ["XGBoost", "LightGBM", "xT", "Feature Engineering", "Decisioning"],
    status: "in-progress",
    caseStudy: {
      problem:
        "Most pass decisions are still judged qualitatively; analysts need repeatable quantitative recommendations.",
      approach:
        "Train a pass completion model, combine with xT gain, and rank all available pass options at each freeze-frame.",
      architecture: [
        { step: "Collect", detail: "Load event and freeze-frame contexts" },
        { step: "Engineer", detail: "Build 25 features including pressure and angle" },
        { step: "Model", detail: "Train and calibrate ensemble probability model" },
        { step: "Score", detail: "Compute expected value as probability * xT gain" },
        { step: "Rank", detail: "Return optimal and suboptimal options" },
        { step: "Visualize", detail: "Render Voronoi ownership and pass trajectories" },
      ],
      results: [
        { label: "AUC-ROC", value: "0.83", note: "Pass completion discrimination" },
        { label: "Brier", value: "0.18", note: "Calibration quality" },
        { label: "Inference", value: "2ms", note: "Real-time recommendation" },
        { label: "Training Data", value: "300K+", note: "Action samples" },
      ],
      lessons: [
        "Tracking data would materially improve dynamic decision quality.",
        "Simple visual explanations improved trust for non-technical analysts.",
        "Calibrated probabilities matter more than raw model confidence for decision systems.",
      ],
    },
  },
  {
    slug: "scouting-engine",
    title: "Scouting Engine",
    tagline: "Automated hidden-talent matching pipeline",
    track: "football-lab",
    domains: ["data-pipeline", "ml-systems"],
    artifactMode: "demo-only",
    description: {
      explain:
        "A weekly ETL + ranking system that ingests player statistics, normalizes profiles, and identifies affordable alternatives to expensive transfer targets.",
      builder:
        "Selenium/Playwright scraping, PostgreSQL normalization, z-score harmonization by position, KNN cosine similarity, and Telegram delivery for scouting teams.",
    },
    modelCard: {
      task: "Player Similarity Search + Alerting",
      data: "fbref + Transfermarkt scraped weekly",
      model: "KNN cosine similarity (k=10)",
      keyMetric: "Similarity threshold >= 0.85",
      latency: "~12 minutes full weekly ETL",
      failureModes: [
        "Source HTML changes break selectors",
        "League and age bias in per-90 stats",
        "No tactical role context in tabular features",
      ],
    },
    tags: ["ETL", "PostgreSQL", "KNN", "Automation", "Scouting"],
    status: "in-progress",
    caseStudy: {
      problem:
        "Affordable scouting needs structured, recurring discovery workflows beyond manual video review.",
      approach:
        "Automate data collection, normalization, similarity indexing, and push delivery to scouts via a mobile-friendly channel.",
      architecture: [
        { step: "Scrape", detail: "Collect weekly stats from multiple football sources" },
        { step: "Normalize", detail: "Standardize entities and per-90 metrics in PostgreSQL" },
        { step: "Index", detail: "Compute z-score feature vectors by position" },
        { step: "Match", detail: "Run cosine KNN against target profile" },
        { step: "Filter", detail: "Apply age, league, and budget constraints" },
        { step: "Deliver", detail: "Send radar and shortlist alerts via Telegram" },
      ],
      results: [
        { label: "Coverage", value: "4200+", note: "Players across 8 leagues" },
        { label: "Dimensions", value: "28", note: "Per-90 feature space" },
        { label: "Pipeline", value: "12 min", note: "Weekly full run" },
        { label: "Alert quality", value: ">=0.85", note: "Similarity threshold" },
      ],
      lessons: [
        "Resilient selector fallback is mandatory for scraping reliability.",
        "Human review loops remain necessary for tactical fit validation.",
        "Push-based delivery increased adoption more than dashboard-based pull workflows.",
      ],
    },
  },
  {
    slug: "mindlyr-decision-engine",
    title: "Mindlyr Decision Engine",
    tagline: "Multi-tenant logic engine for automation agencies",
    track: "applied-ai",
    domains: ["ml-systems", "data-pipeline"],
    artifactMode: "demo-only",
    description: {
      explain:
        "A centralized decision engine that decouples business logic from workflow tooling, enabling reliable rule execution across tenants.",
      builder:
        "NestJS and Prisma backend, JsonLogic evaluation runtime, AJV schema validation, immutable QA snapshots, and a TypeScript SDK for external integrations.",
    },
    modelCard: {
      task: "Deterministic Rule Evaluation + QA Gating",
      data: "Tenant configuration + validated payload contracts",
      model: "JsonLogic runtime + JSON Schema (AJV)",
      keyMetric: "100% critical-path pass rate after gating",
      latency: "p95 < 40ms decision evaluation",
      failureModes: [
        "Contract drift between SDK and backend",
        "Rule complexity growth without modularity",
        "Snapshot mismatch during rapid version iteration",
      ],
    },
    tags: ["NestJS", "Prisma", "PostgreSQL", "TypeScript", "Reliability"],
    status: "live",
    caseStudy: {
      problem:
        "Automation agencies were coupling logic into brittle workflows, causing maintenance overhead and low portability.",
      approach:
        "Centralize decision execution in a multi-tenant backend with strict schema validation and immutable QA checkpoints.",
      architecture: [
        { step: "Model", detail: "Define tenant-safe entities and policy boundaries" },
        { step: "Validate", detail: "Enforce JSON contracts with AJV schemas" },
        { step: "Evaluate", detail: "Execute JsonLogic decisions in deterministic runtime" },
        { step: "Snapshot", detail: "Persist immutable versioned snapshots for QA" },
        { step: "Trace", detail: "Capture timing and branch traces for observability" },
        { step: "Integrate", detail: "Expose API + TypeScript SDK for partner tooling" },
      ],
      results: [
        { label: "Reliability", value: "100%", note: "Critical-path gates passing" },
        { label: "Latency p95", value: "<40ms", note: "Decision endpoint" },
        { label: "Tenancy", value: "Multi-tenant", note: "Isolation by design" },
        { label: "SDK adoption", value: "3rd-party ready", note: "Integration acceleration" },
      ],
      lessons: [
        "Developer ergonomics in the SDK drove adoption more than internal docs.",
        "Immutable snapshots reduced regression debugging time significantly.",
        "Validation first prevented entire classes of production incidents.",
      ],
    },
  },
  {
    slug: "aac-voice-cloning",
    title: "AAC Voice Cloning",
    tagline: "Hardware-aware TTS for assistive communication",
    track: "applied-ai",
    domains: ["genai", "vision", "ml-systems"],
    artifactMode: "demo-only",
    description: {
      explain:
        "Applied GenAI project focused on voice cloning for AAC devices, balancing quality, latency, and memory for constrained hardware environments.",
      builder:
        "Python-based audio pipeline with VAD and diarization preprocessing, optimized TTS fine-tuning via LoRA/QLoRA, quantized inference, and FastAPI deployment for production-like usage.",
    },
    modelCard: {
      task: "Voice Cloning + Inference Optimization",
      data: "Curated raw audio corpus with metadata and segmentation",
      model: "Optimized TTS stack with LoRA/QLoRA adaptations",
      keyMetric: "MOS proxy + latency-memory Pareto selection",
      latency: "Real-time capable on constrained CPU/GPU profiles",
      failureModes: [
        "Speaker leakage in noisy source audio",
        "Prosody instability in very short segments",
        "Quality drop under aggressive quantization",
      ],
    },
    tags: ["Generative AI", "TTS", "LoRA", "FastAPI", "Audio ML"],
    status: "research",
    caseStudy: {
      problem:
        "AAC users need personalized voices, but many deployment environments are resource-constrained and cannot host large models.",
      approach:
        "Build a full audio-to-inference pipeline with careful preprocessing and hardware-aware optimization for practical deployment.",
      architecture: [
        { step: "Ingest", detail: "Collect raw audio and generate metadata catalog" },
        { step: "Preprocess", detail: "Apply VAD, diarization, and segment curation" },
        { step: "Adapt", detail: "Fine-tune TTS with LoRA/QLoRA strategies" },
        { step: "Optimize", detail: "Quantize and benchmark across target devices" },
        { step: "Serve", detail: "Expose inference API with FastAPI" },
        { step: "Evaluate", detail: "Track quality-latency-memory trade-offs" },
      ],
      results: [
        { label: "Deployment", value: "Hardware-aware", note: "CPU/GPU constrained profiles" },
        { label: "Pipeline", value: "End-to-end", note: "Audio ingestion to API output" },
        { label: "Optimization", value: "LoRA/QLoRA", note: "Resource-efficient tuning" },
        { label: "Domain", value: "AAC", note: "Assistive communication focus" },
      ],
      lessons: [
        "Audio data quality is the dominant factor for perceived output quality.",
        "Quantization must be tuned per hardware target, not globally.",
        "Clinical-domain feedback loops are essential for practical reliability.",
      ],
    },
  },
];
