"use client";

import { useMemo, useState } from "react";

type Quantization = "fp16" | "int8" | "int4";
type LoraRank = 8 | 16 | 32 | 64;
type BatchSize = 1 | 2 | 4 | 8;

interface Candidate {
  id: string;
  label: string;
  quality: number;
  latency: number;
  memory: number;
}

const BASE_POINTS: Candidate[] = [
  { id: "vision", label: "Vision Detector", quality: 0.89, latency: 28, memory: 5.4 },
  { id: "tts", label: "TTS Inference", quality: 0.92, latency: 42, memory: 6.6 },
  { id: "decision", label: "Decision API", quality: 0.95, latency: 17, memory: 2.3 },
  { id: "scouting", label: "Scouting Ranker", quality: 0.87, latency: 26, memory: 3.1 },
  { id: "multimodal", label: "Multimodal Router", quality: 0.9, latency: 36, memory: 4.9 },
  { id: "qa", label: "QA Gate Runtime", quality: 0.93, latency: 22, memory: 2.8 },
];

const QUANTIZATION_FACTORS: Record<Quantization, { quality: number; latency: number; memory: number }> = {
  fp16: { quality: 1, latency: 1, memory: 1 },
  int8: { quality: 0.972, latency: 0.77, memory: 0.64 },
  int4: { quality: 0.915, latency: 0.6, memory: 0.44 },
};

const RANK_FACTORS: Record<LoraRank, { quality: number; latency: number; memory: number }> = {
  8: { quality: 0.965, latency: 0.8, memory: 0.7 },
  16: { quality: 0.985, latency: 0.9, memory: 0.83 },
  32: { quality: 1, latency: 1, memory: 1 },
  64: { quality: 1.012, latency: 1.14, memory: 1.22 },
};

const BATCH_FACTORS: Record<BatchSize, { quality: number; latency: number; memory: number }> = {
  1: { quality: 0.995, latency: 0.84, memory: 0.62 },
  2: { quality: 1, latency: 1, memory: 0.82 },
  4: { quality: 1.001, latency: 1.11, memory: 1 },
  8: { quality: 1.002, latency: 1.31, memory: 1.34 },
};

const RANK_OPTIONS: LoraRank[] = [8, 16, 32, 64];
const BATCH_OPTIONS: BatchSize[] = [1, 2, 4, 8];

function getParetoFront(points: Candidate[]) {
  return points.filter((current) => {
    return !points.some((other) => {
      const dominates =
        other.quality >= current.quality &&
        other.latency <= current.latency &&
        other.memory <= current.memory;
      const strictlyBetter =
        other.quality > current.quality ||
        other.latency < current.latency ||
        other.memory < current.memory;
      return dominates && strictlyBetter;
    });
  });
}

function scale(value: number, min: number, max: number, pxMin: number, pxMax: number) {
  if (max === min) return (pxMin + pxMax) / 2;
  const ratio = (value - min) / (max - min);
  return pxMin + ratio * (pxMax - pxMin);
}

