"use client"

import React from 'react';
import { HiArchiveBoxXMark } from "react-icons/hi2";
import { FaDownload } from "react-icons/fa";

interface ToolbarActionsProps {
    deleteObject: () => void;
    clearCanvas: () => void;
    exportCanvas: () => void;
    isMobile: boolean;
}

export default function ToolbarActions({
    deleteObject,
    clearCanvas,
    exportCanvas,
    isMobile
}: ToolbarActionsProps) {
    if (isMobile) {
        return (
            <div className="mt-4 pt-4 border-t border-gray-200">
                <button
                    onClick={clearCanvas}
                    className="w-full p-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                    전체 삭제
                </button>
            </div>
        );
    }

    return (
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
                className="w-full p-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 flex gap-2 items-center justify-center"
            >
                <HiArchiveBoxXMark size={16} />
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
    );
}
