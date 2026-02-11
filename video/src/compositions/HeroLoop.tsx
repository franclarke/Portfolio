import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import React from 'react';

const Node: React.FC<{ x: number; y: number; delay: number }> = ({ x, y, delay }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const scale = spring({
        frame: frame - delay,
        fps,
        config: { damping: 200 },
    });

    return (
        <div
            style={{
                position: 'absolute',
                left: `${x}%`,
                top: `${y}%`,
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: '#00D1FF', // Electric Blue
                transform: `scale(${scale})`,
                boxShadow: '0 0 10px #00D1FF',
            }}
        />
    );
};

export const HeroLoop: React.FC = () => {
    const frame = useCurrentFrame();
    const { width, height } = useVideoConfig(); // Using hook to get config

    // Grid background
    const gridOpacity = interpolate(frame, [0, 30], [0, 0.2], {
        extrapolateRight: 'clamp',
    });

    return (
        <AbsoluteFill style={{ backgroundColor: '#050505' }}>
            {/* Grid Background */}
            <AbsoluteFill
                style={{
                    backgroundImage: 'linear-gradient(#1A1A1A 1px, transparent 1px), linear-gradient(90deg, #1A1A1A 1px, transparent 1px)',
                    backgroundSize: '50px 50px',
                    opacity: gridOpacity,
                }}
            />

            {/* Abstract Nodes */}
            <Node x={30} y={40} delay={10} />
            <Node x={70} y={30} delay={20} />
            <Node x={50} y={70} delay={30} />

            {/* Connecting Lines (SVG) */}
            <svg style={{ position: 'absolute', width: '100%', height: '100%' }}>
                <line
                    x1="30%" y1="40%" x2="70%" y2="30%"
                    stroke="#00D1FF"
                    strokeWidth="2"
                    strokeOpacity={0.5}
                />
                <line
                    x1="70%" y1="30%" x2="50%" y2="70%"
                    stroke="#00D1FF"
                    strokeWidth="2"
                    strokeOpacity={0.5}
                />
                <line
                    x1="50%" y1="70%" x2="30%" y2="40%"
                    stroke="#00D1FF"
                    strokeWidth="2"
                    strokeOpacity={0.5}
                />
            </svg>

            {/* Glitch Text Overlay */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: 'white',
                fontFamily: 'monospace',
                fontSize: 60,
                letterSpacing: 10,
                opacity: 0.8,
                mixBlendMode: 'overlay'
            }}>
                NEURAL_MIND
            </div>

        </AbsoluteFill>
    );
};
