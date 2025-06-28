"use client"

import React from 'react';
import * as fabric from 'fabric';

interface BackgroundPanelProps {
    canvas: fabric.Canvas | null;
    backgroundColor: string;
    setBackgroundColor: (color: string) => void;
}

const gradients = [
    { name: '일몰', colors: ['#ff7e5f', '#feb47b'] },
    { name: '바다', colors: ['#667eea', '#764ba2'] },
    { name: '하늘', colors: ['#74b9ff', '#0984e3'] },
    { name: '숲', colors: ['#00b894', '#00cec9'] },
    { name: '라벤더', colors: ['#a29bfe', '#6c5ce7'] },
    { name: '복숭아', colors: ['#fd79a8', '#fdcb6e'] },
];

const patterns = [
    { name: '점들', pattern: 'dots' },
    { name: '격자', pattern: 'grid' },
    { name: '줄무늬', pattern: 'stripes' },
];

export default function BackgroundPanel({ canvas, backgroundColor, setBackgroundColor }: BackgroundPanelProps) {

    const applyGradient = (colors: string[]) => {
        if (!canvas) return;

        const gradient = new fabric.Gradient({
            type: 'linear',
            coords: { x1: 0, y1: 0, x2: canvas.width, y2: canvas.height },
            colorStops: [
                { offset: 0, color: colors[0] },
                { offset: 1, color: colors[1] }
            ]
        });

        canvas.backgroundColor = gradient;
        canvas.renderAll();
    };

    const createPattern = (patternType: string) => {
        if (!canvas) return;

        const patternCanvas = document.createElement('canvas');
        const patternCtx = patternCanvas.getContext('2d');
        if (!patternCtx) return;

        patternCanvas.width = 20;
        patternCanvas.height = 20;

        patternCtx.fillStyle = backgroundColor;
        patternCtx.fillRect(0, 0, 20, 20);

        switch (patternType) {
            case 'dots':
                patternCtx.fillStyle = '#ffffff40';
                patternCtx.beginPath();
                patternCtx.arc(10, 10, 2, 0, Math.PI * 2);
                patternCtx.fill();
                break;
            case 'grid':
                patternCtx.strokeStyle = '#ffffff40';
                patternCtx.lineWidth = 1;
                patternCtx.beginPath();
                patternCtx.moveTo(0, 0);
                patternCtx.lineTo(20, 0);
                patternCtx.moveTo(0, 0);
                patternCtx.lineTo(0, 20);
                patternCtx.stroke();
                break;
            case 'stripes':
                patternCtx.fillStyle = '#ffffff20';
                patternCtx.fillRect(0, 0, 10, 20);
                break;
        }

        const pattern = new fabric.Pattern({
            source: patternCanvas,
            repeat: 'repeat'
        });

        canvas.backgroundColor = pattern;
        canvas.renderAll();
    };

    const resetBackground = () => {
        if (!canvas) return;
        canvas.backgroundColor = backgroundColor;
        canvas.renderAll();
    };

    return (
        <div className="space-y-4">
            <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">단색 배경</h3>
                <input
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => {
                        setBackgroundColor(e.target.value);
                        if (canvas) {
                            canvas.backgroundColor = e.target.value;
                            canvas.renderAll();
                        }
                    }}
                    className="w-full h-10 rounded border border-gray-300"
                />
            </div>

            <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">그라디언트</h3>
                <div className="grid grid-cols-2 gap-2">
                    {gradients.map((gradient, index) => (
                        <button
                            key={index}
                            onClick={() => applyGradient(gradient.colors)}
                            className="h-12 rounded border border-gray-300 hover:border-gray-400 text-xs text-white font-medium"
                            style={{
                                background: `linear-gradient(45deg, ${gradient.colors[0]}, ${gradient.colors[1]})`
                            }}
                        >
                            {gradient.name}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">패턴</h3>
                <div className="space-y-2">
                    {patterns.map((pattern, index) => (
                        <button
                            key={index}
                            onClick={() => createPattern(pattern.pattern)}
                            className="w-full p-3 text-left border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
                        >
                            {pattern.name}
                        </button>
                    ))}
                </div>
            </div>

            <button
                onClick={resetBackground}
                className="w-full p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 text-sm"
            >
                배경 초기화
            </button>
        </div>
    );
}
