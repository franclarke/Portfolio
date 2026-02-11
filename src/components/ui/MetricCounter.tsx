"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionTier } from "@/lib/motion";

interface MetricCounterProps {
    value: number;
    prefix?: string;
    suffix?: string;
    decimals?: number;
    label: string;
}

export default function MetricCounter({
    value,
    prefix = "",
    suffix = "",
    decimals = 0,
    label,
}: MetricCounterProps) {
    const tier = useMotionTier();
    const [display, setDisplay] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const [triggered, setTriggered] = useState(false);

    useEffect(() => {
        if (tier === "minimal") {
            setDisplay(value);
            return;
        }

        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !triggered) {
                    setTriggered(true);
                    observer.unobserve(el);
                }
            },
            { threshold: 0.5 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [tier, value, triggered]);

    useEffect(() => {
        if (!triggered) return;
        if (tier === "minimal") {
            setDisplay(value);
            return;
        }

        const duration = 800;
        const start = performance.now();
        let raf: number;

        const animate = (now: number) => {
            const elapsed = now - start;
            const t = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setDisplay(eased * value);
            if (t < 1) raf = requestAnimationFrame(animate);
        };

        raf = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(raf);
    }, [triggered, value, tier]);

    return (
        <div className="metric" ref={ref}>
            <span className="metric-value text-heading">
                {prefix}
                {display.toFixed(decimals)}
                {suffix}
            </span>
            <span className="metric-label text-caption">{label}</span>

            <style jsx>{`
        .metric {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .metric-value {
          color: var(--accent);
          font-family: var(--font-jetbrains-mono), monospace;
          font-weight: 700;
        }
        .metric-label {
          color: var(--text-secondary);
        }
      `}</style>
        </div>
    );
}
