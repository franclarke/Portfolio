import React from "react";
import { AbsoluteFill } from "remotion";
import TacticalVision from "../../components/pitch/TacticalVision";
import { MotionTierProvider } from "../../lib/motion";

export const TacticalMicro: React.FC = () => {
    return (
        <AbsoluteFill className="bg-primary flex items-center justify-center">
            <MotionTierProvider>
                <div className="scale-150">
                    <TacticalVision />
                </div>
            </MotionTierProvider>
        </AbsoluteFill>
    );
};
