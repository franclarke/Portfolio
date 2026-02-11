"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionTier } from "@/lib/motion";

// Static data: player positions for a defensive block scenario
const defensiveLine = [
    { x: 25, y: 68 },
    { x: 38, y: 66 },
    { x: 50, y: 65 },
    { x: 62, y: 66 },
    { x: 75, y: 68 },
];

const midFieldLine = [
    { x: 30, y: 50 },
    { x: 42, y: 48 },
    { x: 58, y: 48 },
    { x: 70, y: 50 },
];

const goalkeeper = { x: 50, y: 88 };

const attackers = [
    { x: 35, y: 35 },
    { x: 50, y: 28 },
    { x: 65, y: 32 },
    { x: 45, y: 42 },
    { x: 55, y: 40 },
    { x: 40, y: 22 },
    { x: 60, y: 20 },
    { x: 50, y: 15 },
    { x: 30, y: 18 },
    { x: 70, y: 25 },
];

const ball = { x: 48, y: 38 };

export default function TacticalVision() {
    const tier = useMotionTier();
    const ref = useRef<HTMLDivElement>(null);
    const [phase, setPhase] = useState(0); // 0=hidden, 1=pitch, 2=players, 3=lines, 4=alert
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
            setTimeout(() => setPhase(1), 200),
            setTimeout(() => setPhase(2), 600),
            setTimeout(() => setPhase(3), 1200),
            setTimeout(() => setPhase(4), 1800),
        ];
        return () => timers.forEach(clearTimeout);
    }, [isVisible, tier]);

    // Compute distances
    const defAvgY = defensiveLine.reduce((s, p) => s + p.y, 0) / defensiveLine.length;
    const midAvgY = midFieldLine.reduce((s, p) => s + p.y, 0) / midFieldLine.length;
    const distanceM = Math.round(Math.abs(defAvgY - midAvgY) * 1.05); // ~18m
    const isImbalanced = distanceM > 15;

    return (
        <div ref={ref} className="tv-container">
            <div className="tv-header">
                <span className="text-caption" style={{ color: "var(--accent)" }}>
                    Tactical Vision
                </span>
                <h4 className="text-subhead">Distancia Entre Líneas</h4>
            </div>

            <div className="tv-pitch-wrapper">
                <svg
                    viewBox="0 0 100 100"
                    className={`tv-pitch ${phase >= 1 ? "visible" : ""}`}
                    aria-label="Football pitch showing defensive block analysis with player positions and inter-line distance measurement"
                >
                    {/* Pitch background */}
                    <rect x="0" y="0" width="100" height="100" fill="#0f2e0f" rx="2" />

                    {/* Field markings */}
                    <rect x="5" y="5" width="90" height="90" fill="none" stroke="#1a4a1a" strokeWidth="0.5" />
                    <line x1="5" y1="50" x2="95" y2="50" stroke="#1a4a1a" strokeWidth="0.5" />
                    <circle cx="50" cy="50" r="10" fill="none" stroke="#1a4a1a" strokeWidth="0.5" />
                    <circle cx="50" cy="50" r="0.8" fill="#1a4a1a" />

                    {/* Penalty areas */}
                    <rect x="25" y="80" width="50" height="15" fill="none" stroke="#1a4a1a" strokeWidth="0.5" />
                    <rect x="25" y="5" width="50" height="15" fill="none" stroke="#1a4a1a" strokeWidth="0.5" />

                    {/* Goal areas */}
                    <rect x="35" y="88" width="30" height="7" fill="none" stroke="#1a4a1a" strokeWidth="0.5" />
                    <rect x="35" y="5" width="30" height="7" fill="none" stroke="#1a4a1a" strokeWidth="0.5" />

                    {/* Attackers (blue team) */}
                    {phase >= 2 &&
                        attackers.map((p, i) => (
                            <circle
                                key={`att-${i}`}
                                cx={p.x}
                                cy={p.y}
                                r="1.8"
                                fill="var(--accent-alt)"
                                opacity={phase >= 2 ? 0.9 : 0}
                                className="player-dot"
                                style={{ animationDelay: `${i * 60}ms` }}
                            >
                                <title>Attacker {i + 1}</title>
                            </circle>
                        ))}

                    {/* Defensive line (home team - chartreuse) */}
                    {phase >= 2 &&
                        defensiveLine.map((p, i) => (
                            <circle
                                key={`def-${i}`}
                                cx={p.x}
                                cy={p.y}
                                r="1.8"
                                fill="var(--accent)"
                                opacity={phase >= 2 ? 0.9 : 0}
                                className="player-dot"
                                style={{ animationDelay: `${(i + 10) * 60}ms` }}
                            >
                                <title>Defender {i + 1}</title>
                            </circle>
                        ))}

                    {/* Midfield line */}
                    {phase >= 2 &&
                        midFieldLine.map((p, i) => (
                            <circle
                                key={`mid-${i}`}
                                cx={p.x}
                                cy={p.y}
                                r="1.8"
                                fill="var(--accent)"
                                opacity={phase >= 2 ? 0.9 : 0}
                                className="player-dot"
                                style={{ animationDelay: `${(i + 15) * 60}ms` }}
                            >
                                <title>Midfielder {i + 1}</title>
                            </circle>
                        ))}

                    {/* Goalkeeper */}
                    {phase >= 2 && (
                        <circle cx={goalkeeper.x} cy={goalkeeper.y} r="1.8" fill="var(--accent)" opacity="0.9" className="player-dot">
                            <title>Goalkeeper</title>
                        </circle>
                    )}

                    {/* Ball */}
                    {phase >= 2 && (
                        <circle cx={ball.x} cy={ball.y} r="1.2" fill="white" opacity="0.9" className="player-dot">
                            <title>Ball</title>
                        </circle>
                    )}

                    {/* Defensive and Midfield lines */}
                    {phase >= 3 && (
                        <>
                            <line
                                x1="20"
                                y1={defAvgY}
                                x2="80"
                                y2={defAvgY}
                                stroke="var(--accent)"
                                strokeWidth="0.4"
                                strokeDasharray="2 1"
                                opacity="0.6"
                                className="line-draw"
                            />
                            <line
                                x1="25"
                                y1={midAvgY}
                                x2="75"
                                y2={midAvgY}
                                stroke="var(--accent)"
                                strokeWidth="0.4"
                                strokeDasharray="2 1"
                                opacity="0.6"
                                className="line-draw"
                            />

                            {/* Distance bracket */}
                            <line
                                x1="88"
                                y1={midAvgY}
                                x2="88"
                                y2={defAvgY}
                                stroke="var(--text-secondary)"
                                strokeWidth="0.3"
                            />
                            <line x1="86" y1={midAvgY} x2="90" y2={midAvgY} stroke="var(--text-secondary)" strokeWidth="0.3" />
                            <line x1="86" y1={defAvgY} x2="90" y2={defAvgY} stroke="var(--text-secondary)" strokeWidth="0.3" />

                            <text
                                x="92"
                                y={(midAvgY + defAvgY) / 2 + 1}
                                fill={isImbalanced ? "var(--warning)" : "var(--accent)"}
                                fontSize="3"
                                fontFamily="var(--font-jetbrains-mono)"
                            >
                                {distanceM}m
                            </text>
                        </>
                    )}

                    {/* Alert */}
                    {phase >= 4 && isImbalanced && (
                        <g className="alert-group">
                            <rect
                                x="28"
                                y="55"
                                width="44"
                                height="8"
                                rx="1.5"
                                fill="rgba(255, 107, 74, 0.15)"
                                stroke="var(--warning)"
                                strokeWidth="0.4"
                            />
                            <text
                                x="50"
                                y="60.2"
                                textAnchor="middle"
                                fill="var(--warning)"
                                fontSize="3.2"
                                fontFamily="var(--font-jetbrains-mono)"
                                fontWeight="700"
                            >
                                ⚠ DESEQUILIBRIO
                            </text>
                        </g>
                    )}
                </svg>

                {/* Info panel */}
                <div className={`tv-info ${phase >= 3 ? "visible" : ""}`}>
                    <div className="tv-stat">
                        <span className="tv-stat-label text-caption">Def. Line Y</span>
                        <span className="tv-stat-value text-mono">{defAvgY.toFixed(1)}</span>
                    </div>
                    <div className="tv-stat">
                        <span className="tv-stat-label text-caption">Mid. Line Y</span>
                        <span className="tv-stat-value text-mono">{midAvgY.toFixed(1)}</span>
                    </div>
                    <div className="tv-stat">
                        <span className="tv-stat-label text-caption">Distance</span>
                        <span
                            className="tv-stat-value text-mono"
                            style={{ color: isImbalanced ? "var(--warning)" : "var(--accent)" }}
                        >
                            {distanceM}m
                        </span>
                    </div>
                    <div className="tv-stat">
                        <span className="tv-stat-label text-caption">Status</span>
                        <span
                            className="tv-stat-value text-mono"
                            style={{ color: isImbalanced ? "var(--warning)" : "var(--accent)" }}
                        >
                            {isImbalanced ? "STRETCHED" : "COMPACT"}
                        </span>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .tv-container {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }
        .tv-header {
          display: flex;
          flex-direction: column;
          gap: var(--space-2xs);
        }
        .tv-pitch-wrapper {
          display: grid;
          grid-template-columns: 1fr 160px;
          gap: var(--space-lg);
          align-items: start;
        }
        .tv-pitch {
          width: 100%;
          max-width: 500px;
          border-radius: 8px;
          overflow: hidden;
          opacity: 0;
          transition: opacity var(--duration-slow) var(--ease-out-quint);
        }
        .tv-pitch.visible {
          opacity: 1;
        }
        .player-dot {
          animation: dot-pop var(--duration-normal) var(--ease-out-quint) both;
        }
        @keyframes dot-pop {
          from {
            r: 0;
            opacity: 0;
          }
          to {
            opacity: 0.9;
          }
        }
        .line-draw {
          animation: line-in 600ms var(--ease-out-quint) both;
        }
        @keyframes line-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 0.6;
          }
        }
        .alert-group {
          animation: alert-pulse 1.5s ease-in-out infinite;
        }
        @keyframes alert-pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
        }
        .tv-info {
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
          padding: var(--space-md);
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: 8px;
          opacity: 0;
          transform: translateX(20px);
          transition: all var(--duration-slow) var(--ease-out-quint);
        }
        .tv-info.visible {
          opacity: 1;
          transform: translateX(0);
        }
        .tv-stat {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .tv-stat-label {
          color: var(--text-muted);
          font-size: 0.625rem;
        }
        .tv-stat-value {
          color: var(--accent);
          font-size: 0.8125rem;
        }
        @media (max-width: 640px) {
          .tv-pitch-wrapper {
            grid-template-columns: 1fr;
          }
          .tv-info {
            flex-direction: row;
            flex-wrap: wrap;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .player-dot,
          .line-draw {
            animation: none;
          }
          .alert-group {
            animation: none;
          }
          .tv-pitch,
          .tv-info {
            transition: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
        </div>
    );
}
