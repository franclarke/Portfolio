import { notFound } from "next/navigation";
import { projects } from "@/content/data/projects";
import type { Metadata } from "next";

// Static generation for all project slugs
export function generateStaticParams() {
    return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    return params.then(({ slug }) => {
        const project = projects.find((p) => p.slug === slug);
        if (!project) return { title: "Project Not Found" };

        return {
            title: `${project.title} — Fran Clarke`,
            description: project.description.explain,
        };
    });
}

export default async function ProjectPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);
    if (!project) notFound();

    const { caseStudy, modelCard } = project;

    return (
        <main id="main-content">
            <article className="case-study">
                {/* Hero */}
                <header className="cs-hero">
                    <a href="/#projects" className="cs-back text-caption">
                        ← Back to projects
                    </a>
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

                {/* ... existing content ... */}

                {/* Nav */}
                <footer className="cs-footer">
                    <a href="/#projects" className="cs-footer-back">
                        ← All projects
                    </a>
                </footer>
            </article>
        </main>
    );
}
