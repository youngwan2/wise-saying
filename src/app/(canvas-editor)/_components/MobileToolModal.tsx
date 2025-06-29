"use client"

import React from 'react';
import ToolPanel from './ToolPanel';

interface MobileToolModalProps {
    isToolPanelOpen: boolean;
    setIsToolPanelOpen: (open: boolean) => void;
    canvas: any;
    selectedObject: any;
    fontSize: number;
    setFontSize: (size: number) => void;
    textColor: string;
    setTextColor: (color: string) => void;
    backgroundColor: string;
    setBackgroundColor: (color: string) => void;
    fonts: string[];
    colorPalette: string[];
    handleSizeChange: (platform: string) => void;
    addText: () => void;
    addShape: (type: 'rectangle' | 'circle' | 'star' | 'heart') => void;
    addImage: () => void;
    updateSelectedObject: (property: string, value: any) => void;
    changeFontFamily: (fontFamily: string) => void;
    deleteObject: () => void;
    clearCanvas: () => void;
    exportCanvas: () => void;
}

export default function MobileToolModal({
    isToolPanelOpen,
    setIsToolPanelOpen,
    canvas,
    selectedObject,
    fontSize,
    setFontSize,
    textColor,
    setTextColor,
    backgroundColor,
    setBackgroundColor,
    fonts,
    colorPalette,
    handleSizeChange,
    addText,
    addShape,
    addImage,
    updateSelectedObject,
    changeFontFamily,
    deleteObject,
    clearCanvas,
    exportCanvas
}: MobileToolModalProps) {
    if (!isToolPanelOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end">
            {/* 배경 오버레이 */}
            <div
                className="absolute inset-0 bg-black bg-opacity-50"
                onClick={() => setIsToolPanelOpen(false)}
            />

            {/* 모달 컨텐츠 */}
            <div className="relative w-full bg-white rounded-t-xl max-h-[80vh] overflow-hidden animate-slide-up">
                {/* 모달 헤더 */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
                    <h2 className="text-lg font-semibold text-gray-900">편집 도구</h2>
                    <button
                        onClick={() => setIsToolPanelOpen(false)}
                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 text-2xl bg-gray-100 rounded-full"
                    >
                        ×
                    </button>
                </div>

                {/* 모달 바디 */}
                <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(80vh - 80px)' }}>
                    <ToolPanel
                        canvas={canvas}
                        selectedObject={selectedObject}
                        fontSize={fontSize}
                        setFontSize={setFontSize}
                        textColor={textColor}
                        setTextColor={setTextColor}
                        backgroundColor={backgroundColor}
                        setBackgroundColor={setBackgroundColor}
                        fonts={fonts}
                        colorPalette={colorPalette}
                        isMobile={true}
                        handleSizeChange={handleSizeChange}
                        addText={addText}
                        addShape={addShape}
                        addImage={addImage}
                        updateSelectedObject={updateSelectedObject}
                        changeFontFamily={changeFontFamily}
                        deleteObject={deleteObject}
                        clearCanvas={clearCanvas}
                        exportCanvas={exportCanvas}
                    />
                </div>
            </div>
        </div>
    );
}
