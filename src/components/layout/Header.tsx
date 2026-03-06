"use client";

import Link from "next/link";
import { useViewMode } from "@/lib/viewMode";

export default function Header() {
  const { mode, toggle } = useViewMode();

  return (
    <header className="header">
      <div className="header-inner">
        <a href="#main-content" className="header-logo text-subhead">
          fran<span className="header-logo-accent">.clarke</span>
        </a>

        <nav className="header-nav" aria-label="Main navigation">
          <ul className="header-nav-list">
            <li>
              <Link href="/#pareto" className="header-link">
                Pareto
              </Link>
            </li>
            <li>
              <Link href="/#projects" className="header-link">
                Projects
              </Link>
            </li>
            <li>
              <Link href="/#reliability" className="header-link">
                Reliability
              </Link>
            </li>
            <li>
              <Link href="/#experience" className="header-link">
                Experience
              </Link>
            </li>
            <li>
              <Link href="/#contact" className="header-link">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <button
          className="toggle-btn"
          onClick={toggle}
          aria-label={`Switch to ${mode === "explain" ? "Builder" : "Explain"} mode`}
        >
          <span className={`toggle-label ${mode === "explain" ? "active" : ""}`}>
            Explain
          </span>
          <span className="toggle-divider">/</span>
          <span className={`toggle-label ${mode === "builder" ? "active" : ""}`}>
            Builder
          </span>
        </button>
      </div>

      <style jsx>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          height: var(--header-height);
          background: rgba(8, 10, 14, 0.82);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
        }
        .header-inner {
          max-width: var(--max-width);
          margin: 0 auto;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 var(--space-lg);
        }
        .header-logo {
          text-decoration: none;
          color: var(--text-primary);
          font-weight: 500;
          font-size: 1.125rem;
        }
        .header-logo-accent {
          color: var(--accent);
        }
        .header-nav-list {
          display: flex;
          gap: var(--space-lg);
          list-style: none;
        }
        .header-link {
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          transition: color var(--duration-fast) var(--ease-out-quint);
        }
        .header-link:hover {
          color: var(--text-primary);
        }
        .toggle-btn {
          display: flex;
          align-items: center;
          gap: var(--space-xs);
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: 6px;
          padding: var(--space-2xs) var(--space-sm);
          cursor: pointer;
          transition: border-color var(--duration-fast) var(--ease-out-quint);
        }
        .toggle-btn:hover {
          border-color: var(--border-hover);
        }
        .toggle-label {
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 0.75rem;
          color: var(--text-muted);
          transition: color var(--duration-fast) var(--ease-out-quint);
        }
        .toggle-label.active {
          color: var(--accent);
        }
        .toggle-divider {
          color: var(--text-muted);
          font-size: 0.75rem;
        }
        @media (max-width: 960px) {
          .header-nav {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
