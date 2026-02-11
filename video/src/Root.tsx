import React from 'react';
import { Composition } from 'remotion';
import { HeroLoop } from './compositions/HeroLoop';
import { TacticalVision } from './compositions/TacticalVision';
import { DecisionIntelligence } from './compositions/DecisionIntelligence';
import { ScoutingEngine } from './compositions/ScoutingEngine';

export const RemotionRoot: React.FC = () => {
    return (
        <>
            <Composition
                id="HeroLoop"
                component={HeroLoop}
                durationInFrames={300} // 10 seconds at 30fps
                fps={30}
                width={1920}
                height={1080}
            />
            <Composition
                id="TacticalVision"
                component={TacticalVision}
                durationInFrames={360} // 12 seconds
                fps={30}
                width={1280}
                height={720}
            />
            <Composition
                id="DecisionIntelligence"
                component={DecisionIntelligence}
                durationInFrames={360}
                fps={30}
                width={1280}
                height={720}
            />
            <Composition
                id="ScoutingEngine"
                component={ScoutingEngine}
                durationInFrames={360}
                fps={30}
                width={1280}
                height={720}
            />
        </>
    );
};
