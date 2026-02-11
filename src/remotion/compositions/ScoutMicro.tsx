import React from "react";
import { AbsoluteFill } from "remotion";
import ScoutReport from "../../components/pitch/ScoutReport";
import { MotionTierProvider } from "../../lib/motion";

export const ScoutMicro: React.FC = () => {
    return (
        <AbsoluteFill className="bg-primary flex items-center justify-center">
            <MotionTierProvider>
                <div className="scale-125">
                    <ScoutReport />
                </div>
            </MotionTierProvider>
        </AbsoluteFill>
    );
};
