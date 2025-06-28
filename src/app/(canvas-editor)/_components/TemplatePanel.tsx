"use client"

import React from 'react';
import * as fabric from 'fabric';

interface TemplatePanelProps {
    canvas: fabric.Canvas | null;
}

const templates = [
    {
        name: '클래식',
        background: '#f8f9fa',
        textStyle: {
            fontSize: 28,
            fontFamily: 'Georgia',
            fill: '#2c3e50',
            textAlign: 'center'
        }
    },
    {
        name: '모던',
        background: '#1a1a1a',
        textStyle: {
            fontSize: 32,
            fontFamily: 'Helvetica',
            fill: '#ffffff',
            textAlign: 'center'
        }
    },
    {
        name: '따뜻한',
        background: '#fff5e6',
        textStyle: {
            fontSize: 26,
            fontFamily: 'NanumMyeongjo',
            fill: '#d35400',
            textAlign: 'center'
        }
    },
    {
        name: '차분한',
        background: '#e8f5e8',
        textStyle: {
            fontSize: 24,
            fontFamily: 'NanumGothic',
            fill: '#27ae60',
            textAlign: 'center'
        }
    }
];

export default function TemplatePanel({ canvas }: TemplatePanelProps) {
    const applyTemplate = (template: typeof templates[0]) => {
        if (!canvas) return;

        // 배경색 변경
        canvas.backgroundColor = template.background;

        // 기존 텍스트가 있다면 스타일 적용
        const objects = canvas.getObjects();
        objects.forEach(obj => {
            if (obj.type === 'i-text') {
                obj.set({
                    fontSize: template.textStyle.fontSize,
                    fontFamily: template.textStyle.fontFamily,
                    fill: template.textStyle.fill,
                    textAlign: template.textStyle.textAlign
                });
            }
        });

        canvas.renderAll();
    };

    return (
        <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700 mb-3">템플릿</h3>
            <div className="grid grid-cols-2 gap-2">
                {templates.map((template, index) => (
                    <button
                        key={index}
                        onClick={() => applyTemplate(template)}
                        className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-xs"
                        style={{ backgroundColor: template.background }}
                    >
                        <div
                            className="text-xs font-medium"
                            style={{ color: template.textStyle.fill }}
                        >
                            {template.name}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
