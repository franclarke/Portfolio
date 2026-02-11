import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    useVideoConfig,
    spring,
} from "remotion";
import React, { useMemo } from "react";

export const HeroLoop: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, durationInFrames } = useVideoConfig();

    // 1. Trace Progress (0 -> 1)
    // Draw the full path over the first 0-180 frames (6s)
    const drawProgress = interpolate(frame, [0, 180], [0, 1], {
        extrapolateRight: "clamp",
    });

    // 2. Convergence (Noise Level)
    // Starts high (noisy) and reduces to near zero by frame 150
    const noiseLevel = interpolate(frame, [0, 150], [1, 0], {
        extrapolateRight: "clamp",
    });

    // Generate path data based on current noise level (simulated by morphing)
    // For simplicity in video, we'll draw a static 'converged' path but reveal it,
    // and maybe wiggle the points slightly if possible.
    // Actually, simpler approach: Draw the path. The "noise" is visual chaos in the line itself.
    // We'll use a fixed path that looks "converging" (noisy top, smooth bottom) like the website.
    const pathData = useMemo(() => generateTracePath(), []);
    const pathLength = 2400; // Approx length
    const dashOffset = pathLength * (1 - drawProgress);

    // 3. Data Checkpoints (Epochs)
    // Appear at 33%, 66% of draw usage
    const showEpoch1 = frame > 60; // ~2s
    const showEpoch2 = frame > 120; // ~4s
    const showDeploy = frame > 180; // ~6s

    // Epoch counter text
    const epochValue = Math.round(interpolate(frame, [60, 180], [1, 50], {
        extrapolateRight: "clamp",
    }));
    const lossValue = interpolate(frame, [60, 180], [2.4, 0.03], {
        extrapolateRight: "clamp",
    });

    const opacityEpoch = spring({
        frame: frame - 60,
        fps,
        config: { damping: 200 },
    });

    const opacityDeploy = spring({
        frame: frame - 180,
        fps,
        config: { damping: 200 },
    });

    return (
        <AbsoluteFill
            style={{
                backgroundColor: "#0C0D0E",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "Space Grotesk, sans-serif",
            }}
        >
            <div className="relative w-full h-full max-w-4xl flex items-center justify-center">
                {/* SVG Trace */}
                <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full absolute inset-0 text-accent"
                    style={{ overflow: "visible" }}
                >
                    <defs>
                        <linearGradient id="trace-grad-video" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#E8FF59" stopOpacity="0.3" />
                            <stop offset="50%" stopColor="#E8FF59" stopOpacity="1" />
                            <stop offset="100%" stopColor="#59B8FF" stopOpacity="1" />
                        </linearGradient>
                    </defs>

                    <path
                        d={pathData}
                        fill="none"
                        stroke="url(#trace-grad-video)"
                        strokeWidth="0.5"
                        strokeDasharray={pathLength}
                        strokeDashoffset={dashOffset}
                        strokeLinecap="round"
                    />

                    {/* Dots */}
                    <circle
                        cx="50"
                        cy="30"
                        r={showEpoch1 ? 1 : 0}
                        fill="#E8FF59"
                        style={{ transition: "r 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)" }}
                    />
                    <circle
                        cx="50"
                        cy="60"
                        r={showEpoch2 ? 1 : 0}
                        fill="#E8FF59"
                        style={{ transition: "r 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)" }}
                    />
                </svg>

                {/* Text Overlays */}
                <AbsoluteFill className="flex flex-col items-center justify-center pointer-events-none">
                    {/* Epoch Counter (Left side) */}
                    <div
                        style={{ opacity: opacityEpoch, transform: `translateY(${20 * (1 - opacityEpoch)}px)` }}
                        className="absolute left-1/4 top-1/2 -translate-y-1/2 text-right"
                    >
                        <div className="text-4xl font-bold text-white mb-2">TRAINING...</div>
                        <div className="font-mono text-xl text-zinc-500">
                            EPOCH: <span className="text-accent">{epochValue.toString().padStart(3, '0')}</span>
                        </div>
                        <div className="font-mono text-xl text-zinc-500">
                            LOSS: <span className="text-accent">{lossValue.toFixed(4)}</span>
                        </div>
                    </div>

                    {/* Deploy Label (Center/Bottom) */}
                    <div
                        style={{ opacity: opacityDeploy, transform: `scale(${0.9 + 0.1 * opacityDeploy})` }}
                        className="absolute bottom-1/4"
                    >
                        <h1 className="text-6xl font-black text-accent tracking-tighter mb-4">DEPLOY</h1>
                        <div className="text-2xl text-white font-mono text-center">FRAN CLARKE</div>
                        <div className="text-xl text-zinc-500 text-center">AI/ML ENGINEER</div>
                    </div>
                </AbsoluteFill>

            </div>
        </AbsoluteFill>
    );
};

// Reused path generator
function generateTracePath(): string {
    const points: [number, number][] = [];
    const steps = 30; // More steps for smoothness in video
    // Start top center (50, 0) -> down to (50, 100)
    // Add noise to X
    for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const y = t * 100;
        const noiseAmp = 10 * (1 - t * t); // Decays
        const noise = Math.sin(t * 15) * noiseAmp;
        const x = 50 + noise;
        points.push([x, y]);
    }

    let d = `M ${points[0][0]} ${points[0][1]}`;
    for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        const cpY = (prev[1] + curr[1]) / 2;
        d += ` C ${prev[0]} ${cpY}, ${curr[0]} ${cpY}, ${curr[0]} ${curr[1]}`;
    }
    return d;
}
