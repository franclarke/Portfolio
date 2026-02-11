export interface Project {
    slug: string;
    title: string;
    tagline: string;
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
        tagline: "Detección Automática de Bloques y Presión",
        description: {
            explain:
                "From broadcast video, this system detects all 22 players and the ball in real time, projects them onto a top-down tactical view, and measures whether a team's defensive block is compact or dangerously stretched.",
            builder:
                "YOLOv10 with CUDA optimization for player+ball detection on broadcast feeds. ByteTrack/DeepSORT for multi-object tracking. Homography estimation via DLT to project detections to a 2D pitch model. Convex hull of 10 outfield players computes block area; threshold-based alerts trigger when inter-line distance exceeds 15m.",
        },
        modelCard: {
            task: "Object Detection + Tracking + Tactical Analysis",
            data: "Broadcast video feeds (1080p, 25fps)",
            model: "YOLOv10-M (CUDA) + ByteTrack",
            keyMetric: "mAP@0.5: 0.89 | Tracking MOTA: 0.78",
            latency: "~28ms/frame on GTX 1650",
            failureModes: [
                "Camera angle changes break homography",
                "Occlusion in crowded areas",
                "Goalkeeper detection near goal",
            ],
        },
        tags: ["Computer Vision", "YOLOv10", "CUDA", "ByteTrack", "Tracking"],
        status: "in-progress",
        caseStudy: {
            problem:
                "Coaches need real-time feedback on defensive structure during matches. Current manual video analysis takes 2-3 hours per match and depends on subjective interpretation. There's no automated way to measure whether a team's defensive block is compact or dangerously stretched from broadcast footage.",
            approach:
                "Build an end-to-end pipeline that takes broadcast video as input and outputs real-time tactical metrics. Use object detection (YOLOv10) for player/ball localization, multi-object tracking (ByteTrack) for identity persistence across frames, and homography estimation (DLT) to project detections onto a standardized 2D pitch model. Compute defensive line positions and inter-line distances as quantitative compactness metrics.",
            architecture: [
                { step: "Ingest", detail: "Broadcast video at 1080p/25fps → frame extraction pipeline" },
                { step: "Detect", detail: "YOLOv10-M with CUDA: 22 players + ball per frame, ~28ms/frame on GTX 1650" },
                { step: "Track", detail: "ByteTrack for temporal consistency, handles occlusions and re-identification" },
                { step: "Project", detail: "4-point homography via DLT maps pixel coords → pitch coordinates (105×68m)" },
                { step: "Analyze", detail: "Compute defensive/midfield line Y positions, inter-line distance, convex hull area" },
                { step: "Alert", detail: "Threshold-based alerts when distance > 15m ('DESEQUILIBRIO')" },
            ],
            results: [
                { label: "mAP@0.5", value: "0.89", note: "Player+ball detection accuracy" },
                { label: "MOTA", value: "0.78", note: "Multi-object tracking accuracy" },
                { label: "Inference", value: "28ms/frame", note: "GTX 1650, real-time capable" },
                { label: "Homography RMSE", value: "1.2m", note: "Projection accuracy on pitch" },
            ],
            lessons: [
                "Camera angle changes during broadcasts break the homography matrix — need an adaptive re-estimation pipeline for production use.",
                "Goalkeeper detection near the goal is the hardest case due to visual similarity with the net. Custom anchor ratios improved recall by 12%.",
                "Optimizing for GTX 1650 forced architectural choices (YOLOv10-M over v10-L) that actually improved latency without meaningful accuracy loss.",
            ],
        },
    },
    {
        slug: "decision-intelligence",
        title: "Decision Intelligence",
        tagline: "Motor de Pase Óptimo — Riesgo vs Recompensa",
        description: {
            explain:
                "Given any passing situation, this engine evaluates every possible option and recommends the optimal pass — balancing completion probability against territorial gain. It reveals whether a player chose wisely or left value on the pitch.",
            builder:
                "StatsBomb event data enriched with freeze-frame player positions. Feature engineering: distance to nearest defender, pressure angle, expected threat (xT) gain, receiver body orientation. XGBoost/LightGBM ensemble predicts pass completion probability. Voronoi tessellation from player positions defines space ownership.",
        },
        modelCard: {
            task: "Pass Outcome Prediction + Optimal Decision",
            data: "StatsBomb open data (enriched with xT grid)",
            model: "XGBoost/LightGBM ensemble",
            keyMetric: "AUC-ROC: 0.83 | Brier Score: 0.18",
            latency: "~2ms per decision evaluation",
            failureModes: [
                "Limited to event data granularity",
                "No off-ball movement prediction",
                "xT grid assumes static field state",
            ],
        },
        tags: ["XGBoost", "LightGBM", "StatsBomb", "Feature Engineering", "xT"],
        status: "in-progress",
        caseStudy: {
            problem:
                "Football analysts evaluate passing decisions qualitatively. There's no systematic way to measure whether a player chose the best available pass or left value on the pitch. Existing xG models focus on shots — passing decisions remain unquantified.",
            approach:
                "Use StatsBomb open data (enriched with freeze-frame positions) to build a pass completion probability model and an expected threat (xT) grid. For any given passing situation, evaluate all possible receiver options, compute completion probability and xT gain for each, and identify the optimal pass. Visualize space ownership via Voronoi tessellation.",
            architecture: [
                { step: "Data", detail: "StatsBomb open data: events + freeze frames with 22-player positions" },
                { step: "Features", detail: "25 features per pass: distance, angle, defender pressure, receiver orientation, xT grid lookup" },
                { step: "Model", detail: "XGBoost/LightGBM ensemble for completion probability (AUC-ROC: 0.83)" },
                { step: "xT Grid", detail: "12×8 pitch grid trained on 300K+ actions mapping position → goal probability" },
                { step: "Evaluate", detail: "For each situation: score all possible passes, rank by expected value (prob × xT gain)" },
                { step: "Visualize", detail: "Canvas2D Voronoi tessellation showing space ownership + optimal pass overlay" },
            ],
            results: [
                { label: "AUC-ROC", value: "0.83", note: "Pass completion prediction" },
                { label: "Brier Score", value: "0.18", note: "Calibration quality" },
                { label: "Inference", value: "2ms/decision", note: "Real-time evaluation" },
                { label: "xT Coverage", value: "300K+ actions", note: "Training data volume" },
            ],
            lessons: [
                "Event data granularity is a ceiling — freeze frames only capture snapshots, not continuous movement. Tracking data would significantly improve the model.",
                "The xT grid assumes a static field state, which creates artifacts near the penalty area where dynamics change rapidly.",
                "Voronoi tessellation from player positions is computationally cheap and visually powerful for communicating space ownership to non-technical stakeholders.",
            ],
        },
    },
    {
        slug: "scouting-engine",
        title: "Scouting Engine",
        tagline: "ETL de Talento Oculto",
        description: {
            explain:
                "An automated system that scrapes football statistics weekly, normalizes player profiles, and finds hidden talent by computing similarity to reference players — like finding a cheap alternative to an expensive transfer target.",
            builder:
                "Selenium/Playwright scraping pipeline pulling data weekly from fbref and Transfermarkt. PostgreSQL normalized schema (players, seasons, metrics, market_values). KNN with cosine similarity on z-scored per-90 stats for player matching. Telegram bot API sends weekly 'talent alert' reports with radar charts.",
        },
        modelCard: {
            task: "Player Similarity + Automated Scouting Reports",
            data: "fbref + Transfermarkt (weekly scrape)",
            model: "KNN (cosine similarity, k=10)",
            keyMetric: "Cosine similarity threshold: 0.85",
            latency: "ETL pipeline: ~12 min/week",
            failureModes: [
                "Scraping targets can change HTML structure",
                "Age/league bias in similarity",
                "No tactical context in per-90 stats",
            ],
        },
        tags: ["ETL", "PostgreSQL", "Selenium", "KNN", "Telegram Bot"],
        status: "in-progress",
        caseStudy: {
            problem:
                "South American leagues have deep talent pools but limited data coverage in commercial scouting platforms. Manual scouting requires watching hundreds of hours of match footage per week. Clubs need an affordable way to systematically find players similar to expensive transfer targets.",
            approach:
                "Build a fully automated ETL pipeline that scrapes player statistics weekly, normalizes them into a structured database, and computes player similarity using KNN with cosine distance on z-scored per-90 metrics. Surface results via a Telegram bot that sends weekly 'talent alert' reports with radar charts to scouts.",
            architecture: [
                { step: "Scrape", detail: "Selenium/Playwright pipelines on fbref + Transfermarkt, scheduled weekly via cron" },
                { step: "Normalize", detail: "PostgreSQL schema: players, seasons, metrics, market_values — all per-90 normalized" },
                { step: "Index", detail: "Z-score standardization across position groups to enable fair comparison" },
                { step: "Match", detail: "KNN (k=10) with cosine similarity on 28 per-90 statistical dimensions" },
                { step: "Filter", detail: "Age, league, market value, and minimum minutes thresholds" },
                { step: "Report", detail: "Telegram Bot API sends formatted reports with radar charts and similarity scores" },
            ],
            results: [
                { label: "Similarity", value: "cos ≥ 0.85", note: "Quality threshold for alerts" },
                { label: "Pipeline", value: "12 min/week", note: "Full ETL cycle time" },
                { label: "Coverage", value: "4,200+ players", note: "Across 8 leagues" },
                { label: "Dimensions", value: "28 metrics", note: "Per-90 statistical features" },
            ],
            lessons: [
                "Scraping targets change HTML structure 2-3 times per year — the pipeline needs robust fallback selectors and change detection alerts.",
                "Per-90 stats have inherent age and league bias. A 21-year-old in Liga Profesional isn't directly comparable to a 28-year-old in the Premier League without adjustments.",
                "Telegram was the right distribution channel — scouts check their phones, not dashboards. The bot's adoption rate validated the 'push, don't pull' design decision.",
            ],
        },
    },
];
