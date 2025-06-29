"use client"

import React from 'react';
import { HiArchiveBoxXMark } from "react-icons/hi2";
import { FaDownload, FaPalette } from "react-icons/fa";

interface MobileFloatingButtonsProps {
    exportCanvas: () => void;
    deleteObject: () => void;
    setIsToolPanelOpen: (open: boolean) => void;
}

export default function MobileFloatingButtons({
    exportCanvas,
    deleteObject,
    setIsToolPanelOpen
}: MobileFloatingButtonsProps) {
    return (
        <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3 z-[100000000000000000]">
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
        </div>
    );
}
