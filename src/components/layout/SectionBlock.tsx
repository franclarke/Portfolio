"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useMotionTier } from "@/lib/motion";

interface SectionBlockProps {
    id: string;
    children: ReactNode;
    className?: string;
    fullHeight?: boolean;
}

export default function SectionBlock({
    id,
    children,
    className = "",
    fullHeight = true,
}: SectionBlockProps) {
    const tier = useMotionTier();
    const ref = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (tier === "minimal") {
            setIsVisible(true);
            return;
        }

        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(el);
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [tier]);

    return (
        <section
            ref={ref}
            id={id}
            data-section={id}
            className={`section-block ${isVisible ? "visible" : ""} ${className}`}
            style={{
                minHeight: fullHeight ? "100vh" : "auto",
            }}
        >
            <div className="section-block-inner">{children}</div>

            <style jsx>{`
        .section-block {
          position: relative;
          display: flex;
          align-items: center;
          padding: var(--space-4xl) var(--space-lg);
          opacity: 0;
          transform: translateY(40px);
          transition:
            opacity var(--duration-slow) var(--ease-out-quint),
            transform var(--duration-slow) var(--ease-out-quint);
        }
        .section-block.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .section-block-inner {
          width: 100%;
          max-width: var(--max-width);
          margin: 0 auto;
        }
        @media (prefers-reduced-motion: reduce) {
          .section-block {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
      `}</style>
        </section>
    );
}
