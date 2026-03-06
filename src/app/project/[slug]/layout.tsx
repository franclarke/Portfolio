import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: "index, follow",
};

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="case-study-layout">
      {children}

      <style>{`
        .case-study-layout {
          max-width: 920px;
          margin: 0 auto;
          padding: var(--space-5xl) var(--space-lg) var(--space-3xl);
        }

        .cs-hero {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
          padding-bottom: var(--space-3xl);
          border-bottom: 1px solid var(--border);
          margin-bottom: var(--space-3xl);
        }
        .cs-back {
          color: var(--text-muted);
          text-decoration: none;
          font-size: 0.75rem;
          transition: color var(--duration-fast) var(--ease-out-quint);
          width: fit-content;
        }
        .cs-back:hover {
          color: var(--accent);
        }
        .cs-hero-meta {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          flex-wrap: wrap;
        }
        .cs-status {
          color: var(--accent);
          padding: 2px var(--space-xs);
          border: 1px solid var(--accent);
          border-radius: 3px;
          font-size: 0.6rem;
          text-transform: uppercase;
        }
        .cs-tags {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2xs);
        }
        .cs-tag {
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 0.6875rem;
          color: var(--text-muted);
          padding: 2px var(--space-xs);
          border: 1px solid var(--border);
          border-radius: 3px;
        }
        .cs-tagline {
          color: var(--text-secondary);
        }

        .cs-section {
          display: grid;
          grid-template-columns: 140px 1fr;
          gap: var(--space-xl);
          padding: var(--space-2xl) 0;
          border-bottom: 1px solid var(--border);
        }
        .cs-section:last-of-type {
          border-bottom: none;
        }
        .cs-section-label {
          display: flex;
          flex-direction: column;
          gap: var(--space-2xs);
          color: var(--text-muted);
          position: sticky;
          top: calc(var(--header-height) + var(--space-md));
          align-self: start;
        }
        .cs-section-label span:first-child {
          color: var(--accent);
          font-size: 0.625rem;
        }
        .cs-section-content {
          min-width: 0;
        }
        .cs-section-content .text-body {
          color: var(--text-secondary);
          line-height: 1.75;
        }

        .cs-pipeline {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .cs-pipeline-step {
          position: relative;
          padding: var(--space-md) 0;
        }
        .cs-step-head {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          margin-bottom: var(--space-xs);
        }
        .cs-step-num {
          font-size: 0.6875rem;
          color: var(--accent);
          min-width: 24px;
        }
        .cs-step-name {
          font-weight: 500;
        }
        .cs-step-detail {
          padding-left: calc(24px + var(--space-sm));
          color: var(--text-secondary);
        }
        .cs-step-connector {
          position: absolute;
          left: 11px;
          bottom: -2px;
          width: 1px;
          height: var(--space-sm);
          background: var(--border-hover);
        }

        .cs-results {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: var(--space-lg);
        }
        .cs-result {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: var(--space-md);
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: 8px;
        }
        .cs-result-value {
          color: var(--accent);
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 1.5rem;
          font-weight: 700;
          line-height: 1.2;
        }
        .cs-result-label {
          color: var(--text-muted);
          font-size: 0.625rem;
        }
        .cs-result-note {
          color: var(--text-secondary);
          font-size: 0.75rem;
          line-height: 1.4;
        }

        .cs-model-card {
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: 8px;
          overflow: hidden;
        }
        .cs-mc-row {
          display: grid;
          grid-template-columns: 120px 1fr;
          gap: var(--space-md);
          padding: var(--space-sm) var(--space-md);
          border-bottom: 1px solid var(--border);
        }
        .cs-mc-row:last-child {
          border-bottom: none;
        }
        .cs-mc-key {
          color: var(--text-muted);
          font-size: 0.625rem;
          padding-top: 4px;
        }
        .cs-mc-val {
          color: var(--text-secondary);
          font-size: 0.875rem;
        }
        .cs-mc-row--failures {
          align-items: start;
        }
        .cs-mc-failures {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: var(--space-2xs);
        }
        .cs-mc-failures li {
          color: var(--warning);
          font-size: 0.8125rem;
          padding-left: var(--space-sm);
          position: relative;
        }
        .cs-mc-failures li::before {
          content: "!";
          position: absolute;
          left: 0;
          font-size: 0.625rem;
        }

        .cs-lessons {
          display: flex;
          flex-direction: column;
          gap: var(--space-lg);
        }
        .cs-lesson {
          display: flex;
          gap: var(--space-sm);
          align-items: start;
        }
        .cs-lesson-num {
          color: var(--accent);
          font-size: 0.6875rem;
          min-width: 24px;
          padding-top: 4px;
        }
        .cs-lesson p {
          color: var(--text-secondary);
          line-height: 1.7;
        }

        .cs-footer {
          padding: var(--space-3xl) 0;
          text-align: center;
        }
        .cs-footer-back {
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 0.8125rem;
          color: var(--text-muted);
          text-decoration: none;
          padding: var(--space-sm) var(--space-xl);
          border: 1px solid var(--border);
          border-radius: 6px;
          transition: all var(--duration-fast) var(--ease-out-quint);
        }
        .cs-footer-back:hover {
          color: var(--accent);
          border-color: var(--accent);
        }

        @media (max-width: 640px) {
          .cs-section {
            grid-template-columns: 1fr;
            gap: var(--space-sm);
          }
          .cs-section-label {
            position: static;
            flex-direction: row;
            gap: var(--space-sm);
          }
          .cs-mc-row {
            grid-template-columns: 1fr;
            gap: var(--space-2xs);
          }
        }
      `}</style>
    </div>
  );
}
