"use client";

import {
    createContext,
    useContext,
    useState,
    useCallback,
    type ReactNode,
} from "react";

type ViewMode = "explain" | "builder";

interface ViewModeContextValue {
    mode: ViewMode;
    toggle: () => void;
    isBuilder: boolean;
}

const ViewModeContext = createContext<ViewModeContextValue | null>(null);

export function ViewModeProvider({ children }: { children: ReactNode }) {
    const [mode, setMode] = useState<ViewMode>("explain");

    const toggle = useCallback(() => {
        setMode((prev) => (prev === "explain" ? "builder" : "explain"));
    }, []);

    return (
        <ViewModeContext.Provider value={{ mode, toggle, isBuilder: mode === "builder" }}>
            {children}
        </ViewModeContext.Provider>
    );
}

export function useViewMode() {
    const ctx = useContext(ViewModeContext);
    if (!ctx) throw new Error("useViewMode must be used inside ViewModeProvider");
    return ctx;
}
