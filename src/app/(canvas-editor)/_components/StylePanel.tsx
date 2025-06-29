"use client"

import React from 'react';

interface StylePanelProps {
    colorPalette: string[];
    textColor: string;
    setTextColor: (color: string) => void;
    selectedObject: any;
    updateSelectedObject: (property: string, value: any) => void;
}

export default function StylePanel({
    colorPalette,
    textColor,
    setTextColor,
    selectedObject,
    updateSelectedObject
}: StylePanelProps) {
    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    색상
                </label>
                <div className="grid grid-cols-5 gap-2 mb-3">
                    {colorPalette.map(color => (
                        <button
                            key={color}
                            onClick={() => {
                                setTextColor(color);
                                if (selectedObject) {
                                    updateSelectedObject('fill', color);
                                }
                            }}
                            className="w-8 h-8 rounded border-2 border-gray-300 hover:border-gray-400"
                            style={{ backgroundColor: color }}
                        />
                    ))}
                </div>
                <input
                    type="color"
                    value={textColor}
                    onChange={(e) => {
                        setTextColor(e.target.value);
                        if (selectedObject) {
                            updateSelectedObject('fill', e.target.value);
                        }
                    }}
                    className="w-full h-10 rounded border border-gray-300"
                />
            </div>
        </div>
    );
}
