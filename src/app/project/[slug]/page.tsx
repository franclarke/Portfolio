import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/content/data/projects";
import type { Metadata } from "next";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.title} - Francisco Clarke`,
    description: project.description.explain,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  const { caseStudy, modelCard } = project;

  return (
    <main id="main-content">
      <article className="case-study">
        <header className="cs-hero">
          <Link href="/#projects" className="cs-back text-caption">
            {"<- Back to projects"}
          </Link>
          <div className="cs-hero-meta">
            <span className="cs-status text-caption">{project.status}</span>
            <div className="cs-tags">
              {project.tags.map((tag) => (
                <span key={tag} className="cs-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <h1 className="text-display">{project.title}</h1>
          <p className="cs-tagline text-subhead">{project.tagline}</p>
        </header>

        <section className="cs-section">
          <div className="cs-section-label text-caption">
            <span>01</span>
            <span>Problem</span>
          </div>
          <div className="cs-section-content">
            <p className="text-body">{caseStudy.problem}</p>
          </div>
        </section>

        <section className="cs-section">
          <div className="cs-section-label text-caption">
            <span>02</span>
            <span>Approach</span>
          </div>
          <div className="cs-section-content">
            <p className="text-body">{caseStudy.approach}</p>
          </div>
        </section>

        <section className="cs-section">
          <div className="cs-section-label text-caption">
            <span>03</span>
            <span>Architecture</span>
          </div>
          <div className="cs-section-content cs-pipeline">
            {caseStudy.architecture.map((step, index) => (
              <div key={step.step} className="cs-pipeline-step">
                <div className="cs-step-head">
                  <span className="cs-step-num">{String(index + 1).padStart(2, "0")}</span>
                  <h4 className="cs-step-name text-subhead">{step.step}</h4>
                </div>
                <p className="cs-step-detail text-body">{step.detail}</p>
                {index < caseStudy.architecture.length - 1 && <span className="cs-step-connector" />}
              </div>
            ))}
          </div>
        </section>

        <section className="cs-section">
          <div className="cs-section-label text-caption">
            <span>04</span>
            <span>Results</span>
          </div>
          <div className="cs-section-content cs-results">
            {caseStudy.results.map((result) => (
              <article className="cs-result" key={result.label}>
                <span className="cs-result-value">{result.value}</span>
                <span className="cs-result-label text-caption">{result.label}</span>
                {result.note && <p className="cs-result-note">{result.note}</p>}
              </article>
            ))}
          </div>
        </section>

        <section className="cs-section">
          <div className="cs-section-label text-caption">
            <span>05</span>
            <span>Model Card</span>
          </div>
          <div className="cs-section-content cs-model-card">
            <div className="cs-mc-row">
              <span className="cs-mc-key text-caption">Task</span>
              <span className="cs-mc-val">{modelCard.task}</span>
            </div>
            <div className="cs-mc-row">
              <span className="cs-mc-key text-caption">Data</span>
              <span className="cs-mc-val">{modelCard.data}</span>
            </div>
            <div className="cs-mc-row">
              <span className="cs-mc-key text-caption">Model</span>
              <span className="cs-mc-val">{modelCard.model}</span>
            </div>
            <div className="cs-mc-row">
              <span className="cs-mc-key text-caption">Key metric</span>
              <span className="cs-mc-val">{modelCard.keyMetric}</span>
            </div>
            <div className="cs-mc-row">
              <span className="cs-mc-key text-caption">Latency</span>
              <span className="cs-mc-val">{modelCard.latency}</span>
            </div>
            <div className="cs-mc-row cs-mc-row--failures">
              <span className="cs-mc-key text-caption">Failure modes</span>
              <ul className="cs-mc-failures">
                {modelCard.failureModes.map((mode) => (
                  <li key={mode}>{mode}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="cs-section">
          <div className="cs-section-label text-caption">
            <span>06</span>
            <span>Lessons</span>
          </div>
          <div className="cs-section-content cs-lessons">
            {caseStudy.lessons.map((lesson, index) => (
              <article className="cs-lesson" key={lesson}>
                <span className="cs-lesson-num text-caption">{String(index + 1).padStart(2, "0")}</span>
                <p className="text-body">{lesson}</p>
              </article>
            ))}
          </div>
        </section>

        <footer className="cs-footer">
          <Link href="/#projects" className="cs-footer-back">
            {"<- All projects"}
          </Link>
        </footer>
      </article>
    </main>
  );
}
