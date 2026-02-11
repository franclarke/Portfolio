"use client";

import { useViewMode } from "@/lib/viewMode";
import { projects } from "@/content/data/projects";
import ModelCard from "@/components/ui/ModelCard";

export default function ProjectCard({
    slug,
}: {
    slug: string;
}) {
    const { isBuilder } = useViewMode();
    const project = projects.find((p) => p.slug === slug);
    if (!project) return null;

    return (
        <article className="project-card">
            <div className="project-card-header">
                <span className="project-status text-caption">{project.status}</span>
                <h3 className="text-heading">{project.title}</h3>
                <p className="project-tagline text-subhead">{project.tagline}</p>
            </div>

            <p className="project-desc text-body">
                {isBuilder ? project.description.builder : project.description.explain}
            </p>

            <div className="project-footer">
                <div className="project-tags">
                    {project.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="tag">{tag}</span>
                    ))}
                </div>
                <ModelCard project={project} />
            </div>

            <style jsx>{`
        .project-card {
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: var(--space-xl);
          display: flex;
          flex-direction: column;
          gap: var(--space-lg);
          transition: border-color var(--duration-normal) var(--ease-out-quint);
        }
        .project-card:hover {
          border-color: var(--border-hover);
        }
        .project-card-header {
          display: flex;
          flex-direction: column;
          gap: var(--space-xs);
        }
        .project-status {
          color: var(--accent);
          width: fit-content;
          padding: 2px var(--space-xs);
          border: 1px solid var(--accent);
          border-radius: 3px;
          font-size: 0.625rem;
        }
        .project-tagline {
          color: var(--text-secondary);
        }
        .project-desc {
          color: var(--text-secondary);
          flex-grow: 1;
        }
        .project-footer {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: var(--space-sm);
        }
        .project-tags {
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
        }
      `}</style>
        </article>
    );
}
