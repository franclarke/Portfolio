"use client";

import { useMemo, useState } from "react";
import { reliabilityData } from "@/content/data/reliability";

export default function ReliabilityVault() {
  const [snapshotId, setSnapshotId] = useState<string>(reliabilityData.snapshots[2]?.id ?? "v1");

  const selectedSnapshot = useMemo(
    () => reliabilityData.snapshots.find((snapshot) => snapshot.id === snapshotId),
    [snapshotId]
  );

  const gates = reliabilityData.gatesBySnapshot[snapshotId] ?? [];
  const traces = reliabilityData.tracesBySnapshot[snapshotId] ?? [];

  return (
    <div className="rv-shell" data-testid="reliability-vault">
      <div className="rv-snapshots" role="tablist" aria-label="Reliability snapshots">
        {reliabilityData.snapshots.map((snapshot) => (
          <button
            key={snapshot.id}
            type="button"
            role="tab"
            className={`rv-snapshot ${snapshot.id === snapshotId ? "active" : ""}`}
            aria-selected={snapshot.id === snapshotId}
            onClick={() => setSnapshotId(snapshot.id)}
          >
            <span>{snapshot.label}</span>
            <small>{snapshot.date}</small>
          </button>
        ))}
      </div>

      {selectedSnapshot && (
        <p className="rv-description text-body">{selectedSnapshot.description}</p>
      )}

      <div className="rv-grid">
        <section className="rv-panel">
          <h3 className="text-subhead">QA Gating</h3>
          <div className="rv-gates">
            {gates.map((gate) => (
              <article key={gate.id} className="rv-gate-item">
                <div>
                  <p className="gate-name">{gate.gate}</p>
                  <p className="gate-note">{gate.note}</p>
                </div>
                <div className="gate-meta">
                  <span className={`gate-status ${gate.status}`}>{gate.status}</span>
                  <span className="gate-metric">{gate.metric}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rv-panel">
          <h3 className="text-subhead">Trace Timeline</h3>
          <ol className="rv-traces">
            {traces.map((trace) => (
              <li key={trace.step} className="rv-trace-row">
                <span className="trace-step">{trace.step}</span>
                <span className="trace-outcome">{trace.outcome}</span>
                <span className="trace-latency">{trace.latencyMs.toFixed(1)}ms</span>
              </li>
            ))}
          </ol>

          <div className="rv-budget-grid">
            {reliabilityData.latencyBudgets.map((budget) => (
              <div className="rv-budget" key={budget.label}>
                <span className="budget-label">{budget.label}</span>
                <strong>{budget.value}</strong>
                <p>{budget.note}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <style jsx>{`
        .rv-shell {
          border: 1px solid var(--border);
          border-radius: 16px;
          background: linear-gradient(
            145deg,
            rgba(89, 184, 255, 0.12),
            rgba(11, 13, 18, 0.95) 35%,
            rgba(232, 255, 89, 0.08)
          );
          padding: var(--space-lg);
          display: grid;
          gap: var(--space-md);
        }
        .rv-snapshots {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: var(--space-sm);
        }
        .rv-snapshot {
          border: 1px solid var(--border);
          border-radius: 10px;
          background: rgba(10, 13, 18, 0.84);
          color: var(--text-secondary);
          padding: 10px 12px;
          text-align: left;
          display: grid;
          gap: 4px;
          cursor: pointer;
          transition:
            border-color var(--duration-fast) var(--ease-out-quint),
            color var(--duration-fast) var(--ease-out-quint),
            background var(--duration-fast) var(--ease-out-quint);
        }
        .rv-snapshot small {
          color: var(--text-muted);
          font-size: 0.72rem;
        }
        .rv-snapshot.active,
        .rv-snapshot:hover {
          color: var(--text-primary);
          border-color: rgba(232, 255, 89, 0.55);
          background: rgba(18, 24, 14, 0.95);
        }
        .rv-description {
          color: var(--text-secondary);
          max-width: 70ch;
        }
        .rv-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-md);
        }
        .rv-panel {
          border: 1px solid var(--border);
          border-radius: 12px;
          background: rgba(10, 13, 18, 0.8);
          padding: var(--space-md);
          display: grid;
          gap: var(--space-sm);
        }
        .rv-gates {
          display: grid;
          gap: var(--space-xs);
        }
        .rv-gate-item {
          border: 1px solid var(--border);
          border-radius: 9px;
          padding: 10px;
          display: flex;
          justify-content: space-between;
          gap: var(--space-sm);
        }
        .gate-name {
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 0.8rem;
          color: var(--text-primary);
          margin-bottom: 2px;
        }
        .gate-note {
          color: var(--text-muted);
          font-size: 0.76rem;
          line-height: 1.4;
          max-width: 28ch;
        }
        .gate-meta {
          display: grid;
          justify-items: end;
          align-content: center;
          gap: 3px;
        }
        .gate-status {
          font-family: var(--font-jetbrains-mono), monospace;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-size: 0.68rem;
          padding: 2px 8px;
          border-radius: 999px;
          border: 1px solid currentColor;
        }
        .gate-status.pass {
          color: var(--accent);
        }
        .gate-status.fail {
          color: var(--warning);
        }
        .gate-metric {
          color: var(--text-secondary);
          font-size: 0.76rem;
        }
        .rv-traces {
          list-style: none;
          display: grid;
          gap: 6px;
        }
        .rv-trace-row {
          display: grid;
          grid-template-columns: minmax(0, 1.2fr) auto auto;
          gap: var(--space-sm);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 8px 10px;
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 0.75rem;
        }
        .trace-step {
          color: var(--text-primary);
        }
        .trace-outcome {
          color: var(--accent-alt);
        }
        .trace-latency {
          color: var(--text-secondary);
        }
        .rv-budget-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: var(--space-xs);
          margin-top: var(--space-xs);
        }
        .rv-budget {
          border: 1px solid var(--border);
          border-radius: 8px;
          background: rgba(7, 10, 14, 0.86);
          padding: 8px;
          display: grid;
          gap: 4px;
        }
        .budget-label {
          color: var(--text-muted);
          font-size: 0.67rem;
          text-transform: uppercase;
        }
        .rv-budget strong {
          color: var(--text-primary);
          font-size: 0.9rem;
        }
        .rv-budget p {
          color: var(--text-muted);
          font-size: 0.7rem;
          line-height: 1.35;
        }
        @media (max-width: 1000px) {
          .rv-grid {
            grid-template-columns: 1fr;
          }
          .rv-budget-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
