// ShapeToolsPanel 컴포넌트
// ----------------------
// 다양한 도형(사각형, 원형, 이미지, 별, 하트 등)을 추가할 수 있는 도구 패널입니다.
// addShape: (type: 'rectangle' | 'circle') => void - 도형 추가 콜백
// addImage: () => void - 이미지 추가 콜백
//
// 주의: fabric.js에서 기본 지원하는 사각형/원형만 실제 추가, 별/하트 등은 UI만 제공(비활성화)

import React from 'react';
import { FaSquare, FaCircle, FaImage, FaStar, FaHeart } from "react-icons/fa";

interface ShapeToolsPanelProps {
    addShape: (type: 'rectangle' | 'circle' | 'star' | 'heart') => void;
    addImage: () => void;
}

export default function ShapeToolsPanel({ addShape, addImage }: ShapeToolsPanelProps) {
    return (
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
                onClick={() => addShape('star')}
                className="w-full flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
                <FaStar size={16} />
                별
            </button>
            <button
                onClick={() => addShape('heart')}
                className="w-full flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
                <FaHeart size={16} />
                하트
            </button>
            <button
                onClick={addImage}
                className="w-full flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
                <FaImage size={16} />
                이미지 추가
            </button>
        </div>
    );
}