export default function ParetoArena() {
  const [quantization, setQuantization] = useState<Quantization>("int8");
  const [rank, setRank] = useState<LoraRank>(32);
  const [batch, setBatch] = useState<BatchSize>(2);

  const points = useMemo(() => {
    const q = QUANTIZATION_FACTORS[quantization];
    const r = RANK_FACTORS[rank];
    const b = BATCH_FACTORS[batch];

    return BASE_POINTS.map((item) => ({
      ...item,
      quality: Number((item.quality * q.quality * r.quality * b.quality).toFixed(3)),
      latency: Number((item.latency * q.latency * r.latency * b.latency).toFixed(1)),
      memory: Number((item.memory * q.memory * r.memory * b.memory).toFixed(2)),
    }));
  }, [quantization, rank, batch]);

  const front = useMemo(() => getParetoFront(points), [points]);

  const ranges = useMemo(() => {
    const latencies = points.map((p) => p.latency);
    const qualities = points.map((p) => p.quality);
    const memories = points.map((p) => p.memory);

    return {
      latency: [Math.min(...latencies) - 2, Math.max(...latencies) + 2] as [number, number],
      quality: [Math.min(...qualities) - 0.03, Math.max(...qualities) + 0.03] as [number, number],
      memory: [Math.min(...memories), Math.max(...memories)] as [number, number],
    };
  }, [points]);

  const summary = useMemo(() => {
    const avgQuality = points.reduce((sum, item) => sum + item.quality, 0) / points.length;
    const avgLatency = points.reduce((sum, item) => sum + item.latency, 0) / points.length;
    const avgMemory = points.reduce((sum, item) => sum + item.memory, 0) / points.length;

    return {
      quality: `${(avgQuality * 100).toFixed(1)}%`,
      latency: `${avgLatency.toFixed(1)}ms`,
      memory: `${avgMemory.toFixed(2)}GB`,
    };
  }, [points]);

  const frontSet = new Set(front.map((item) => item.id));
  const [minLatency, maxLatency] = ranges.latency;
  const [minQuality, maxQuality] = ranges.quality;
  const [minMemory, maxMemory] = ranges.memory;

  return (
    <div className="pareto-shell" data-testid="pareto-arena">
      <div className="pareto-controls" role="group" aria-label="Pareto controls">
        <label className="control-item">
          <span className="text-caption">Quantization</span>
          <select
            value={quantization}
            onChange={(event) => setQuantization(event.target.value as Quantization)}
          >
            <option value="fp16">fp16</option>
            <option value="int8">int8</option>
            <option value="int4">int4</option>
          </select>
        </label>

        <label className="control-item">
          <span className="text-caption">LoRA rank</span>
          <select
            value={rank}
            onChange={(event) => setRank(Number(event.target.value) as LoraRank)}
          >
            {RANK_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="control-item">
          <span className="text-caption">Batch size</span>
          <select
            value={batch}
            onChange={(event) => setBatch(Number(event.target.value) as BatchSize)}
          >
            {BATCH_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="pareto-graph">
        <svg viewBox="0 0 760 420" role="img" aria-label="Pareto frontier for quality, latency and memory">
          <defs>
            <linearGradient id="pareto-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#59b8ff" />
              <stop offset="100%" stopColor="#e8ff59" />
            </linearGradient>
          </defs>

          <rect x="60" y="30" width="640" height="320" fill="rgba(11, 14, 18, 0.9)" stroke="rgba(255,255,255,0.1)" />

          {[0, 1, 2, 3, 4].map((step) => {
            const y = 30 + step * 80;
            return (
              <line
                key={`y-${step}`}
                x1={60}
                y1={y}
                x2={700}
                y2={y}
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
              />
            );
          })}

          {[0, 1, 2, 3, 4].map((step) => {
            const x = 60 + step * 160;
            return (
              <line
                key={`x-${step}`}
                x1={x}
                y1={30}
                x2={x}
                y2={350}
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
              />
            );
          })}

          <text x="380" y="392" textAnchor="middle" fill="#8f9aa6" fontSize="12">
            Latency (lower is better)
          </text>
          <text x="18" y="190" transform="rotate(-90 18 190)" textAnchor="middle" fill="#8f9aa6" fontSize="12">
            Quality (higher is better)
          </text>

          {points.map((point) => {
            const cx = scale(point.latency, minLatency, maxLatency, 80, 680);
            const cy = scale(point.quality, minQuality, maxQuality, 330, 50);
            const radius = scale(point.memory, minMemory, maxMemory, 6, 15);
            const isFront = frontSet.has(point.id);

            return (
              <g key={point.id}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={radius}
                  fill={isFront ? "url(#pareto-gradient)" : "rgba(147, 161, 177, 0.5)"}
                  stroke={isFront ? "#f4ffd0" : "rgba(12,14,18,0.7)"}
                  strokeWidth={isFront ? 1.7 : 1}
                />
                <text x={cx + 12} y={cy - 10} fill={isFront ? "#f6ffe0" : "#9cabb9"} fontSize="11">
                  {point.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="pareto-summary">
        <div className="summary-card">
          <span className="text-caption">Quality impact</span>
          <strong>{summary.quality}</strong>
        </div>
        <div className="summary-card">
          <span className="text-caption">Latency impact</span>
          <strong>{summary.latency}</strong>
        </div>
        <div className="summary-card">
          <span className="text-caption">Memory impact</span>
          <strong>{summary.memory}</strong>
        </div>
      </div>

      <style jsx>{`
        .pareto-shell {
          width: 100%;
          display: grid;
          gap: var(--space-lg);
          border-radius: 16px;
          border: 1px solid var(--border);
          background: linear-gradient(
            140deg,
            rgba(89, 184, 255, 0.08),
            rgba(10, 13, 18, 0.94) 36%,
            rgba(232, 255, 89, 0.08)
          );
          padding: var(--space-lg);
        }
        .pareto-controls {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: var(--space-sm);
        }
        .control-item {
          display: grid;
          gap: 6px;
        }
        .control-item span {
          color: var(--text-muted);
        }
        .control-item select {
          border-radius: 8px;
          border: 1px solid var(--border);
          background: rgba(12, 14, 18, 0.9);
          color: var(--text-primary);
          padding: 10px;
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 0.82rem;
        }
        .pareto-graph {
          width: 100%;
          overflow-x: auto;
        }
        svg {
          min-width: 640px;
          width: 100%;
          height: auto;
          display: block;
        }
        .pareto-summary {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: var(--space-sm);
        }
        .summary-card {
          border-radius: 10px;
          border: 1px solid var(--border);
          background: rgba(9, 12, 16, 0.84);
          padding: var(--space-sm);
          display: grid;
          gap: 6px;
        }
        .summary-card span {
          color: var(--text-muted);
        }
        .summary-card strong {
          color: var(--text-primary);
          font-size: 1.12rem;
          font-family: var(--font-space-grotesk), system-ui, sans-serif;
        }
        @media (max-width: 900px) {
          .pareto-controls,
          .pareto-summary {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
