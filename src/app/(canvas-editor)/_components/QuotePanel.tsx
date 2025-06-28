"use client"

import React, { useState } from 'react';
import * as fabric from 'fabric';

interface QuotePanelProps {
    canvas: fabric.Canvas | null;
}

const sampleQuotes = [
    "행복은 습관이다. 그것을 몸에 지니라. - 허버드",
    "시간은 우리가 가진 가장 소중한 것이다. - 디오게네스",
    "꿈을 지워버리는 것은 절망이고, 꿈을 품는 것은 희망이다. - 괴테",
    "인생은 가까이서 보면 비극이지만, 멀리서 보면 희극이다. - 찰리 채플린",
    "성공은 준비된 자에게 기회가 주어질 때 만들어진다. - 센카",
    "진정한 실패는 시도하지 않는 것이다. - 조지 클루니",
    "어제는 역사, 내일은 미스터리, 오늘은 선물이다. - 빌 키언",
    "변화를 원한다면 당신 자신이 그 변화가 되어라. - 간디",
];

export default function QuotePanel({ canvas }: QuotePanelProps) {
    const [selectedQuote, setSelectedQuote] = useState('');

    const addQuoteToCanvas = (quote: string) => {
        if (!canvas) return;

        const text = new fabric.IText(quote, {
            left: canvas.width / 2,
            top: canvas.height / 2,
            fontSize: 24,
            fill: '#333333',
            fontFamily: 'NanumMyeongjo',
            originX: 'center',
            originY: 'center',
            textAlign: 'center',
            lineHeight: 1.4,
        });

        // 삭제 컨트롤 추가
        const deleteIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

        text.controls.deleteControl = new fabric.Control({
            x: 0.5,
            y: -0.5,
            offsetY: 16,
            cursorStyle: 'pointer',
            mouseUpHandler: () => {
                canvas.remove(text);
                return true;
            },
            render: (ctx: CanvasRenderingContext2D, left: number, top: number, _styleOverride: any, fabricObject: any) => {
                const deleteImg = document.createElement('img');
                deleteImg.src = deleteIcon;
                const size = 24;
                ctx.save();
                ctx.translate(left, top);
                ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
                ctx.drawImage(deleteImg, -size / 2, -size / 2, size, size);
                ctx.restore();
            },
        });

        canvas.add(text);
        canvas.setActiveObject(text);
        canvas.renderAll();
    };

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    추천 명언
                </label>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                    {sampleQuotes.map((quote, index) => (
                        <button
                            key={index}
                            onClick={() => addQuoteToCanvas(quote)}
                            className="w-full p-3 text-left text-sm border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors"
                        >
                            <div className="line-clamp-2">
                                {quote}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    직접 입력
                </label>
                <textarea
                    value={selectedQuote}
                    onChange={(e) => setSelectedQuote(e.target.value)}
                    placeholder="명언을 직접 입력하세요..."
                    className="w-full p-3 border border-gray-300 rounded-lg resize-none h-20"
                />
                <button
                    onClick={() => {
                        if (selectedQuote.trim()) {
                            addQuoteToCanvas(selectedQuote);
                            setSelectedQuote('');
                        }
                    }}
                    className="w-full mt-2 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
                    disabled={!selectedQuote.trim()}
                >
                    명언 추가
                </button>
            </div>
        </div>
    );
}
