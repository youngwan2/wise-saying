"use client"

import React, { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';
import useWindowSize from "@/custom/useWindowSize";
import { PiTextTBold } from "react-icons/pi";
import { HiArchiveBoxXMark } from "react-icons/hi2";
import { FaSquare, FaCircle, FaImage, FaDownload, FaPalette } from "react-icons/fa";
import TemplatePanel from './TemplatePanel';
import LayerPanel from './LayerPanel';
import QuotePanel from './QuotePanel';
import BackgroundPanel from './BackgroundPanel';

// 사각형 객체 생성
const deleteIcon =
    "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

export default function EditorCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
    const [selectedObject, setSelectedObject] = useState<fabric.Object | null>(null);
    const [fontSize, setFontSize] = useState(24);
    const [textColor, setTextColor] = useState('#000000');
    const [backgroundColor, setBackgroundColor] = useState('#f3f3f3');
    const [activeTab, setActiveTab] = useState('quotes');
    const [isToolPanelOpen, setIsToolPanelOpen] = useState(false);

    const { width, height } = useWindowSize();
    const isMobile = width <= 1024;

    // 색상 팔레트
    const colorPalette = [
        '#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff',
        '#ffff00', '#ff00ff', '#00ffff', '#ffa500', '#800080',
        '#ffc0cb', '#a52a2a', '#808080', '#000080', '#008080'
    ];

    // 폰트 목록
    const fonts = [
        'Arial', 'Times New Roman', 'Helvetica', 'Georgia', 'Verdana',
        'NanumGothic', 'NanumMyeongjo', 'NanumSquareNeo'
    ];

    // 캔버스 초기화
    useEffect(() => {
        if (!canvasRef.current) return;
        // 반응형 캔버스 크기 계산
        const canvasWidth = isMobile ? Math.min(width - 40, 350) : Math.min(1200, width - 280);
        const canvasHeight = isMobile ? Math.min(height - 160, 500) : Math.min(768, height - 100);

        const fabricCanvas = new fabric.Canvas(canvasRef.current, {
            width: canvasWidth,
            height: canvasHeight,
            backgroundColor: backgroundColor,
        });

        // 객체 선택 이벤트
        fabricCanvas.on('selection:created', (e) => {
            setSelectedObject(e.selected?.[0] || null);
        });

        fabricCanvas.on('selection:updated', (e) => {
            setSelectedObject(e.selected?.[0] || null);
        });

        fabricCanvas.on('selection:cleared', () => {
            setSelectedObject(null);
        });

        setCanvas(fabricCanvas); return () => {
            fabricCanvas.dispose();
        };
    }, [width, height, backgroundColor, isMobile]);
    // 텍스트 추가
    const addText = () => {
        if (!canvas) return;
        const text = new fabric.IText('여기에 명언을 입력하세요', {
            left: canvas.width / 2,
            top: canvas.height / 2,
            fontSize: fontSize,
            fill: textColor,
            fontFamily: 'Arial',
            originX: 'center',
            originY: 'center',
        });

        text.controls.deleteControl = new fabric.Control({
            x: 0.5,
            y: -0.5,
            offsetY: 16,
            cursorStyle: 'pointer',
            mouseUpHandler: deleteObject,
            render: renderIcon,
        });
        canvas.add(text);
        canvas.setActiveObject(text);
    };

    // 도형 추가
    const addShape = (type: 'rectangle' | 'circle') => {
        if (!canvas) return;
        let shape;

        if (type === 'rectangle') {
            shape = new fabric.Rect({
                left: canvas.width / 2,
                top: canvas.height / 2,
                width: 100,
                height: 60,
                fill: textColor,
                originX: 'center',
                originY: 'center',
            });
        } else {
            shape = new fabric.Circle({
                left: canvas.width / 2,
                top: canvas.height / 2,
                radius: 50,
                fill: textColor,
                originX: 'center',
                originY: 'center',
            });
        }

        shape.controls.deleteControl = new fabric.Control({
            x: 0.5,
            y: -0.5,
            offsetY: 16,
            cursorStyle: 'pointer',
            mouseUpHandler: deleteObject,
            render: renderIcon,
        });

        canvas.add(shape);
        canvas.setActiveObject(shape);
    };

    // 이미지 추가
    const addImage = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file && canvas) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const imgUrl = e.target?.result as string;
                    fabric.FabricImage.fromURL(imgUrl).then((img) => {
                        img.scaleToWidth(200);
                        img.set({
                            left: canvas.width / 2,
                            top: canvas.height / 2,
                            originX: 'center',
                            originY: 'center',
                        });

                        img.controls.deleteControl = new fabric.Control({
                            x: 0.5,
                            y: -0.5,
                            offsetY: 16,
                            cursorStyle: 'pointer',
                            mouseUpHandler: deleteObject,
                            render: renderIcon,
                        });

                        canvas.add(img);
                        canvas.setActiveObject(img);
                    });
                };
                reader.readAsDataURL(file);
            }
        };
        input.click();
    };    // 선택된 객체 삭제
    const deleteObject = () => {
        if (!canvas) return;
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
            canvas.remove(activeObject);
        }
    };

    // 선택된 객체의 속성 변경
    const updateSelectedObject = (property: string, value: any) => {
        if (!canvas || !selectedObject) return;

        selectedObject.set(property, value);
        canvas.renderAll();
    };

    // 폰트 변경
    const changeFontFamily = (fontFamily: string) => {
        if (selectedObject && selectedObject.type === 'i-text') {
            updateSelectedObject('fontFamily', fontFamily);
        }
    };

    // 저장/내보내기
    const exportCanvas = () => {
        if (!canvas) return;
        const dataURL = canvas.toDataURL({
            format: 'png',
            quality: 1,
            multiplier: 2
        });

        const link = document.createElement('a');
        link.download = '명언카드.png';
        link.href = dataURL;
        link.click();
    };

    // 캔버스 초기화
    const clearCanvas = () => {
        if (!canvas) return;
        canvas.clear();
        canvas.backgroundColor = backgroundColor;
        canvas.renderAll();
    };

    function renderIcon(ctx: CanvasRenderingContext2D, left: number, top: number, _styleOverride: any, fabricObject: any) {

        let deleteImg = document.createElement('img');
        deleteImg.src = deleteIcon;
        const size = 24
        ctx.save();
        ctx.translate(left, top);
        ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
        ctx.drawImage(deleteImg, -size / 2, -size / 2, size, size);
        ctx.restore();
    } function ToolPanel() {
        return (
            <>
                {/* 탭 메뉴 */}
                <div className={`${isMobile ? 'grid grid-cols-2 gap-2' : 'flex'} mb-4 bg-gray-100 rounded-lg p-1`}>
                    <button
                        onClick={() => setActiveTab('quotes')}
                        className={`py-2 px-2 rounded-md text-xs ${activeTab === 'quotes' ? 'bg-white shadow' : ''
                            }`}
                    >
                        명언
                    </button>
                    <button
                        onClick={() => setActiveTab('text')}
                        className={`py-2 px-2 rounded-md text-xs ${activeTab === 'text' ? 'bg-white shadow' : ''
                            }`}
                    >
                        텍스트
                    </button>
                    <button
                        onClick={() => setActiveTab('shape')}
                        className={`py-2 px-2 rounded-md text-xs ${activeTab === 'shape' ? 'bg-white shadow' : ''
                            }`}
                    >
                        도형
                    </button>
                    <button
                        onClick={() => setActiveTab('style')}
                        className={`py-2 px-2 rounded-md text-xs ${activeTab === 'style' ? 'bg-white shadow' : ''
                            }`}
                    >
                        스타일
                    </button>
                    <button
                        onClick={() => setActiveTab('background')}
                        className={`py-2 px-2 rounded-md text-xs ${activeTab === 'background' ? 'bg-white shadow' : ''
                            }`}
                    >
                        배경
                    </button>
                    <button
                        onClick={() => setActiveTab('template')}
                        className={`py-2 px-2 rounded-md text-xs ${activeTab === 'template' ? 'bg-white shadow' : ''
                            }`}
                    >
                        템플릿
                    </button>
                    <button
                        onClick={() => setActiveTab('layers')}
                        className={`py-2 px-2 rounded-md text-xs ${activeTab === 'layers' ? 'bg-white shadow' : ''
                            }`}
                    >
                        레이어
                    </button>
                </div>

                {/* 명언 탭 */}
                {activeTab === 'quotes' && (
                    <QuotePanel canvas={canvas} />
                )}

                {/* 텍스트 탭 */}
                {activeTab === 'text' && (
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
                                        value={(selectedObject as any).fontSize || fontSize}
                                        onChange={(e) => {
                                            const size = parseInt(e.target.value);
                                            setFontSize(size);
                                            updateSelectedObject('fontSize', size);
                                        }}
                                        className="w-full"
                                    />
                                    <span className="text-sm text-gray-500">
                                        {(selectedObject as any).fontSize || fontSize}px
                                    </span>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        폰트
                                    </label>
                                    <select
                                        onChange={(e) => changeFontFamily(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        value={(selectedObject as any).fontFamily || 'Arial'}
                                    >
                                        {fonts.map(font => (
                                            <option key={font} value={font}>{font}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => updateSelectedObject('fontWeight',
                                            (selectedObject as any).fontWeight === 'bold' ? 'normal' : 'bold')}
                                        className={`px-3 py-1 text-sm border rounded ${(selectedObject as any).fontWeight === 'bold'
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-white text-gray-700'
                                            }`}
                                    >
                                        Bold
                                    </button>
                                    <button
                                        onClick={() => updateSelectedObject('fontStyle',
                                            (selectedObject as any).fontStyle === 'italic' ? 'normal' : 'italic')}
                                        className={`px-3 py-1 text-sm border rounded ${(selectedObject as any).fontStyle === 'italic'
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
                                                className={`flex-1 py-2 text-xs border rounded ${(selectedObject as any).textAlign === align
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
                )}

                {/* 도형 탭 */}
                {activeTab === 'shape' && (
                    <div className="space-y-4">
                        <button
                            onClick={() => addShape('rectangle')}
                            className="w-full flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            <FaSquare size={16} />
                            사각형
                        </button>

                        <button
                            onClick={() => addShape('circle')}
                            className="w-full flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            <FaCircle size={16} />
                            원형
                        </button>

                        <button
                            onClick={addImage}
                            className="w-full flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            <FaImage size={16} />
                            이미지 추가
                        </button>
                    </div>
                )}

                {/* 스타일 탭 */}
                {activeTab === 'style' && (
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
                )}

                {/* 배경 탭 */}
                {activeTab === 'background' && (
                    <BackgroundPanel
                        canvas={canvas}
                        backgroundColor={backgroundColor}
                        setBackgroundColor={setBackgroundColor}
                    />
                )}

                {/* 템플릿 탭 */}
                {activeTab === 'template' && (
                    <TemplatePanel canvas={canvas} />
                )}

                {/* 레이어 탭 */}
                {activeTab === 'layers' && (
                    <LayerPanel canvas={canvas} selectedObject={selectedObject} />
                )}                {/* 하단 버튼들 - 모바일에서는 간소화 */}
                {!isMobile && (
                    <div className="mt-6 space-y-2">
                        <button
                            onClick={deleteObject}
                            className="w-full flex items-center justify-center gap-2 p-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                            <HiArchiveBoxXMark size={16} />
                            선택 삭제
                        </button>

                        <button
                            onClick={clearCanvas}
                            className="w-full p-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                        >
                            전체 삭제
                        </button>

                        <button
                            onClick={exportCanvas}
                            className="w-full flex items-center justify-center gap-2 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                            <FaDownload size={16} />
                            다운로드
                        </button>
                    </div>
                )}

                {/* 모바일 전용 하단 버튼들 */}
                {isMobile && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <button
                            onClick={clearCanvas}
                            className="w-full p-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                        >
                            전체 삭제
                        </button>
                    </div>
                )}
            </>
        );
    }

    return (
        <div className="bg-white h-full flex relative">
            {/* 데스크톱: 왼쪽 도구 패널 */}
            {!isMobile && (
                <div className="w-64 bg-gray-50 border-r border-gray-200 p-4 overflow-y-auto">
                    <ToolPanel />
                </div>
            )}            {/* 캔버스 영역 */}
            <div className={`flex-1 ${isMobile ? 'p-2' : 'p-6'} bg-gray-100 flex items-center justify-center`}>
                <div className={`bg-white ${isMobile ? 'p-2' : 'p-4'} rounded-lg shadow-lg`}>
                    <canvas
                        className="border border-gray-300 rounded"
                        ref={canvasRef}
                    />
                </div>
            </div>{/* 모바일: 하단 도구 버튼 */}
            {isMobile && (
                <>
                    {/* 플로팅 액션 버튼들 */}
                    <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3 z-40">
                        {/* 빠른 액션 버튼들 */}
                        <div className="flex flex-col gap-2">
                            <button
                                onClick={exportCanvas}
                                className="w-12 h-12 bg-green-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-green-600 transition-colors"
                                title="다운로드"
                            >
                                <FaDownload size={16} />
                            </button>
                            <button
                                onClick={deleteObject}
                                className="w-12 h-12 bg-red-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-red-600 transition-colors"
                                title="선택 삭제"
                            >
                                <HiArchiveBoxXMark size={16} />
                            </button>
                        </div>

                        {/* 메인 도구 버튼 */}
                        <button
                            onClick={() => setIsToolPanelOpen(true)}
                            className="w-14 h-14 bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                        >
                            <FaPalette size={20} />
                        </button>
                    </div>{/* 모바일: 하단 모달 패널 */}
                    {isToolPanelOpen && (
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
                                    <ToolPanel />
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};
