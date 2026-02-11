import { Composition } from "remotion";
import { HeroLoop } from "./compositions/HeroLoop";
import { SiteWalkthrough } from "./compositions/SiteWalkthrough";
import { TacticalMicro } from "./compositions/TacticalMicro";
import { DecisionMicro } from "./compositions/DecisionMicro";
import { ScoutMicro } from "./compositions/ScoutMicro";
import "../app/globals.css";

export const RemotionRoot: React.FC = () => {
    return (
        <>
            <Composition
                id="HeroLoop"
                component={HeroLoop}
                durationInFrames={240} // 8s * 30fps
                fps={30}
                width={1920}
                height={1080}
            />
            <Composition
                id="SiteWalkthrough"
                component={SiteWalkthrough}
                durationInFrames={900} // 30s * 30fps
                fps={30}
                width={1920}
                height={1080}
            />
            <Composition
                id="TacticalMicro"
                component={TacticalMicro}
                durationInFrames={300} // 10s * 30fps
                fps={30}
                width={1920}
                height={1080}
            />
            <Composition
                id="DecisionMicro"
                component={DecisionMicro}
                durationInFrames={300} // 10s * 30fps
                fps={30}
                width={1920}
                height={1080}
            />
            <Composition
                id="ScoutMicro"
                component={ScoutMicro}
                durationInFrames={300} // 10s * 30fps
                fps={30}
                width={1920}
                height={1080}
            />
        </>
    );
};
