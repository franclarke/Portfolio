"use client";

import { useViewMode } from "@/lib/viewMode";
import type { Project } from "@/content/data/projects";
import ModelCard from "@/components/ui/ModelCard";
import type { ReactNode } from "react";

interface ProjectShowcaseProps {
  project: Project;
  index: number;
  artifact: ReactNode;
}

export default function ProjectShowcase({
  project,
  index,
  artifact,
}: ProjectShowcaseProps) {
  const { isBuilder } = useViewMode();
  const reversed = index % 2 === 1;

  return (
    <article
      className={`showcase ${reversed ? "showcase--reversed" : ""}`}
      id={`project-${project.slug}`}
    >
      <div className="showcase-info">
        <div className="showcase-meta">
          <span className="showcase-index text-mono">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="showcase-status text-caption">{project.status}</span>
          <span className="showcase-track text-caption">{project.track.replace("-", " ")}</span>
        </div>

        <h3 className="showcase-title text-heading">{project.title}</h3>
        <p className="showcase-tagline text-subhead">{project.tagline}</p>

        <p className="showcase-desc text-body">
          {isBuilder ? project.description.builder : project.description.explain}
        </p>

        <div className="showcase-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>

        <div className="showcase-actions">
          <ModelCard project={project} />
          <a href={`/project/${project.slug}`} className="cs-link text-mono">
            View case study {"->"}
          </a>
        </div>
      </div>

      <div className="showcase-artefact">{artifact}</div>

      <style jsx>{`
        .showcase {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: var(--space-3xl);
          align-items: start;
          padding: var(--space-3xl) 0;
          border-bottom: 1px solid var(--border);
        }
        .showcase:last-child {
          border-bottom: none;
        }
        .showcase--reversed {
          direction: rtl;
        }
        .showcase--reversed > * {
          direction: ltr;
        }
        .showcase-info {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
          position: sticky;
          top: calc(var(--header-height) + var(--space-xl));
        }
        .showcase-meta {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          flex-wrap: wrap;
        }
        .showcase-index {
          font-size: 0.6875rem;
          color: var(--text-muted);
          letter-spacing: 0.05em;
        }
        .showcase-status,
        .showcase-track {
          color: var(--accent);
          padding: 2px var(--space-xs);
          border: 1px solid rgba(232, 255, 89, 0.45);
          border-radius: 999px;
          font-size: 0.58rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .showcase-track {
          color: var(--accent-alt);
          border-color: rgba(89, 184, 255, 0.4);
        }
        .showcase-title {
          font-size: clamp(1.75rem, 3vw, 2.25rem);
        }
        .showcase-tagline {
          color: var(--text-secondary);
        }
        .showcase-desc {
          color: var(--text-secondary);
          line-height: 1.7;
        }
        .showcase-tags {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2xs);
        }
        .tag {
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 0.6875rem;
          color: var(--text-muted);
          padding: 2px var(--space-xs);
          border: 1px solid var(--border);
          border-radius: 3px;
          transition: border-color var(--duration-fast) var(--ease-out-quint);
        }
        .tag:hover {
          border-color: var(--border-hover);
        }
        .showcase-actions {
          padding-top: var(--space-xs);
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
          align-items: flex-start;
        }
        .cs-link {
          font-size: 0.8125rem;
          color: var(--text-muted);
          text-decoration: none;
          transition: color var(--duration-fast) var(--ease-out-quint);
        }
        .cs-link:hover {
          color: var(--accent);
        }
        .showcase-artefact {
          min-width: 0;
          width: 100%;
        }

        @media (max-width: 900px) {
          .showcase {
            grid-template-columns: 1fr;
            gap: var(--space-xl);
          }
          .showcase--reversed {
            direction: ltr;
          }
          .showcase-info {
            position: static;
          }
        }
      `}</style>
    </article>
  );
}
