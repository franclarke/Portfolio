"use client";

import TraceRibbon from "@/components/trace/TraceRibbon";
import SectionBlock from "@/components/layout/SectionBlock";
import ProjectShowcase from "@/components/ui/ProjectShowcase";
import MetricCounter from "@/components/ui/MetricCounter";
import TacticalVision from "@/components/pitch/TacticalVision";
import VoronoiPass from "@/components/pitch/VoronoiPass";
import ScoutReport from "@/components/pitch/ScoutReport";

export default function HomePage() {
  return (
    <>
      <TraceRibbon />
      <main id="main-content">
        {/* ═══════════════ HERO ═══════════════ */}
        <SectionBlock id="hero">
          <div className="hero">
            <p className="hero-eyebrow text-caption">AI/ML Engineer</p>
            <h1 className="text-display">
              Follow the
              <br />
              <span className="hero-accent">gradient.</span>
            </h1>
            <p className="hero-sub text-body">
              I build computer vision and ML systems for football analytics —
              from player detection to tactical intelligence. Every model
              starts noisy. The craft is in the convergence.
            </p>
            <div className="hero-cta">
              <a href="#projects" className="btn-primary">
                View projects
              </a>
              <a href="#contact" className="btn-ghost">
                Get in touch
              </a>
            </div>
          </div>
        </SectionBlock>

        {/* ═══════════════ PROJECTS ═══════════════ */}
        <SectionBlock id="projects" fullHeight={false}>
          <div className="projects-section">
            <div className="section-header">
              <span className="text-caption">Checkpoints</span>
              <h2 className="text-heading">Projects</h2>
              <p className="text-body" style={{ color: "var(--text-secondary)" }}>
                Three football analytics systems — each a different challenge
                in the ML pipeline.
              </p>
            </div>

            <ProjectShowcase slug="tactical-vision" index={0}>
              <TacticalVision />
            </ProjectShowcase>

            <ProjectShowcase slug="decision-intelligence" index={1}>
              <VoronoiPass />
            </ProjectShowcase>

            <ProjectShowcase slug="scouting-engine" index={2}>
              <ScoutReport />
            </ProjectShowcase>
          </div>
        </SectionBlock>

        {/* ═══════════════ CAPABILITIES ═══════════════ */}
        <SectionBlock id="capabilities">
          <div className="capabilities-section">
            <div className="section-header">
              <span className="text-caption">Stack</span>
              <h2 className="text-heading">Capabilities</h2>
            </div>
            <div className="cap-grid">
              <div className="cap-group">
                <h3 className="cap-title text-subhead">Computer Vision</h3>
                <ul className="cap-list">
                  <li>YOLOv10 / Ultralytics</li>
                  <li>ByteTrack / DeepSORT</li>
                  <li>Homography estimation</li>
                  <li>CUDA optimization</li>
                </ul>
              </div>
              <div className="cap-group">
                <h3 className="cap-title text-subhead">ML / Data</h3>
                <ul className="cap-list">
                  <li>XGBoost / LightGBM</li>
                  <li>Feature engineering</li>
                  <li>Scikit-learn pipelines</li>
                  <li>PostgreSQL / ETL</li>
                </ul>
              </div>
              <div className="cap-group">
                <h3 className="cap-title text-subhead">Engineering</h3>
                <ul className="cap-list">
                  <li>Python (primary)</li>
                  <li>Docker / Containers</li>
                  <li>Selenium / Playwright</li>
                  <li>Git / CI pipelines</li>
                </ul>
              </div>
              <div className="cap-group">
                <h3 className="cap-title text-subhead">Web</h3>
                <ul className="cap-list">
                  <li>Next.js / TypeScript</li>
                  <li>Node.js</li>
                  <li>Tailwind CSS</li>
                  <li>REST APIs</li>
                </ul>
              </div>
            </div>
            <div className="cap-metrics">
              <MetricCounter value={3} suffix="+" label="ML Projects" />
              <MetricCounter value={28} suffix="ms" label="Inference time (GTX 1650)" />
              <MetricCounter value={0.89} decimals={2} label="Best mAP@0.5" />
            </div>
          </div>
        </SectionBlock>

        {/* ═══════════════ ABOUT ═══════════════ */}
        <SectionBlock id="about">
          <div className="about-section">
            <div className="section-header">
              <span className="text-caption">About</span>
              <h2 className="text-heading">Fran Clarke</h2>
            </div>
            <div className="about-content">
              <div className="about-text">
                <p className="text-body">
                  I&apos;m an AI/ML engineer based in Buenos Aires, Argentina. I
                  build computer vision and ML systems — primarily for
                  football analytics — because I believe decisions on the
                  pitch deserve the same rigor as decisions in production.
                </p>
                <p className="text-body">
                  My stack spans detection and tracking pipelines (YOLOv10,
                  ByteTrack), tabular ML (XGBoost/LightGBM), data
                  engineering (PostgreSQL, Docker), and the web stack to make
                  it all accessible (Next.js, TypeScript).
                </p>
                <p className="text-body">
                  The goal: work in the data/ML team of a major football
                  club. Not to &quot;disrupt&quot; — to add signal where there&apos;s noise.
                </p>
                <p className="text-body about-sign-off">
                  I optimize for consumer GPUs because not everyone has an
                  A100. I write case studies with failure modes because
                  honesty builds trust. I ship.
                </p>
              </div>
            </div>
          </div>
        </SectionBlock>

        {/* ═══════════════ CONTACT ═══════════════ */}
        <SectionBlock id="contact" fullHeight={false}>
          <div className="contact-section">
            <div className="section-header">
              <span className="text-caption">Deploy</span>
              <h2 className="text-heading">Let&apos;s connect</h2>
              <p className="text-body" style={{ color: "var(--text-secondary)" }}>
                Looking for an AI/ML engineer who builds with intent?
              </p>
            </div>
            <div className="contact-links">
              <a
                href="mailto:placeholder@email.com"
                className="contact-link"
              >
                <span className="contact-link-label text-caption">Email</span>
                <span className="contact-link-value">placeholder@email.com</span>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <span className="contact-link-label text-caption">GitHub</span>
                <span className="contact-link-value">github.com/franclarke</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <span className="contact-link-label text-caption">LinkedIn</span>
                <span className="contact-link-value">linkedin.com/in/franclarke</span>
              </a>
            </div>
          </div>
        </SectionBlock>
      </main>


      {/* Page-level styles */}
      <style jsx>{`
          /* ── Hero ── */
          .hero {
            display: flex;
            flex-direction: column;
            gap: var(--space-lg);
            max-width: 720px;
            padding-left: 60px;
          }
          .hero-eyebrow {
            color: var(--accent);
          }
          .hero-accent {
            color: var(--accent);
          }
          .hero-sub {
            color: var(--text-secondary);
            max-width: 540px;
          }
          .hero-cta {
            display: flex;
            gap: var(--space-md);
            padding-top: var(--space-sm);
          }

          /* ── Buttons ── */
          .btn-primary {
            display: inline-flex;
            align-items: center;
            padding: var(--space-sm) var(--space-xl);
            background: var(--accent);
            color: var(--bg-primary);
            font-weight: 600;
            font-size: 0.875rem;
            border-radius: 6px;
            text-decoration: none;
            transition: opacity var(--duration-fast) var(--ease-out-quint);
          }
          .btn-primary:hover {
            opacity: 0.9;
          }
          .btn-ghost {
            display: inline-flex;
            align-items: center;
            padding: var(--space-sm) var(--space-xl);
            background: transparent;
            color: var(--text-primary);
            font-weight: 500;
            font-size: 0.875rem;
            border: 1px solid var(--border);
            border-radius: 6px;
            text-decoration: none;
            transition: border-color var(--duration-fast) var(--ease-out-quint);
          }
          .btn-ghost:hover {
            border-color: var(--text-secondary);
          }

          /* ── Section headers ── */
          .section-header {
            display: flex;
            flex-direction: column;
            gap: var(--space-xs);
            margin-bottom: var(--space-2xl);
          }

          /* ── Projects ── */
          .projects-section {
            padding-left: 60px;
          }

          /* ── Capabilities ── */
          .capabilities-section {
            padding-left: 60px;
          }
          .cap-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: var(--space-xl);
            margin-bottom: var(--space-3xl);
          }
          .cap-group {
            display: flex;
            flex-direction: column;
            gap: var(--space-sm);
          }
          .cap-title {
            color: var(--text-primary);
            padding-bottom: var(--space-xs);
            border-bottom: 1px solid var(--border);
          }
          .cap-list {
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: var(--space-2xs);
          }
          .cap-list li {
            font-size: 0.875rem;
            color: var(--text-secondary);
            padding-left: var(--space-sm);
            position: relative;
          }
          .cap-list li::before {
            content: "›";
            position: absolute;
            left: 0;
            color: var(--accent);
          }
          .cap-metrics {
            display: flex;
            gap: var(--space-3xl);
            flex-wrap: wrap;
          }

          /* ── About ── */
          .about-section {
            padding-left: 60px;
          }
          .about-content {
            max-width: 640px;
          }
          .about-text {
            display: flex;
            flex-direction: column;
            gap: var(--space-md);
          }
          .about-text p {
            color: var(--text-secondary);
          }
          .about-sign-off {
            padding-top: var(--space-sm);
            border-top: 1px solid var(--border);
            color: var(--text-primary) !important;
            font-style: italic;
          }

          /* ── Contact ── */
          .contact-section {
            padding-left: 60px;
            padding-bottom: calc(var(--console-height) + var(--space-3xl));
          }
          .contact-links {
            display: flex;
            flex-direction: column;
            gap: var(--space-md);
          }
          .contact-link {
            display: flex;
            flex-direction: column;
            gap: 2px;
            text-decoration: none;
            padding: var(--space-md);
            border: 1px solid var(--border);
            border-radius: 8px;
            transition: border-color var(--duration-fast) var(--ease-out-quint);
            max-width: 400px;
          }
          .contact-link:hover {
            border-color: var(--accent);
          }
          .contact-link-label {
            color: var(--text-muted);
          }
          .contact-link-value {
            color: var(--text-primary);
            font-size: 0.9375rem;
          }

          /* ── Responsive (remove trace padding) ── */
          @media (max-width: 1024px) {
            .hero,
            .projects-section,
            .capabilities-section,
            .about-section,
            .contact-section {
              padding-left: 0;
            }
          }
        `}</style>
    </>
  );
}
