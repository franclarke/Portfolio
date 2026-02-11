import React from "react";
import { AbsoluteFill } from "remotion";
import VoronoiPass from "../../components/pitch/VoronoiPass";
import { MotionTierProvider } from "../../lib/motion";

export const DecisionMicro: React.FC = () => {
    return (
        <AbsoluteFill className="bg-primary flex items-center justify-center">
            <MotionTierProvider>
                <div className="scale-150">
                    <VoronoiPass />
                </div>
            </MotionTierProvider>
        </AbsoluteFill>
    );
};
