"use client";

import { useMemo, useState } from "react";
import TraceRibbon from "@/components/trace/TraceRibbon";
import SectionBlock from "@/components/layout/SectionBlock";
import ModelAtlasHero from "@/components/hero/ModelAtlasHero";
import ParetoArena from "@/components/ui/ParetoArena";
import ProjectShowcase from "@/components/ui/ProjectShowcase";
import ProjectFilterBar, { type ProjectFilter } from "@/components/ui/ProjectFilterBar";
import ProjectArtifactPanel from "@/components/ui/ProjectArtifactPanel";
import ReliabilityVault from "@/components/ui/ReliabilityVault";
import CareerBuildLog from "@/components/ui/CareerBuildLog";
import { projects, type ProjectTrack } from "@/content/data/projects";
import { profile } from "@/content/data/profile";

function filterToTrack(filter: ProjectFilter): ProjectTrack | null {
  if (filter === "all") return null;
  return filter;
}

export default function HomePage() {
  const [projectFilter, setProjectFilter] = useState<ProjectFilter>("all");

  const projectCounts = useMemo(
    () => ({
      all: projects.length,
      "applied-ai": projects.filter((project) => project.track === "applied-ai").length,
      "football-lab": projects.filter((project) => project.track === "football-lab").length,
    }),
    []
  );

  const filteredProjects = useMemo(() => {
    const track = filterToTrack(projectFilter);
    if (!track) return projects;
    return projects.filter((project) => project.track === track);
  }, [projectFilter]);

  const navigateToSection = (
    sectionId: "pareto" | "projects" | "reliability" | "experience" | "contact"
  ) => {
    const section = document.getElementById(sectionId);
    if (!section) return;
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleTrackSelection = (track: ProjectTrack) => {
    setProjectFilter(track);
  };

  return (
    <>
      <TraceRibbon />

      <main id="main-content">
        <SectionBlock id="hero">
          <ModelAtlasHero
            onSelectTrack={handleTrackSelection}
            onNavigate={navigateToSection}
            cvHref={profile.contact.cvHref}
          />
        </SectionBlock>

        <SectionBlock id="pareto">
          <div className="page-section page-section--left">
            <div className="section-header">
              <span className="text-caption">ML Systems</span>
              <h2 className="text-heading">Pareto Arena</h2>
              <p className="text-body section-copy">
                Every production model is a trade-off. This interactive arena shows
                how quantization, LoRA rank, and batch size move quality, latency,
                and memory budgets.
              </p>
            </div>
            <ParetoArena />
          </div>
        </SectionBlock>

        <SectionBlock id="projects" fullHeight={false}>
          <div className="page-section page-section--left">
            <div className="section-header">
              <span className="text-caption">Builds</span>
              <h2 className="text-heading">Projects</h2>
              <p className="text-body section-copy">
                Applied AI systems for real-world constraints. Football Lab is a
                focused vertical inside a broader AI engineering profile.
              </p>
            </div>

            <ProjectFilterBar
              value={projectFilter}
              onChange={setProjectFilter}
              counts={projectCounts}
            />

            {filteredProjects.map((project, index) => (
              <ProjectShowcase
                key={project.slug}
                project={project}
                index={index}
                artifact={<ProjectArtifactPanel slug={project.slug} />}
              />
            ))}
          </div>
        </SectionBlock>

        <SectionBlock id="reliability">
          <div className="page-section page-section--left">
            <div className="section-header">
              <span className="text-caption">Rigor</span>
              <h2 className="text-heading">Reliability Vault</h2>
              <p className="text-body section-copy">
                Snapshot-based QA gating, deterministic traces, and measurable
                latency budgets. The goal is reproducible behavior, not demo-only AI.
              </p>
            </div>

            <ReliabilityVault />
          </div>
        </SectionBlock>

        <SectionBlock id="experience">
          <div className="page-section page-section--left">
            <div className="section-header">
              <span className="text-caption">Career</span>
              <h2 className="text-heading">Experience Build Log</h2>
              <p className="text-body section-copy">
                {profile.identity.name} - {profile.identity.role}. Based in {profile.identity.location}.
              </p>
            </div>

            <CareerBuildLog />
          </div>
        </SectionBlock>

        <SectionBlock id="contact" fullHeight={false}>
          <div className="page-section page-section--left contact-section">
            <div className="section-header">
              <span className="text-caption">Deploy</span>
              <h2 className="text-heading">Let&apos;s connect</h2>
              <p className="text-body section-copy">
                Open to Junior AI Engineer and Applied ML roles focused on
                production-ready generative systems and computer vision.
              </p>
            </div>

            <div className="contact-grid">
              <a href={`mailto:${profile.contact.email}`} className="contact-link">
                <span className="contact-link-label text-caption">Email</span>
                <span className="contact-link-value">{profile.contact.email}</span>
              </a>
              <a
                href={profile.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <span className="contact-link-label text-caption">GitHub</span>
                <span className="contact-link-value">github.com/franclarke</span>
              </a>
              <a
                href={profile.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <span className="contact-link-label text-caption">LinkedIn</span>
                <span className="contact-link-value">linkedin.com/in/franciscoclarke</span>
              </a>
            </div>

            <div className="contact-actions">
              <a
                href={profile.contact.cvHref}
                className="btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download CV
              </a>
            </div>
          </div>
        </SectionBlock>
      </main>

      <style jsx>{`
        .page-section {
          width: 100%;
        }
        .page-section--left {
          padding-left: 54px;
        }
        .section-header {
          display: grid;
          gap: var(--space-xs);
          margin-bottom: var(--space-2xl);
        }
        .section-copy {
          color: var(--text-secondary);
          max-width: 72ch;
        }
        .contact-section {
          padding-bottom: calc(var(--console-height) + var(--space-3xl));
        }
        .contact-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: var(--space-sm);
        }
        .contact-link {
          display: grid;
          gap: 3px;
          text-decoration: none;
          padding: var(--space-md);
          border: 1px solid var(--border);
          border-radius: 10px;
          background: rgba(10, 12, 16, 0.85);
          transition:
            border-color var(--duration-fast) var(--ease-out-quint),
            transform var(--duration-fast) var(--ease-out-quint);
        }
        .contact-link:hover {
          border-color: var(--accent);
          transform: translateY(-1px);
        }
        .contact-link-label {
          color: var(--text-muted);
        }
        .contact-link-value {
          color: var(--text-primary);
          font-size: 0.92rem;
        }
        .contact-actions {
          margin-top: var(--space-md);
        }
        @media (max-width: 1100px) {
          .page-section--left {
            padding-left: 0;
          }
          .contact-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
