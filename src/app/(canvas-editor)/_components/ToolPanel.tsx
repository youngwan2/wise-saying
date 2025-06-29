"use client"

import React, { useState } from 'react';
import { FaQuoteLeft, FaExpandArrowsAlt, FaFont, FaShapes, FaPaintBrush, FaImage, FaLayerGroup, FaThLarge } from 'react-icons/fa';
import QuotePanel from './QuotePanel';
import SizeSelector from './SizeSelector';
import TextToolsPanel from './TextToolsPanel';
import ShapeToolsPanel from './ShapeToolsPanel';
import StylePanel from './StylePanel';
import BackgroundPanel from './BackgroundPanel';
import TemplatePanel from './TemplatePanel';
import LayerPanel from './LayerPanel';
import ToolbarActions from './ToolbarActions';



interface ToolPanelProps {
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
    isMobile: boolean;
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

export default function ToolPanel({
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
    isMobile,
    handleSizeChange,
    addText,
    addShape,
    addImage,
    updateSelectedObject,
    changeFontFamily,
    deleteObject,
    clearCanvas,
    exportCanvas
}: ToolPanelProps) {
    const [activeTab, setActiveTab] = useState('quotes');

    return (
        <div className={`${isMobile ? 'flex-none' : 'flex'}`}>
            {/* 탭 메뉴 */}
            <div className={`${isMobile ? 'grid grid-cols-2 gap-2' : 'flex flex-col mt-0 '} mb-4 bg-gray-100 rounded-lg p-1 min-w-20  m-3`}>
                <button
                    onClick={() => setActiveTab('quotes')}
                    className={`${!isMobile ? 'py-3 px-1 flex-col' : 'py-3 px-1'} rounded-md text-sm flex items-center gap-2 ${activeTab === 'quotes' ? 'bg-white shadow' : ''}`}
                >
                    <FaQuoteLeft />
                    명언
                </button>
                <button
                    onClick={() => setActiveTab('size')}
                    className={`${!isMobile ? 'py-3 px-1 flex-col' : 'py-3 px-1'} rounded-md text-sm flex items-center gap-2 ${activeTab === 'size' ? 'bg-white shadow' : ''}`}
                >
                    <FaExpandArrowsAlt />
                    사이즈
                </button>
                <button
                    onClick={() => setActiveTab('text')}
                    className={`${!isMobile ? 'py-3 px-1 flex-col' : 'py-3 px-1'} rounded-md text-sm flex items-center gap-2 ${activeTab === 'text' ? 'bg-white shadow' : ''}`}
                >
                    <FaFont />
                    텍스트
                </button>
                <button
                    onClick={() => setActiveTab('shape')}
                    className={`${!isMobile ? 'py-3 px-1 flex-col' : 'py-3 px-1'} rounded-md text-sm flex items-center gap-2 ${activeTab === 'shape' ? 'bg-white shadow' : ''}`}
                >
                    <FaShapes />
                    도형
                </button>
                <button
                    onClick={() => setActiveTab('style')}
                    className={`${!isMobile ? 'py-3 px-1 flex-col' : 'py-3 px-1'} rounded-md text-sm flex items-center gap-2 ${activeTab === 'style' ? 'bg-white shadow' : ''}`}
                >
                    <FaPaintBrush />
                    스타일
                </button>
                <button
                    onClick={() => setActiveTab('background')}
                    className={`${!isMobile ? 'py-3 px-1 flex-col' : 'py-3 px-1'} rounded-md text-sm flex items-center gap-2 ${activeTab === 'background' ? 'bg-white shadow' : ''}`}
                >
                    <FaImage />
                    배경
                </button>
                <button
                    onClick={() => setActiveTab('template')}
                    className={`${!isMobile ? 'py-3 px-1 flex-col' : 'py-3 px-1'} rounded-md text-sm flex items-center gap-2 ${activeTab === 'template' ? 'bg-white shadow' : ''}`}
                >
                    <FaThLarge />
                    템플릿
                </button>
                <button
                    onClick={() => setActiveTab('layers')}
                    className={`${!isMobile ? 'py-3 px-1 flex-col' : 'py-3 px-1'} rounded-md text-sm flex items-center gap-2 ${activeTab === 'layers' ? 'bg-white shadow' : ''}`}
                >
                    <FaLayerGroup />
                    레이어
                </button>
            </div>


            {/* 탭 내용 */}
            <div className='w-full'>


                {/* 명언 */}
                {activeTab === 'quotes' && (
                    <>
                        <h2 className="text-lg font-bold mb-2">명언</h2>
                        <QuotePanel canvas={canvas} />
                    </>
                )}

                {/* 캔버스 크기 */}
                {activeTab === 'size' && (
                    <>
                        <h2 className="text-lg font-bold mb-2">사이즈</h2>
                        <SizeSelector handleSizeChange={handleSizeChange} />
                    </>
                )}

                {/* 텍스트 */}
                {activeTab === 'text' && (
                    <>
                        <h2 className="text-lg font-bold mb-2">텍스트</h2>
                        <TextToolsPanel
                            selectedObject={selectedObject}
                            fontSize={fontSize}
                            setFontSize={setFontSize}
                            fonts={fonts}
                            addText={addText}
                            updateSelectedObject={updateSelectedObject}
                            changeFontFamily={changeFontFamily}
                        />
                    </>
                )}

                {/* 도형 */}
                {activeTab === 'shape' && (
                    <>
                        <h2 className="text-lg font-bold mb-2">도형</h2>
                        <ShapeToolsPanel
                            addShape={addShape}
                            addImage={addImage}
                        />
                    </>
                )}

                {/* 도형/텍스트 스타일 */}
                {activeTab === 'style' && (
                    <>
                        <h2 className="text-lg font-bold mb-2">스타일</h2>
                        <StylePanel
                            colorPalette={colorPalette}
                            textColor={textColor}
                            setTextColor={setTextColor}
                            selectedObject={selectedObject}
                            updateSelectedObject={updateSelectedObject}
                        />
                    </>
                )}

                {/* 캔버스 배경 */}
                {activeTab === 'background' && (
                    <>
                        <h2 className="text-lg font-bold mb-2">배경</h2>
                        <BackgroundPanel
                            canvas={canvas}
                            backgroundColor={backgroundColor}
                            setBackgroundColor={setBackgroundColor}
                        />
                    </>
                )}

                {/* 템플릿 */}
                {activeTab === 'template' && (
                    <>
                        <h2 className="text-lg font-bold mb-2">템플릿</h2>
                        <TemplatePanel canvas={canvas} />
                    </>
                )}

                {/* 레이어 */}
                {activeTab === 'layers' && (
                    <>
                        <h2 className="text-lg font-bold mb-2">레이어</h2>
                        <LayerPanel canvas={canvas} selectedObject={selectedObject} />
                    </>
                )}

                <ToolbarActions
                    deleteObject={deleteObject}
                    clearCanvas={clearCanvas}
                    exportCanvas={exportCanvas}
                    isMobile={isMobile}
                />
            </div>
        </div>
    );
}
