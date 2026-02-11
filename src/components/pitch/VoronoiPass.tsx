"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useMotionTier } from "@/lib/motion";

// Player positions for a passing scenario
const homePlayers = [
    { x: 20, y: 70, label: "GK" },
    { x: 15, y: 55, label: "LB" },
    { x: 35, y: 58, label: "CB" },
    { x: 50, y: 56, label: "CB" },
    { x: 72, y: 54, label: "RB" },
    { x: 30, y: 40, label: "CM" },
    { x: 50, y: 38, label: "CM" },
    { x: 68, y: 42, label: "CM" },
    { x: 22, y: 25, label: "LW" },
    { x: 50, y: 20, label: "ST" },
    { x: 78, y: 28, label: "RW" },
];

const awayPlayers = [
    { x: 80, y: 30, label: "GK" },
    { x: 85, y: 45, label: "RB" },
    { x: 65, y: 42, label: "CB" },
    { x: 50, y: 44, label: "CB" },
    { x: 28, y: 46, label: "LB" },
    { x: 70, y: 60, label: "CM" },
    { x: 50, y: 62, label: "CM" },
    { x: 32, y: 58, label: "CM" },
    { x: 78, y: 75, label: "RW" },
    { x: 50, y: 80, label: "ST" },
    { x: 22, y: 72, label: "LW" },
];

// Passer and pass data
const passer = { x: 50, y: 38 }; // CM position
const actualPass = { x: 22, y: 25 }; // LW — bad pass (intercepted zone)
const optimalPass = { x: 78, y: 28 }; // RW — open space, high xT gain

