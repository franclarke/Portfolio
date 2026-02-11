"use client";

import { useEffect, useState, useRef } from "react";

interface ConsoleEntry {
    label: string;
    value: string;
}

export default function ExperimentConsole() {
    const [scrollPercent, setScrollPercent] = useState(0);
    const [currentSection, setCurrentSection] = useState("hero");
    const rafRef = useRef<number>(0);

    useEffect(() => {
        const handleScroll = () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(() => {
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                const percent = docHeight > 0 ? Math.round((window.scrollY / docHeight) * 100) : 0;
                setScrollPercent(percent);

                // Detect current section
                const sections = document.querySelectorAll("[data-section]");
                let current = "hero";
                sections.forEach((section) => {
                    const rect = section.getBoundingClientRect();
                    if (rect.top < window.innerHeight / 2) {
                        current = section.getAttribute("data-section") || current;
                    }
                });
                setCurrentSection(current);
            });
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    const runId = "0x" + Math.abs(hashCode(currentSection)).toString(16).slice(0, 8);

    const entries: ConsoleEntry[] = [
        { label: "run_id", value: runId },
        { label: "section", value: currentSection },
        { label: "scroll", value: `${scrollPercent}%` },
        { label: "mode", value: "inference" },
    ];

    return (
        <div className="console" role="status" aria-live="polite" aria-label="Experiment console">
            <div className="console-inner">
                {entries.map((entry) => (
                    <span key={entry.label} className="console-entry">
                        <span className="console-label">{entry.label}</span>
                        <span className="console-value">{entry.value}</span>
                    </span>
                ))}
            </div>

            <style jsx>{`
        .console {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 90;
          height: var(--console-height);
          background: rgba(12, 13, 14, 0.9);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border-top: 1px solid var(--border);
          display: flex;
          align-items: center;
        }
        .console-inner {
          max-width: var(--max-width);
          margin: 0 auto;
          width: 100%;
          padding: 0 var(--space-lg);
          display: flex;
          gap: var(--space-xl);
        }
        .console-entry {
          display: flex;
          gap: var(--space-xs);
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 0.75rem;
        }
        .console-label {
          color: var(--text-muted);
        }
        .console-value {
          color: var(--accent);
        }
        @media (max-width: 768px) {
          .console {
            display: none;
          }
        }
      `}</style>
        </div>
    );
}

function hashCode(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0;
    }
    return hash;
}
