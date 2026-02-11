"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

export type MotionTier = "full" | "reduced" | "minimal";

interface MotionTierContextValue {
    tier: MotionTier;
}

const MotionTierContext = createContext<MotionTierContextValue>({ tier: "full" });

function detectMotionTier(): MotionTier {
    if (typeof window === "undefined") return "minimal";

    // Respect user preference first
    const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return "minimal";

    // Device capability detection
    const cores = navigator.hardwareConcurrency ?? 4;
    const memory = (navigator as { deviceMemory?: number }).deviceMemory ?? 8;
    const connection = (
        navigator as { connection?: { effectiveType?: string } }
    ).connection;
    const slowConnection =
        connection?.effectiveType === "2g" ||
        connection?.effectiveType === "slow-2g";

    if (cores < 4 || memory < 4 || slowConnection) return "reduced";

    return "full";
}

export function MotionTierProvider({ children }: { children: ReactNode }) {
    const [tier, setTier] = useState<MotionTier>("full");

    useEffect(() => {
        const detected = detectMotionTier();
        setTier(detected);

        // Listen for changes to prefers-reduced-motion
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        const handler = (e: MediaQueryListEvent) => {
            setTier(e.matches ? "minimal" : detectMotionTier());
        };
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    return (
        <MotionTierContext.Provider value={{ tier }}>
            {children}
        </MotionTierContext.Provider>
    );
}

export function useMotionTier() {
    return useContext(MotionTierContext).tier;
}
