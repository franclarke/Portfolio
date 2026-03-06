"use client";

import { profile } from "@/content/data/profile";

export default function CareerBuildLog() {
  return (
    <div className="career-shell" data-testid="career-build-log">
      <div className="career-timeline">
        {profile.careerMilestones.map((milestone, index) => (
          <article key={milestone.id} className="milestone-card">
            <div className="milestone-line" aria-hidden="true" />
            <div className="milestone-content">
              <span className="milestone-period text-caption">{milestone.period}</span>
              <h3>{milestone.title}</h3>
              <p>{milestone.description}</p>
              <div className="milestone-tags">
                {milestone.tags.map((tag) => (
                  <span key={`${milestone.id}-${tag}`}>{tag}</span>
                ))}
              </div>
            </div>
            {index < profile.careerMilestones.length - 1 && <div className="milestone-connector" />}
          </article>
        ))}
      </div>

      <div className="career-grid">
        <section className="career-panel">
          <h3 className="text-subhead">Education</h3>
          {profile.education.map((entry) => (
            <article key={entry.degree} className="entry-card">
              <p className="entry-title">{entry.degree}</p>
              <p className="entry-meta">{entry.institution}</p>
              <p className="entry-meta">{entry.period}</p>
              <p className="entry-note">{entry.focus}</p>
            </article>
          ))}
        </section>

        <section className="career-panel">
          <h3 className="text-subhead">Current Role</h3>
          {profile.experience.map((entry) => (
            <article key={entry.company} className="entry-card">
              <p className="entry-title">{entry.role}</p>
              <p className="entry-meta">{entry.company}</p>
              <p className="entry-meta">{entry.period}</p>
              <p className="entry-note">{entry.type}</p>
              <ul className="entry-list">
                {entry.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              <div className="entry-tags">
                {entry.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          ))}
        </section>
      </div>

      <style jsx>{`
        .career-shell {
          display: grid;
          gap: var(--space-xl);
        }
        .career-timeline {
          border: 1px solid var(--border);
          border-radius: 16px;
          background: linear-gradient(
            140deg,
            rgba(89, 184, 255, 0.08),
            rgba(10, 13, 18, 0.95) 35%,
            rgba(232, 255, 89, 0.08)
          );
          padding: var(--space-lg);
          display: grid;
          gap: var(--space-sm);
        }
        .milestone-card {
          position: relative;
          display: grid;
          grid-template-columns: 18px 1fr;
          gap: var(--space-sm);
        }
        .milestone-line {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          margin-top: 7px;
          background: linear-gradient(180deg, #59b8ff, #e8ff59);
          box-shadow: 0 0 0 5px rgba(89, 184, 255, 0.14);
        }
        .milestone-content h3 {
          font-family: var(--font-space-grotesk), system-ui, sans-serif;
          font-size: 1rem;
          font-weight: 600;
          margin: 4px 0;
        }
        .milestone-content p {
          color: var(--text-secondary);
          font-size: 0.86rem;
          line-height: 1.5;
          max-width: 70ch;
        }
        .milestone-tags {
          margin-top: 8px;
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .milestone-tags span {
          border: 1px solid var(--border);
          border-radius: 999px;
          padding: 3px 9px;
          color: var(--text-muted);
          font-size: 0.69rem;
          font-family: var(--font-jetbrains-mono), monospace;
        }
        .milestone-period {
          color: var(--accent);
        }
        .milestone-connector {
          position: absolute;
          left: 4px;
          top: 22px;
          bottom: -12px;
          width: 1px;
          background: rgba(255, 255, 255, 0.15);
        }
        .career-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-md);
        }
        .career-panel {
          border: 1px solid var(--border);
          border-radius: 12px;
          background: rgba(9, 12, 16, 0.86);
          padding: var(--space-md);
          display: grid;
          gap: var(--space-sm);
        }
        .entry-card {
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: var(--space-sm);
          display: grid;
          gap: 6px;
          background: rgba(10, 14, 19, 0.82);
        }
        .entry-title {
          color: var(--text-primary);
          font-family: var(--font-space-grotesk), system-ui, sans-serif;
          font-size: 0.98rem;
          font-weight: 600;
        }
        .entry-meta {
          color: var(--text-secondary);
          font-size: 0.82rem;
        }
        .entry-note {
          color: var(--text-muted);
          font-size: 0.78rem;
          line-height: 1.4;
        }
        .entry-list {
          margin-top: 4px;
          margin-left: 18px;
          display: grid;
          gap: 4px;
        }
        .entry-list li {
          color: var(--text-secondary);
          font-size: 0.78rem;
          line-height: 1.45;
        }
        .entry-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 4px;
        }
        .entry-tags span {
          border: 1px solid var(--border);
          border-radius: 999px;
          padding: 2px 8px;
          color: var(--text-muted);
          font-size: 0.67rem;
          font-family: var(--font-jetbrains-mono), monospace;
        }
        @media (max-width: 960px) {
          .career-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
