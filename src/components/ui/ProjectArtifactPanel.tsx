"use client";

import TacticalVision from "@/components/pitch/TacticalVision";
import VoronoiPass from "@/components/pitch/VoronoiPass";
import ScoutReport from "@/components/pitch/ScoutReport";

interface ProjectArtifactPanelProps {
  slug: string;
}

function MindlyrArtifact() {
  const gates = [
    { label: "schema_contract", value: "pass" },
    { label: "critical_paths", value: "pass" },
    { label: "latency_budget", value: "pass" },
  ];

  return (
    <div className="artifact-shell">
      <div className="artifact-head">
        <span className="text-caption">Decision Runtime</span>
        <h4>Tenant-safe policy execution</h4>
      </div>

      <div className="artifact-grid">
        <div className="artifact-block">
          <span className="block-label">p95 latency</span>
          <strong>34ms</strong>
        </div>
        <div className="artifact-block">
          <span className="block-label">snapshot</span>
          <strong>v3.12.4</strong>
        </div>
        <div className="artifact-block">
          <span className="block-label">contracts</span>
          <strong>100% valid</strong>
        </div>
      </div>

      <div className="artifact-gates">
        {gates.map((gate) => (
          <div className="gate-row" key={gate.label}>
            <span>{gate.label}</span>
            <span className="gate-pass">{gate.value}</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        .artifact-shell {
          border: 1px solid var(--border);
          border-radius: 14px;
          background: linear-gradient(
            130deg,
            rgba(89, 184, 255, 0.12),
            rgba(10, 13, 18, 0.94) 38%,
            rgba(232, 255, 89, 0.1)
          );
          padding: var(--space-md);
          min-height: 360px;
          display: grid;
          align-content: start;
          gap: var(--space-md);
        }
        .artifact-head {
          display: grid;
          gap: 4px;
        }
        .artifact-head .text-caption {
          color: var(--accent-alt);
        }
        .artifact-head h4 {
          font-family: var(--font-space-grotesk), system-ui, sans-serif;
          font-size: 1.05rem;
          font-weight: 600;
        }
        .artifact-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: var(--space-sm);
        }
        .artifact-block {
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: var(--space-sm);
          background: rgba(10, 14, 20, 0.84);
          display: grid;
          gap: 6px;
        }
        .block-label {
          color: var(--text-muted);
          font-size: 0.68rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .artifact-block strong {
          color: var(--text-primary);
          font-size: 1rem;
        }
        .artifact-gates {
          border: 1px solid var(--border);
          border-radius: 10px;
          overflow: hidden;
        }
        .gate-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 12px;
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 0.78rem;
          border-bottom: 1px solid var(--border);
        }
        .gate-row:last-child {
          border-bottom: none;
        }
        .gate-pass {
          color: var(--accent);
        }
        @media (max-width: 680px) {
          .artifact-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

function AacArtifact() {
  const bars = [48, 72, 64, 92, 52, 38, 61, 86, 58, 43, 67, 75];

  return (
    <div className="artifact-shell">
      <div className="artifact-head">
        <span className="text-caption">Audio Pipeline</span>
        <h4>Voice cloning for AAC constraints</h4>
      </div>

      <div className="wave-grid" aria-label="synthetic waveform preview">
        {bars.map((height, index) => (
          <span key={index} className="wave-bar" style={{ height: `${height}%` }} />
        ))}
      </div>

      <div className="artifact-grid">
        <div className="artifact-block">
          <span className="block-label">quantization</span>
          <strong>INT8 / INT4</strong>
        </div>
        <div className="artifact-block">
          <span className="block-label">adaptation</span>
          <strong>LoRA / QLoRA</strong>
        </div>
        <div className="artifact-block">
          <span className="block-label">focus</span>
          <strong>Latency-memory Pareto</strong>
        </div>
      </div>

      <style jsx>{`
        .artifact-shell {
          border: 1px solid var(--border);
          border-radius: 14px;
          background: linear-gradient(
            130deg,
            rgba(232, 255, 89, 0.1),
            rgba(10, 13, 18, 0.94) 35%,
            rgba(89, 184, 255, 0.14)
          );
          padding: var(--space-md);
          min-height: 360px;
          display: grid;
          align-content: start;
          gap: var(--space-md);
        }
        .artifact-head {
          display: grid;
          gap: 4px;
        }
        .artifact-head .text-caption {
          color: var(--accent);
        }
        .artifact-head h4 {
          font-family: var(--font-space-grotesk), system-ui, sans-serif;
          font-size: 1.05rem;
          font-weight: 600;
        }
        .wave-grid {
          border: 1px solid var(--border);
          border-radius: 10px;
          background: rgba(9, 11, 15, 0.88);
          min-height: 140px;
          padding: 14px;
          display: grid;
          grid-template-columns: repeat(12, minmax(0, 1fr));
          align-items: end;
          gap: 6px;
        }
        .wave-bar {
          border-radius: 999px;
          background: linear-gradient(180deg, #59b8ff, #e8ff59);
          animation: breathe 2.8s ease-in-out infinite;
        }
        @keyframes breathe {
          0%,
          100% {
            opacity: 0.65;
            transform: scaleY(0.95);
          }
          50% {
            opacity: 1;
            transform: scaleY(1.04);
          }
        }
        .artifact-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: var(--space-sm);
        }
        .artifact-block {
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: var(--space-sm);
          background: rgba(10, 14, 20, 0.84);
          display: grid;
          gap: 6px;
        }
        .block-label {
          color: var(--text-muted);
          font-size: 0.68rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .artifact-block strong {
          color: var(--text-primary);
          font-size: 0.96rem;
        }
        @media (prefers-reduced-motion: reduce) {
          .wave-bar {
            animation: none;
          }
        }
        @media (max-width: 680px) {
          .artifact-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default function ProjectArtifactPanel({ slug }: ProjectArtifactPanelProps) {
  if (slug === "tactical-vision") return <TacticalVision />;
  if (slug === "decision-intelligence") return <VoronoiPass />;
  if (slug === "scouting-engine") return <ScoutReport />;
  if (slug === "mindlyr-decision-engine") return <MindlyrArtifact />;
  if (slug === "aac-voice-cloning") return <AacArtifact />;

  return null;
}
