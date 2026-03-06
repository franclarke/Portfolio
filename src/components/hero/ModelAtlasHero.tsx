"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ProjectTrack } from "@/content/data/projects";
import { useMotionTier } from "@/lib/motion";
import ModelAtlasFallback from "@/components/hero/ModelAtlasFallback";
import {
  atlasFaceByKey,
  atlasFaces,
  type AtlasFaceKey,
} from "@/components/hero/modelAtlasConfig";

const ModelAtlasScene = dynamic(() => import("@/components/hero/ModelAtlasScene"), {
  ssr: false,
});

interface ModelAtlasHeroProps {
  onSelectTrack: (track: ProjectTrack) => void;
  onNavigate: (sectionId: "pareto" | "projects" | "reliability" | "experience" | "contact") => void;
  cvHref: string;
}

export default function ModelAtlasHero({
  onSelectTrack,
  onNavigate,
  cvHref,
}: ModelAtlasHeroProps) {
  const tier = useMotionTier();
  const [activeFace, setActiveFace] = useState<AtlasFaceKey>("vision");
  const timerRef = useRef<number | null>(null);

  const activeFaceData = useMemo(() => atlasFaceByKey[activeFace], [activeFace]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const activateFace = (face: AtlasFaceKey) => {
    setActiveFace(face);
    const metadata = atlasFaceByKey[face];

    if (metadata.track) {
      onSelectTrack(metadata.track);
    }

    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }

    timerRef.current = window.setTimeout(() => {
      onNavigate(metadata.sectionId);
    }, 460);
  };

  return (
    <div className="atlas-hero">
      <div className="atlas-copy">
        <p className="atlas-eyebrow text-caption">Applied AI / ML Engineer</p>
        <h1 className="text-display">
          Build signal
          <br />
          from <span className="atlas-accent">noisy reality</span>
        </h1>
        <p className="text-body atlas-sub">
          I design production-oriented AI systems across computer vision, GenAI,
          and reliability-critical APIs. Football intelligence is one vertical, not
          the limit.
        </p>

        <div className="atlas-ctas">
          <a href="#projects" className="btn-primary">
            Explore projects
          </a>
          <a href="#contact" className="btn-ghost">
            Contact me
          </a>
          <a href={cvHref} className="btn-ghost" target="_blank" rel="noopener noreferrer">
            Download CV
          </a>
        </div>

        <div className="atlas-inline-nav" role="list" aria-label="Model Atlas domains">
          {atlasFaces.map((face) => (
            <button
              type="button"
              key={face.key}
              role="listitem"
              className={`atlas-inline-btn ${activeFace === face.key ? "active" : ""}`}
              onMouseEnter={() => setActiveFace(face.key)}
              onFocus={() => setActiveFace(face.key)}
              onClick={() => activateFace(face.key)}
            >
              {face.label}
            </button>
          ))}
        </div>

        <p className="atlas-active text-caption" aria-live="polite">
          {activeFaceData.description}
        </p>
      </div>

      <div className="atlas-visual">
        {tier === "full" ? (
          <ModelAtlasScene
            activeFace={activeFace}
            onFaceChange={setActiveFace}
            onFaceActivate={activateFace}
          />
        ) : (
          <ModelAtlasFallback
            activeFace={activeFace}
            onFaceChange={setActiveFace}
            onFaceActivate={activateFace}
          />
        )}
      </div>

      <style jsx>{`
        .atlas-hero {
          width: 100%;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
          gap: var(--space-2xl);
          align-items: center;
          padding-left: 54px;
        }
        .atlas-copy {
          display: grid;
          gap: var(--space-md);
        }
        .atlas-eyebrow {
          color: var(--accent);
        }
        .atlas-accent {
          color: var(--accent);
        }
        .atlas-sub {
          max-width: 56ch;
          color: var(--text-secondary);
        }
        .atlas-ctas {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-sm);
          padding-top: var(--space-xs);
        }
        :global(.btn-primary),
        :global(.btn-ghost) {
          display: inline-flex;
          align-items: center;
          padding: var(--space-sm) var(--space-lg);
          border-radius: 8px;
          text-decoration: none;
          font-size: 0.83rem;
          font-weight: 600;
          border: 1px solid transparent;
          transition:
            opacity var(--duration-fast) var(--ease-out-quint),
            border-color var(--duration-fast) var(--ease-out-quint),
            transform var(--duration-fast) var(--ease-out-quint);
        }
        :global(.btn-primary) {
          background: var(--accent);
          color: #0a0b0f;
        }
        :global(.btn-primary:hover) {
          opacity: 0.92;
          transform: translateY(-1px);
        }
        :global(.btn-ghost) {
          background: rgba(12, 14, 18, 0.75);
          border-color: var(--border-hover);
          color: var(--text-primary);
        }
        :global(.btn-ghost:hover) {
          border-color: var(--accent);
          transform: translateY(-1px);
        }
        .atlas-inline-nav {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-xs);
          padding-top: var(--space-sm);
        }
        .atlas-inline-btn {
          border: 1px solid var(--border);
          background: rgba(13, 15, 19, 0.88);
          color: var(--text-secondary);
          border-radius: 999px;
          padding: 6px 12px;
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 0.73rem;
          cursor: pointer;
          transition:
            color var(--duration-fast) var(--ease-out-quint),
            border-color var(--duration-fast) var(--ease-out-quint),
            background var(--duration-fast) var(--ease-out-quint);
        }
        .atlas-inline-btn:hover,
        .atlas-inline-btn.active {
          color: var(--text-primary);
          border-color: rgba(232, 255, 89, 0.56);
          background: rgba(27, 33, 16, 0.95);
        }
        .atlas-active {
          color: var(--text-muted);
          max-width: 56ch;
        }
        .atlas-visual {
          width: 100%;
        }
        @media (max-width: 1100px) {
          .atlas-hero {
            grid-template-columns: 1fr;
            padding-left: 0;
          }
        }
      `}</style>
    </div>
  );
}
