"use client"

import React from 'react';
import { PiTextTBold } from "react-icons/pi";

interface TextToolsPanelProps {
    selectedObject: any;
    fontSize: number;
    setFontSize: (size: number) => void;
    fonts: string[];
    addText: () => void;
    updateSelectedObject: (property: string, value: any) => void;
    changeFontFamily: (fontFamily: string) => void;
}

export default function TextToolsPanel({
    selectedObject,
    fontSize,
    setFontSize,
    fonts,
    addText,
    updateSelectedObject,
    changeFontFamily
}: TextToolsPanelProps) {
    return (
        <div className="space-y-4">
            <button
                onClick={addText}
                className="w-full flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
                <PiTextTBold size={20} />
                텍스트 추가
            </button>

            {selectedObject && selectedObject.type === 'i-text' && (
                <>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            폰트 크기
                        </label>
                        <input
                            type="range"
                            min="12"
                            max="100"
                            value={selectedObject.fontSize || fontSize}
                            onChange={(e) => {
                                const size = parseInt(e.target.value);
                                setFontSize(size);
                                updateSelectedObject('fontSize', size);
                            }}
                            className="w-full"
                        />
                        <span className="text-sm text-gray-500">
                            {selectedObject.fontSize || fontSize}px
                        </span>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            폰트
                        </label>
                        <select
                            onChange={(e) => changeFontFamily(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            value={selectedObject.fontFamily || 'Arial'}
                        >
                            {fonts.map(font => (
                                <option key={font} value={font}>{font}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => updateSelectedObject('fontWeight',
                                selectedObject.fontWeight === 'bold' ? 'normal' : 'bold')}
                            className={`px-3 py-1 text-sm border rounded ${selectedObject.fontWeight === 'bold'
                                ? 'bg-blue-500 text-white'
                                : 'bg-white text-gray-700'
                                }`}
                        >
                            Bold
                        </button>
                        <button
                            onClick={() => updateSelectedObject('fontStyle',
                                selectedObject.fontStyle === 'italic' ? 'normal' : 'italic')}
                            className={`px-3 py-1 text-sm border rounded ${selectedObject.fontStyle === 'italic'
                                ? 'bg-blue-500 text-white'
                                : 'bg-white text-gray-700'
                                }`}
                        >
                            Italic
                        </button>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            텍스트 정렬
                        </label>
                        <div className="flex gap-1">
                            {['left', 'center', 'right'].map(align => (
                                <button
                                    key={align}
                                    onClick={() => updateSelectedObject('textAlign', align)}
                                    className={`flex-1 py-2 text-xs border rounded ${selectedObject.textAlign === align
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-white text-gray-700'
                                        }`}
                                >
                                    {align === 'left' ? '좌' : align === 'center' ? '중' : '우'}
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
