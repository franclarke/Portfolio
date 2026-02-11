"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionTier } from "@/lib/motion";

export default function TraceRibbon() {
    const tier = useMotionTier();
    const svgRef = useRef<SVGSVGElement>(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (tier === "minimal") {
            setProgress(1);
            return;
        }

        let raf: number;
        const handleScroll = () => {
            if (raf) cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
                const docHeight =
                    document.documentElement.scrollHeight - window.innerHeight;
                const p = docHeight > 0 ? window.scrollY / docHeight : 0;
                setProgress(Math.min(1, Math.max(0, p)));
            });
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (raf) cancelAnimationFrame(raf);
        };
    }, [tier]);

    // Generate a procedural path that starts noisy and converges
    const pathData = generateTracePath();
    const pathLength = 2400;
    const dashOffset = pathLength * (1 - progress);

    // Checkpoint positions along the trace
    const checkpoints = [
        { y: 15, label: "init", active: progress > 0.02 },
        { y: 28, label: "tactical-vision", active: progress > 0.2 },
        { y: 48, label: "decision-intelligence", active: progress > 0.4 },
        { y: 68, label: "scouting-engine", active: progress > 0.6 },
        { y: 82, label: "capabilities", active: progress > 0.75 },
        { y: 95, label: "deploy", active: progress > 0.9 },
    ];

    return (
        <div className="trace-container" aria-hidden="true">
            <svg
                ref={svgRef}
                className="trace-svg"
                viewBox="0 0 60 100"
                preserveAspectRatio="none"
                fill="none"
            >
                {/* Background path (dim) */}
                <path
                    d={pathData}
                    stroke="var(--border)"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                />

                {/* Animated gradient path */}
                <defs>
                    <linearGradient id="trace-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.3" />
                        <stop offset="50%" stopColor="var(--accent)" stopOpacity="1" />
                        <stop offset="100%" stopColor="var(--accent-alt)" stopOpacity="1" />
                    </linearGradient>
                </defs>

                <path
                    d={pathData}
                    stroke="url(#trace-grad)"
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                    strokeDasharray={pathLength}
                    strokeDashoffset={dashOffset}
                    strokeLinecap="round"
                    style={{
                        transition:
                            tier === "minimal" ? "none" : "stroke-dashoffset 100ms linear",
                    }}
                />

                {/* Checkpoint dots */}
                {checkpoints.map((cp) => (
                    <circle
                        key={cp.label}
                        cx="30"
                        cy={cp.y}
                        r={cp.active ? 3 : 1.5}
                        fill={cp.active ? "var(--accent)" : "var(--text-muted)"}
                        style={{
                            transition: tier === "minimal" ? "none" : "all 400ms var(--ease-out-quint)",
                        }}
                    />
                ))}

                {/* Deploy endpoint */}
                {progress > 0.9 && (
                    <text
                        x="30"
                        y="99"
                        textAnchor="middle"
                        fill="var(--accent)"
                        fontSize="3"
                        fontFamily="var(--font-jetbrains-mono)"
                        className="deploy-label"
                    >
                        DEPLOY
                    </text>
                )}
            </svg>

            <style jsx>{`
        .trace-container {
          position: fixed;
          left: 0;
          top: var(--header-height);
          bottom: var(--console-height);
          width: 60px;
          z-index: 50;
          pointer-events: none;
        }
        .trace-svg {
          width: 100%;
          height: 100%;
        }
        .deploy-label {
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        @media (max-width: 1024px) {
          .trace-container {
            display: none;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .deploy-label {
            animation: none;
          }
        }
      `}</style>
        </div>
    );
}

function generateTracePath(): string {
    // Path that starts noisy (top = early training) and smooths out (bottom = converged)
    const points: [number, number][] = [];
    const steps = 20;

    for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const y = t * 100;
        // Noise amplitude decreases as we go down (convergence)
        const noiseAmp = 15 * (1 - t * t);
        const noise = Math.sin(t * 12 + 1.5) * noiseAmp;
        const x = 30 + noise;
        points.push([x, y]);
    }

    // Construct smooth cubic bezier path
    let d = `M ${points[0][0]} ${points[0][1]}`;
    for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        const cpY = (prev[1] + curr[1]) / 2;
        d += ` C ${prev[0]} ${cpY}, ${curr[0]} ${cpY}, ${curr[0]} ${curr[1]}`;
    }

    return d;
}
