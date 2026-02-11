"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionTier } from "@/lib/motion";

interface PlayerReport {
  name: string;
  age: number;
  position: string;
  club: string;
  marketValue: string;
  similarity: number;
  reference: string;
  stats: { label: string; value: number; max: number }[];
  verdict: "recommended" | "watch" | "pass";
}

const mockReport: PlayerReport = {
  name: "Valentín Torres",
  age: 21,
  position: "CM",
  club: "Defensa y Justicia",
  marketValue: "€1.2M",
  similarity: 0.92,
  reference: "Enzo Fernández (age 21)",
  stats: [
    { label: "Pass%", value: 87, max: 100 },
    { label: "xA/90", value: 72, max: 100 },
    { label: "Pressures", value: 68, max: 100 },
    { label: "Progressive", value: 81, max: 100 },
    { label: "Dribbles", value: 55, max: 100 },
  ],
  verdict: "recommended",
};

export default function ScoutReport() {
  const tier = useMotionTier();
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (tier === "minimal") {
      setPhase(4);
      setIsVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [tier, isVisible]);

  useEffect(() => {
    if (!isVisible || tier === "minimal") return;

    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 1000),
      setTimeout(() => setPhase(3), 1800),
      setTimeout(() => setPhase(4), 2500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [isVisible, tier]);

  return (
    <div ref={ref} className="sr-container">
      <div className="sr-header">
        <span className="text-caption" style={{ color: "var(--accent)" }}>
          Scouting Engine
        </span>
        <h4 className="text-subhead">Telegram Report Preview</h4>
      </div>

      <div className="sr-chat">
        {/* Bot message header */}
        <div className="sr-bot-header">
          <div className="sr-bot-avatar">🤖</div>
          <span className="sr-bot-name text-mono">ScoutBot</span>
          <span className="sr-bot-time text-caption">14:32</span>
        </div>

        {/* Typing indicator */}
        {phase === 1 && (
          <div className="sr-typing">
            <span className="sr-typing-dot"></span>
            <span className="sr-typing-dot"></span>
            <span className="sr-typing-dot"></span>
          </div>
        )}

        {/* Message 1: Player Report */}
        {phase >= 2 && (
          <div className="sr-bubble sr-bubble-enter">
            <div className="sr-report-header">
              <span className="sr-report-badge">🔍 WEEKLY ALERT</span>
            </div>

            <div className="sr-player-info">
              <div className="sr-player-main">
                <span className="sr-player-name">{mockReport.name}</span>
                <span className="sr-player-meta">
                  {mockReport.age} · {mockReport.position} · {mockReport.club}
                </span>
                <span className="sr-player-value">{mockReport.marketValue}</span>
              </div>
            </div>

            {/* Mini radar chart */}
            <div className="sr-radar">
              <svg
                viewBox="0 0 120 120"
                className="sr-radar-svg"
                aria-label={`Radar chart showing stats for ${mockReport.name}: similarity ${Math.round(mockReport.similarity * 100)}%`}
              >
                {/* Background pentagon */}
                <polygon
                  points={getPolygonPoints(60, 60, 45, 5, 1)}
                  fill="none"
                  stroke="var(--border)"
                  strokeWidth="0.5"
                />
                <polygon
                  points={getPolygonPoints(60, 60, 30, 5, 1)}
                  fill="none"
                  stroke="var(--border)"
                  strokeWidth="0.3"
                />
                <polygon
                  points={getPolygonPoints(60, 60, 15, 5, 1)}
                  fill="none"
                  stroke="var(--border)"
                  strokeWidth="0.3"
                />

                {/* Data polygon */}
                <polygon
                  points={getDataPoints(60, 60, 45, mockReport.stats)}
                  fill="rgba(232, 255, 89, 0.15)"
                  stroke="var(--accent)"
                  strokeWidth="1"
                />

                {/* Axis labels */}
                {mockReport.stats.map((stat, i) => {
                  const angle = (i / 5) * 2 * Math.PI - Math.PI / 2;
                  const lx = 60 + Math.cos(angle) * 55;
                  const ly = 60 + Math.sin(angle) * 55;
                  return (
                    <text
                      key={stat.label}
                      x={lx}
                      y={ly}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="var(--text-muted)"
                      fontSize="6"
                      fontFamily="var(--font-jetbrains-mono)"
                    >
                      {stat.label}
                    </text>
                  );
                })}
              </svg>
            </div>
          </div>
        )}

        {/* Message 2: Similarity */}
        {phase >= 3 && (
          <div className="sr-bubble sr-bubble-enter" style={{ animationDelay: "100ms" }}>
            <span className="sr-sim-label text-caption">Similarity match</span>
            <div className="sr-sim-row">
              <span className="sr-sim-ref">{mockReport.reference}</span>
              <span className="sr-sim-score text-mono">
                cos: {mockReport.similarity.toFixed(2)}
              </span>
            </div>
            <div className="sr-sim-bar">
              <div
                className="sr-sim-fill"
                style={{ width: `${mockReport.similarity * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Message 3: Verdict */}
        {phase >= 4 && (
          <div className="sr-bubble sr-bubble-enter sr-verdict" style={{ animationDelay: "200ms" }}>
            <span className="sr-verdict-icon">🟢</span>
            <span className="sr-verdict-text">Recomendado — alta similitud, bajo valor de mercado.</span>
          </div>
        )}
      </div>

      <style jsx>{`
        .sr-container {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }
        .sr-header {
          display: flex;
          flex-direction: column;
          gap: var(--space-2xs);
        }
        .sr-chat {
          max-width: 400px;
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: var(--space-md);
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
        }
        .sr-bot-header {
          display: flex;
          align-items: center;
          gap: var(--space-xs);
          padding-bottom: var(--space-xs);
          border-bottom: 1px solid var(--border);
        }
        .sr-bot-avatar {
          font-size: 1.25rem;
        }
        .sr-bot-name {
          color: var(--text-primary);
          font-size: 0.8125rem;
        }
        .sr-bot-time {
          margin-left: auto;
          color: var(--text-muted);
          font-size: 0.625rem;
        }

        /* Typing indicator */
        .sr-typing {
          display: flex;
          gap: 4px;
          padding: var(--space-xs);
        }
        .sr-typing-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--text-muted);
          animation: typing-bounce 1.2s ease-in-out infinite;
        }
        .sr-typing-dot:nth-child(2) {
          animation-delay: 0.2s;
        }
        .sr-typing-dot:nth-child(3) {
          animation-delay: 0.4s;
        }
        @keyframes typing-bounce {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.4;
          }
          30% {
            transform: translateY(-4px);
            opacity: 1;
          }
        }

        /* Bubbles */
        .sr-bubble {
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: var(--space-sm);
          display: flex;
          flex-direction: column;
          gap: var(--space-xs);
        }
        .sr-bubble-enter {
          animation: bubble-in var(--duration-normal) var(--ease-out-quint) both;
        }
        @keyframes bubble-in {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Report */
        .sr-report-header {
          margin-bottom: var(--space-2xs);
        }
        .sr-report-badge {
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 0.6875rem;
          color: var(--accent-alt);
          padding: 2px var(--space-xs);
          border: 1px solid var(--accent-alt);
          border-radius: 3px;
        }
        .sr-player-info {
          display: flex;
          gap: var(--space-sm);
        }
        .sr-player-main {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .sr-player-name {
          font-weight: 600;
          font-size: 1rem;
          color: var(--text-primary);
        }
        .sr-player-meta {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }
        .sr-player-value {
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 0.8125rem;
          color: var(--accent);
        }

        /* Radar */
        .sr-radar {
          width: 100%;
          max-width: 180px;
          margin: var(--space-xs) auto;
        }
        .sr-radar-svg {
          width: 100%;
        }

        /* Similarity */
        .sr-sim-label {
          color: var(--text-muted);
        }
        .sr-sim-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .sr-sim-ref {
          font-size: 0.8125rem;
          color: var(--text-primary);
        }
        .sr-sim-score {
          font-size: 0.75rem;
          color: var(--accent);
        }
        .sr-sim-bar {
          width: 100%;
          height: 4px;
          background: var(--bg-primary);
          border-radius: 2px;
          overflow: hidden;
        }
        .sr-sim-fill {
          height: 100%;
          background: var(--accent);
          border-radius: 2px;
          transition: width 800ms var(--ease-out-quint);
        }

        /* Verdict */
        .sr-verdict {
          flex-direction: row;
          align-items: center;
          gap: var(--space-xs);
          border-color: rgba(74, 222, 128, 0.2);
          background: rgba(74, 222, 128, 0.05);
        }
        .sr-verdict-icon {
          font-size: 1.125rem;
        }
        .sr-verdict-text {
          font-size: 0.8125rem;
          color: var(--text-primary);
        }

        @media (prefers-reduced-motion: reduce) {
          .sr-typing-dot,
          .sr-bubble-enter {
            animation: none;
          }
          .sr-sim-fill {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}

// Utility: generate regular polygon points
function getPolygonPoints(
  cx: number,
  cy: number,
  radius: number,
  sides: number,
  scale: number
): string {
  const points: string[] = [];
  for (let i = 0; i < sides; i++) {
    const angle = (i / sides) * 2 * Math.PI - Math.PI / 2;
    const x = cx + Math.cos(angle) * radius * scale;
    const y = cy + Math.sin(angle) * radius * scale;
    points.push(`${x},${y}`);
  }
  return points.join(" ");
}

// Utility: generate data polygon from stats
function getDataPoints(
  cx: number,
  cy: number,
  maxRadius: number,
  stats: { value: number; max: number }[]
): string {
  const points: string[] = [];
  for (let i = 0; i < stats.length; i++) {
    const angle = (i / stats.length) * 2 * Math.PI - Math.PI / 2;
    const r = (stats[i].value / stats[i].max) * maxRadius;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    points.push(`${x},${y}`);
  }
  return points.join(" ");
}
