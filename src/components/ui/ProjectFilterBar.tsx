"use client";

export type ProjectFilter = "all" | "applied-ai" | "football-lab";

interface ProjectFilterBarProps {
  value: ProjectFilter;
  onChange: (value: ProjectFilter) => void;
  counts: Record<ProjectFilter, number>;
}

const FILTERS: Array<{ id: ProjectFilter; label: string }> = [
  { id: "all", label: "All" },
  { id: "applied-ai", label: "Applied AI" },
  { id: "football-lab", label: "Football Lab" },
];

export default function ProjectFilterBar({
  value,
  onChange,
  counts,
}: ProjectFilterBarProps) {
  return (
    <div className="project-filter" role="toolbar" aria-label="Project filters">
      {FILTERS.map((filter) => (
        <button
          key={filter.id}
          type="button"
          className={`filter-chip ${value === filter.id ? "active" : ""}`}
          onClick={() => onChange(filter.id)}
          aria-pressed={value === filter.id}
        >
          <span>{filter.label}</span>
          <span className="chip-count">{counts[filter.id]}</span>
        </button>
      ))}

      <style jsx>{`
        .project-filter {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-sm);
          margin-bottom: var(--space-xl);
        }
        .filter-chip {
          display: inline-flex;
          align-items: center;
          gap: var(--space-xs);
          border-radius: 999px;
          border: 1px solid var(--border);
          padding: 8px 12px;
          background: rgba(12, 14, 18, 0.84);
          color: var(--text-secondary);
          cursor: pointer;
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 0.76rem;
          transition:
            color var(--duration-fast) var(--ease-out-quint),
            border-color var(--duration-fast) var(--ease-out-quint),
            background var(--duration-fast) var(--ease-out-quint);
        }
        .filter-chip:hover,
        .filter-chip.active {
          color: var(--text-primary);
          border-color: rgba(232, 255, 89, 0.5);
          background: rgba(20, 28, 15, 0.95);
        }
        .chip-count {
          min-width: 1.25rem;
          text-align: center;
          border-radius: 999px;
          padding: 2px 7px;
          background: rgba(255, 255, 255, 0.08);
          color: var(--accent);
          font-size: 0.7rem;
        }
      `}</style>
    </div>
  );
}