export default function VoronoiPass() {
    const tier = useMotionTier();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [phase, setPhase] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    // Draw Voronoi
    const drawVoronoi = useCallback(
        (ctx: CanvasRenderingContext2D, w: number, h: number) => {
            const allPlayers = [...homePlayers, ...awayPlayers];

            // Simple nearest-neighbor Voronoi (no d3 dependency for minimal bundle)
            for (let px = 0; px < w; px += 2) {
                for (let py = 0; py < h; py += 2) {
                    const nx = (px / w) * 100;
                    const ny = (py / h) * 100;

                    let minDist = Infinity;
                    let closest = 0;

                    for (let i = 0; i < allPlayers.length; i++) {
                        const dx = nx - allPlayers[i].x;
                        const dy = ny - allPlayers[i].y;
                        const dist = dx * dx + dy * dy;
                        if (dist < minDist) {
                            minDist = dist;
                            closest = i;
                        }
                    }

                    const isHome = closest < homePlayers.length;
                    if (isHome) {
                        ctx.fillStyle = "rgba(232, 255, 89, 0.06)";
                    } else {
                        ctx.fillStyle = "rgba(89, 184, 255, 0.06)";
                    }
                    ctx.fillRect(px, py, 2, 2);
                }
            }

            // Draw cell borders (approximate via edge detection)
            const imageData = ctx.getImageData(0, 0, w, h);
            const data = imageData.data;
            for (let px = 1; px < w - 1; px++) {
                for (let py = 1; py < h - 1; py++) {
                    const idx = (py * w + px) * 4;
                    const right = (py * w + px + 1) * 4;
                    const down = ((py + 1) * w + px) * 4;

                    if (
                        Math.abs(data[idx] - data[right]) > 5 ||
                        Math.abs(data[idx] - data[down]) > 5
                    ) {
                        ctx.fillStyle = "rgba(240, 237, 232, 0.08)";
                        ctx.fillRect(px, py, 1, 1);
                    }
                }
            }
        },
        []
    );

    useEffect(() => {
        if (tier === "minimal") {
            setPhase(4);
            setIsVisible(true);
            return;
        }

        const el = containerRef.current;
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
            setTimeout(() => setPhase(2), 800),
            setTimeout(() => setPhase(3), 1400),
            setTimeout(() => setPhase(4), 2000),
        ];
        return () => timers.forEach(clearTimeout);
    }, [isVisible, tier]);

    // Draw canvas Voronoi when phase >= 1
    useEffect(() => {
        if (phase < 1) return;
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const w = 500;
        const h = 500;
        canvas.width = w;
        canvas.height = h;

        drawVoronoi(ctx, w, h);
    }, [phase, drawVoronoi]);

    const toAbsX = (pct: number) => `${pct}%`;
    const toAbsY = (pct: number) => `${pct}%`;

    return (
        <div ref={containerRef} className="vp-container">
            <div className="vp-header">
                <span className="text-caption" style={{ color: "var(--accent-alt)" }}>
                    Decision Intelligence
                </span>
                <h4 className="text-subhead">Voronoi + Pase Óptimo</h4>
            </div>

            <div className="vp-pitch-wrapper">
                <div className="vp-pitch-container">
                    {/* Pitch SVG base */}
                    <svg
                        viewBox="0 0 100 100"
                        className={`vp-pitch ${phase >= 1 ? "visible" : ""}`}
                    >
                        <rect x="0" y="0" width="100" height="100" fill="#0f2e0f" rx="2" />
                        <rect x="5" y="5" width="90" height="90" fill="none" stroke="#1a4a1a" strokeWidth="0.5" />
                        <line x1="5" y1="50" x2="95" y2="50" stroke="#1a4a1a" strokeWidth="0.5" />
                        <circle cx="50" cy="50" r="10" fill="none" stroke="#1a4a1a" strokeWidth="0.5" />
                        <rect x="25" y="80" width="50" height="15" fill="none" stroke="#1a4a1a" strokeWidth="0.5" />
                        <rect x="25" y="5" width="50" height="15" fill="none" stroke="#1a4a1a" strokeWidth="0.5" />
                    </svg>

                    {/* Voronoi canvas overlay */}
                    <canvas
                        ref={canvasRef}
                        className={`vp-voronoi ${phase >= 1 ? "visible" : ""}`}
                        aria-hidden="true"
                    />

                    {/* Players + passes overlay */}
                    <svg
                        viewBox="0 0 100 100"
                        className="vp-overlay"
                        aria-label="Voronoi space ownership diagram showing actual bad pass vs optimal pass route"
                    >
                        {/* Home players */}
                        {phase >= 2 &&
                            homePlayers.map((p, i) => (
                                <circle
                                    key={`h-${i}`}
                                    cx={p.x}
                                    cy={p.y}
                                    r="1.6"
                                    fill="var(--accent)"
                                    opacity="0.9"
                                    className="player-dot"
                                    style={{ animationDelay: `${i * 50}ms` }}
                                >
                                    <title>{p.label}</title>
                                </circle>
                            ))}

                        {/* Away players */}
                        {phase >= 2 &&
                            awayPlayers.map((p, i) => (
                                <circle
                                    key={`a-${i}`}
                                    cx={p.x}
                                    cy={p.y}
                                    r="1.6"
                                    fill="var(--accent-alt)"
                                    opacity="0.9"
                                    className="player-dot"
                                    style={{ animationDelay: `${(i + 11) * 50}ms` }}
                                >
                                    <title>{p.label}</title>
                                </circle>
                            ))}

                        {/* Actual pass (bad — red dashed) */}
                        {phase >= 3 && (
                            <line
                                x1={passer.x}
                                y1={passer.y}
                                x2={actualPass.x}
                                y2={actualPass.y}
                                stroke="var(--warning)"
                                strokeWidth="0.8"
                                strokeDasharray="2 1.5"
                                className="pass-line"
                                opacity="0.85"
                            />
                        )}

                        {phase >= 3 && (
                            <text
                                x={(passer.x + actualPass.x) / 2 - 5}
                                y={(passer.y + actualPass.y) / 2}
                                fill="var(--warning)"
                                fontSize="2.5"
                                fontFamily="var(--font-jetbrains-mono)"
                            >
                                ✗ xT: -0.02
                            </text>
                        )}

                        {/* Optimal pass (good — green solid) */}
                        {phase >= 4 && (
                            <line
                                x1={passer.x}
                                y1={passer.y}
                                x2={optimalPass.x}
                                y2={optimalPass.y}
                                stroke="#4ade80"
                                strokeWidth="0.8"
                                className="pass-line optimal"
                            />
                        )}

                        {phase >= 4 && (
                            <>
                                <circle
                                    cx={optimalPass.x}
                                    cy={optimalPass.y}
                                    r="4"
                                    fill="rgba(74, 222, 128, 0.15)"
                                    stroke="#4ade80"
                                    strokeWidth="0.3"
                                    className="zone-highlight"
                                />
                                <text
                                    x={(passer.x + optimalPass.x) / 2 + 2}
                                    y={(passer.y + optimalPass.y) / 2 - 2}
                                    fill="#4ade80"
                                    fontSize="2.5"
                                    fontFamily="var(--font-jetbrains-mono)"
                                >
                                    ✓ xT: +0.08
                                </text>
                            </>
                        )}

                        {/* Passer highlight */}
                        {phase >= 2 && (
                            <circle
                                cx={passer.x}
                                cy={passer.y}
                                r="3"
                                fill="none"
                                stroke="white"
                                strokeWidth="0.4"
                                strokeDasharray="1 0.5"
                                opacity="0.5"
                            />
                        )}
                    </svg>
                </div>

                {/* Info panel */}
                <div className={`vp-info ${phase >= 3 ? "visible" : ""}`}>
                    <div className="vp-stat">
                        <span className="vp-stat-label text-caption">Actual pass</span>
                        <span className="vp-stat-value text-mono" style={{ color: "var(--warning)" }}>
                            CM → LW
                        </span>
                    </div>
                    <div className="vp-stat">
                        <span className="vp-stat-label text-caption">xT Gain</span>
                        <span className="vp-stat-value text-mono" style={{ color: "var(--warning)" }}>
                            -0.02
                        </span>
                    </div>
                    <div className="vp-stat">
                        <span className="vp-stat-label text-caption">Optimal pass</span>
                        <span className="vp-stat-value text-mono" style={{ color: "#4ade80" }}>
                            CM → RW
                        </span>
                    </div>
                    <div className="vp-stat">
                        <span className="vp-stat-label text-caption">xT Gain</span>
                        <span className="vp-stat-value text-mono" style={{ color: "#4ade80" }}>
                            +0.08
                        </span>
                    </div>
                    <div className="vp-stat">
                        <span className="vp-stat-label text-caption">Completion prob</span>
                        <span className="vp-stat-value text-mono">0.83</span>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .vp-container {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }
        .vp-header {
          display: flex;
          flex-direction: column;
          gap: var(--space-2xs);
        }
        .vp-pitch-wrapper {
          display: grid;
          grid-template-columns: 1fr 160px;
          gap: var(--space-lg);
          align-items: start;
        }
        .vp-pitch-container {
          position: relative;
          width: 100%;
          max-width: 500px;
          aspect-ratio: 1;
          border-radius: 8px;
          overflow: hidden;
        }
        .vp-pitch,
        .vp-voronoi,
        .vp-overlay {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }
        .vp-pitch {
          z-index: 1;
          opacity: 0;
          transition: opacity var(--duration-slow) var(--ease-out-quint);
        }
        .vp-pitch.visible {
          opacity: 1;
        }
        .vp-voronoi {
          z-index: 2;
          opacity: 0;
          transition: opacity 800ms var(--ease-out-quint);
        }
        .vp-voronoi.visible {
          opacity: 1;
        }
        .vp-overlay {
          z-index: 3;
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
        .pass-line {
          animation: line-draw 500ms var(--ease-out-quint) both;
        }
        @keyframes line-draw {
          from {
            opacity: 0;
          }
          to {
            opacity: 0.85;
          }
        }
        .zone-highlight {
          animation: zone-pulse 2s ease-in-out infinite;
        }
        @keyframes zone-pulse {
          0%, 100% {
            r: 4;
            opacity: 1;
          }
          50% {
            r: 5;
            opacity: 0.7;
          }
        }
        .vp-info {
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
        .vp-info.visible {
          opacity: 1;
          transform: translateX(0);
        }
        .vp-stat {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .vp-stat-label {
          color: var(--text-muted);
          font-size: 0.625rem;
        }
        .vp-stat-value {
          color: var(--accent);
          font-size: 0.8125rem;
        }
        @media (max-width: 640px) {
          .vp-pitch-wrapper {
            grid-template-columns: 1fr;
          }
          .vp-info {
            flex-direction: row;
            flex-wrap: wrap;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .player-dot,
          .pass-line,
          .zone-highlight {
            animation: none;
          }
          .vp-pitch,
          .vp-voronoi,
          .vp-info {
            transition: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
        </div>
    );
}
