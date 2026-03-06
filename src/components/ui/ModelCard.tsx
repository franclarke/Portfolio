"use client";

import { useState } from "react";
import type { Project } from "@/content/data/projects";

interface ModelCardProps {
    project: Project;
}

export default function ModelCard({ project }: ModelCardProps) {
    const [isOpen, setIsOpen] = useState(false);
    const mc = project.modelCard;

    return (
        <div
            className="model-card-wrapper"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <button
                className="model-card-trigger"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-label={`Model card for ${project.title}`}
            >
                <span className="trigger-icon">[]</span>
                <span className="trigger-label text-caption">Model Card</span>
            </button>

            {isOpen && (
                <div className="model-card" role="tooltip">
                    <div className="mc-header">
                        <span className="mc-task text-caption">{mc.task}</span>
                    </div>
                    <div className="mc-grid">
                        <div className="mc-field">
                            <span className="mc-label">Data</span>
                            <span className="mc-value">{mc.data}</span>
                        </div>
                        <div className="mc-field">
                            <span className="mc-label">Model</span>
                            <span className="mc-value">{mc.model}</span>
                        </div>
                        <div className="mc-field">
                            <span className="mc-label">Key metric</span>
                            <span className="mc-value mc-metric">{mc.keyMetric}</span>
                        </div>
                        <div className="mc-field">
                            <span className="mc-label">Latency</span>
                            <span className="mc-value">{mc.latency}</span>
                        </div>
                    </div>
                    <div className="mc-failures">
                        <span className="mc-label">Failure modes</span>
                        <ul className="mc-failure-list">
                            {mc.failureModes.map((f, i) => (
                                <li key={i}>{f}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            <style jsx>{`
        .model-card-wrapper {
          position: relative;
          display: inline-block;
        }
        .model-card-trigger {
          display: flex;
          align-items: center;
          gap: var(--space-2xs);
          background: none;
          border: 1px solid var(--border);
          border-radius: 4px;
          padding: var(--space-2xs) var(--space-xs);
          cursor: pointer;
          transition: border-color var(--duration-fast) var(--ease-out-quint);
        }
        .model-card-trigger:hover {
          border-color: var(--accent);
        }
        .trigger-icon {
          color: var(--accent);
          font-size: 0.875rem;
        }
        .trigger-label {
          color: var(--text-secondary);
        }
        .model-card {
          position: absolute;
          bottom: calc(100% + 8px);
          left: 0;
          z-index: 50;
          width: 340px;
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: var(--space-md);
          animation: mc-enter var(--duration-normal) var(--ease-out-quint);
        }
        @keyframes mc-enter {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .mc-header {
          margin-bottom: var(--space-sm);
          padding-bottom: var(--space-sm);
          border-bottom: 1px solid var(--border);
        }
        .mc-task {
          color: var(--accent);
        }
        .mc-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-sm);
          margin-bottom: var(--space-sm);
        }
        .mc-field {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .mc-label {
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 0.6875rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .mc-value {
          font-size: 0.8125rem;
          color: var(--text-primary);
          line-height: 1.4;
        }
        .mc-metric {
          color: var(--accent);
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 0.75rem;
        }
        .mc-failures {
          padding-top: var(--space-sm);
          border-top: 1px solid var(--border);
        }
        .mc-failure-list {
          list-style: none;
          margin-top: 4px;
        }
        .mc-failure-list li {
          font-size: 0.75rem;
          color: var(--text-secondary);
          line-height: 1.5;
          padding-left: var(--space-sm);
          position: relative;
        }
        .mc-failure-list li::before {
          content: "!";
          position: absolute;
          left: 0;
          color: var(--warning);
          font-size: 0.625rem;
        }
        @media (prefers-reduced-motion: reduce) {
          .model-card {
            animation: none;
          }
        }
      `}</style>
        </div>
    );
}
