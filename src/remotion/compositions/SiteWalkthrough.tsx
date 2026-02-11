import React from "react";
import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import TacticalVision from "../../components/pitch/TacticalVision";
import VoronoiPass from "../../components/pitch/VoronoiPass";
import ScoutReport from "../../components/pitch/ScoutReport";
import { MotionTierProvider } from "../../lib/motion";

export const SiteWalkthrough: React.FC = () => {
    return (
        <AbsoluteFill className="bg-primary text-text-primary font-sans">
            <MotionTierProvider>

                {/* Scene 1: Hero (0-5s) */}
                <Sequence from={0} durationInFrames={150}>
                    <AbsoluteFill className="flex flex-col items-center justify-center bg-black">
                        <h1 className="text-display text-6xl text-center mb-4">FRAN CLARKE</h1>
                        <p className="text-xl text-zinc-500 font-mono">AI/ML PORTFOLIO WALKTHROUGH</p>
                    </AbsoluteFill>
                </Sequence>

                {/* Scene 2: Tactical Vision (5-10s) */}
                <Sequence from={150} durationInFrames={250}>
                    <AbsoluteFill className="flex items-center justify-center bg-zinc-900">
                        <div className="scale-150">
                            <TacticalVision />
                        </div>
                        <div className="absolute bottom-10 font-mono text-accent">Feature: Tactical Vision</div>
                    </AbsoluteFill>
                </Sequence>

                {/* Scene 3: Voronoi Pass (10-15s) */}
                <Sequence from={400} durationInFrames={250}>
                    <AbsoluteFill className="flex items-center justify-center bg-black">
                        <div className="scale-150">
                            <VoronoiPass />
                        </div>
                        <div className="absolute bottom-10 font-mono text-accent-alt">Feature: Decision Intelligence</div>
                    </AbsoluteFill>
                </Sequence>

                {/* Scene 4: Scout Report (15-20s) */}
                <Sequence from={650} durationInFrames={250}>
                    <AbsoluteFill className="flex items-center justify-center bg-zinc-900">
                        <div className="scale-125">
                            <ScoutReport />
                        </div>
                        <div className="absolute bottom-10 font-mono text-white">Feature: Scouting Engine</div>
                    </AbsoluteFill>
                </Sequence>

            </MotionTierProvider>
        </AbsoluteFill>
    );
};
