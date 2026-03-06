"use client";

import {
  atlasFaces,
  type AtlasFaceKey,
} from "@/components/hero/modelAtlasConfig";

interface ModelAtlasFallbackProps {
  activeFace: AtlasFaceKey;
  onFaceChange: (face: AtlasFaceKey) => void;
  onFaceActivate: (face: AtlasFaceKey) => void;
}

export default function ModelAtlasFallback({
  activeFace,
  onFaceChange,
  onFaceActivate,
}: ModelAtlasFallbackProps) {
  return (
    <div className="atlas-fallback" data-testid="atlas-fallback">
      <div className="atlas-fallback-head">
        <span className="text-caption">Model Atlas</span>
        <p className="text-body">
          Explore AI domains and jump directly to the most relevant section.
        </p>
      </div>

      <div className="atlas-fallback-grid" role="list">
        {atlasFaces.map((face) => (
          <button
            key={face.key}
            type="button"
            role="listitem"
            className={`atlas-chip ${activeFace === face.key ? "active" : ""}`}
            onFocus={() => onFaceChange(face.key)}
            onMouseEnter={() => onFaceChange(face.key)}
            onClick={() => onFaceActivate(face.key)}
            aria-label={`${face.label}: ${face.description}`}
          >
            <span className="chip-label">{face.label}</span>
            <span className="chip-desc">{face.description}</span>
          </button>
        ))}
      </div>

      <style jsx>{`
        .atlas-fallback {
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: var(--space-lg);
          background: linear-gradient(
            130deg,
            rgba(89, 184, 255, 0.08),
            rgba(232, 255, 89, 0.08) 40%,
            rgba(9, 10, 13, 0.95)
          );
          display: grid;
          gap: var(--space-md);
        }
        .atlas-fallback-head {
          display: grid;
          gap: var(--space-xs);
        }
        .atlas-fallback-head .text-caption {
          color: var(--accent);
        }
        .atlas-fallback-head .text-body {
          color: var(--text-secondary);
          max-width: 62ch;
        }
        .atlas-fallback-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: var(--space-sm);
        }
        .atlas-chip {
          display: grid;
          gap: 6px;
          text-align: left;
          border-radius: 12px;
          border: 1px solid var(--border);
          background: rgba(10, 11, 14, 0.82);
          color: var(--text-primary);
          padding: var(--space-sm);
          cursor: pointer;
          transition:
            transform var(--duration-fast) var(--ease-out-quint),
            border-color var(--duration-fast) var(--ease-out-quint),
            background var(--duration-fast) var(--ease-out-quint);
        }
        .atlas-chip:hover,
        .atlas-chip.active {
          transform: translateY(-2px);
          border-color: rgba(232, 255, 89, 0.56);
          background: rgba(16, 21, 14, 0.95);
        }
        .chip-label {
          font-family: var(--font-space-grotesk), system-ui, sans-serif;
          font-size: 0.96rem;
          font-weight: 600;
        }
        .chip-desc {
          color: var(--text-secondary);
          font-size: 0.78rem;
          line-height: 1.45;
        }
      `}</style>
    </div>
  );
}
