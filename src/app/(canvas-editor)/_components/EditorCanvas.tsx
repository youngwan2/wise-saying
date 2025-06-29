"use client"

import React, { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';
import useWindowSize from "@/custom/useWindowSize";
import ToolPanel from './ToolPanel';
import MobileFloatingButtons from './MobileFloatingButtons';
import MobileToolModal from './MobileToolModal';

// 사각형 객체 생성
const deleteIcon =
    "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";


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

export default function EditorCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
    const [canvasWidth] = useState(800);
    const [canvasHeight] = useState(600);
    const [selectedObject, setSelectedObject] = useState<fabric.Object | null>(null);
    const [fontSize, setFontSize] = useState(24);
    const [textColor, setTextColor] = useState('#000000');
    const [backgroundColor, setBackgroundColor] = useState('#f3f3f3');
    const [isToolPanelOpen, setIsToolPanelOpen] = useState(false);

    const { width } = useWindowSize();
    const isMobile = width <= 1200;



    // 캔버스 초기화
    useEffect(() => {
        if (!canvasRef.current) return;

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

        setCanvas(fabricCanvas);
        return () => {
            fabricCanvas.dispose();
        };
    }, [canvasWidth, canvasHeight, backgroundColor]);

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
    const addShape = (type: 'rectangle' | 'circle' | 'star' | 'heart') => {
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
        }

        if (type === 'circle') {
            shape = new fabric.Circle({
                left: canvas.width / 2,
                top: canvas.height / 2,
                radius: 50,
                fill: textColor,
                originX: 'center',
                originY: 'center',
            });
        }

        if (type === 'star') {
            shape = new fabric.Polygon(
                [
                    { x: 349.9, y: 75, },
                    { x: 379, y: 160.9, },
                    { x: 469, y: 160.9, },
                    { x: 397, y: 214.9, },
                    { x: 423, y: 300.9, },
                    { x: 350, y: 249.9, },
                    { x: 276.9, y: 301, },
                    { x: 303, y: 215, },
                    { x: 231, y: 161, },
                    { x: 321, y: 161, },
                ],
                {
                    left: 100,
                    top: 10,
                    fill: textColor,
                    strokeWidth: 1,
                    stroke: textColor,
                    cornerColor: textColor,
                }
            );
        }

        if (type === 'heart') {
            shape = new fabric.Path('M 500 20 C 400 20, 300 120, 500 200 C 700 120, 600 20, 500 20 Z', {
                left: canvas.width / 2,
                top: canvas.height / 2,
                fill: textColor,
                originX: 'center',
                originY: 'center',
            });
        }

        if (!shape) return;


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
    };

    // 선택된 객체 삭제
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
    }

    // 캔버스 크기 변경
    const handleSizeChange = (platform: string) => {
        const sizes: Record<string, { width: number; height: number }> = {
            mobile: { width: 350, height: 500 }, // 모바일 디바이스에 최적화된 크기
            tablet: { width: 768, height: 1024 }, // 태블릿 디바이스에 최적화된 크기
            thumbnail: { width: 150, height: 150 }, // 작은 썸네일 이미지
            profile: { width: 300, height: 300 }, // 프로필 사진
            desktop: { width: 1024, height: 768 }, // 데스크톱 화면
            wideScreen: { width: 1920, height: 1080 }, // 와이드 스크린
            cardNews: { width: 1080, height: 1080 }, // 카드 뉴스(정사각형)
            poster: { width: 1280, height: 1920 }, // 포스터(세로형)
            banner: { width: 1920, height: 600 }, // 배너(가로형)
            instagram: { width: 1080, height: 1080 }, // 인스타그램 피드/스토리
            facebook: { width: 1200, height: 630 }, // 페이스북 포스트/커버
            youtube: { width: 1280, height: 720 }, // 유튜브 썸네일/커버
            story: { width: 1080, height: 1920 }, // 스토리(세로형)
            square: { width: 500, height: 500 }, // 정사각형(1:1)
            landscape: { width: 1600, height: 900 }, // 가로형(16:9)
            portrait: { width: 900, height: 1600 }, // 세로형(9:16)
        };


        if (canvas) {
            canvas.setWidth(sizes[platform].width);
            canvas.setHeight(sizes[platform].height);
            canvas.renderAll();
        }
    };

    // 데스크톱 및 모바일 레이아웃
    return (
        <div className="bg-white h-full flex relative">
            {/* 데스크톱: 왼쪽 도구 패널 */}
            {!isMobile && (
                <div className="w-96 bg-gray-50 border-r border-gray-200 p-4 overflow-y-auto">
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
                        isMobile={isMobile}
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
            )}

            {/* 캔버스 영역 */}
            <div className={`flex-1 ${isMobile ? 'p-2' : 'p-6'} bg-gray-100 flex items-center justify-center overflow-auto`}>
                <div className={`bg-white ${isMobile ? 'p-2' : 'p-4'} rounded-lg shadow-lg`}>
                    <canvas
                        className="border border-gray-300 rounded"
                        ref={canvasRef}
                    />
                </div>
            </div>

            {/* 모바일: 하단 도구 버튼 */}
            {isMobile && (
                <>
                    <MobileFloatingButtons
                        exportCanvas={exportCanvas}
                        deleteObject={deleteObject}
                        setIsToolPanelOpen={setIsToolPanelOpen}
                    />

                    <MobileToolModal
                        isToolPanelOpen={isToolPanelOpen}
                        setIsToolPanelOpen={setIsToolPanelOpen}
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
                </>
            )}
        </div>
    );
};
