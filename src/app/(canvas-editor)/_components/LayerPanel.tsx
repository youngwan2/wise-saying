"use client"

import React, { useState, useEffect } from 'react';
import * as fabric from 'fabric';
import { FaEye, FaEyeSlash, FaTrash, FaArrowUp, FaArrowDown } from 'react-icons/fa';

interface LayerPanelProps {
    canvas: fabric.Canvas | null;
    selectedObject: fabric.Object | null;
}

export default function LayerPanel({ canvas, selectedObject }: LayerPanelProps) {
    const [objects, setObjects] = useState<fabric.Object[]>([]);

    useEffect(() => {
        if (!canvas) return;

        const updateObjects = () => {
            setObjects([...canvas.getObjects()]);
        };

        canvas.on('object:added', updateObjects);
        canvas.on('object:removed', updateObjects);
        canvas.on('object:modified', updateObjects);

        updateObjects();

        return () => {
            canvas.off('object:added', updateObjects);
            canvas.off('object:removed', updateObjects);
            canvas.off('object:modified', updateObjects);
        };
    }, [canvas]);

    const getObjectName = (obj: fabric.Object) => {
        if (obj.type === 'i-text') return '텍스트';
        if (obj.type === 'rect') return '사각형';
        if (obj.type === 'circle') return '원형';
        if (obj.type === 'image') return '이미지';
        return '객체';
    };

    const selectObject = (obj: fabric.Object) => {
        if (!canvas) return;
        canvas.setActiveObject(obj);
        canvas.renderAll();
    };

    const toggleVisibility = (obj: fabric.Object) => {
        if (!canvas) return;
        obj.visible = !obj.visible;
        canvas.renderAll();
        setObjects([...canvas.getObjects()]);
    };

    const deleteObject = (obj: fabric.Object) => {
        if (!canvas) return;
        canvas.remove(obj);
    };


    /** 레이어 이동 */
    const moveLayer = (obj: fabric.Object, direction: 'up' | 'down') => {
        if (!canvas) return;

        console.log(`Moving layer ${getObjectName(obj)} ${direction}`);
        if (direction === 'up') {
            canvas.bringObjectForward(obj);
        } else {
            canvas.sendObjectBackwards(obj);
        }
        canvas.renderAll();
        setObjects([...canvas.getObjects()]);
    };

    return (
        <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700 mb-3">레이어</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
                {objects.map((obj, index) => (
                    <div
                        key={index}
                        className={`p-2 border rounded-lg cursor-pointer transition-colors ${selectedObject === obj
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-300 hover:bg-gray-50'
                            }`}
                        onClick={() => selectObject(obj)}
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-sm truncate flex-1">
                                {getObjectName(obj)}
                            </span>
                            <div className="flex items-center space-x-1">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        moveLayer(obj, 'up');
                                    }}
                                    className="p-1 text-gray-500 hover:text-gray-700"
                                    title="앞으로"
                                >
                                    <FaArrowUp size={10} />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        moveLayer(obj, 'down');
                                    }}
                                    className="p-1 text-gray-500 hover:text-gray-700"
                                    title="뒤로"
                                >
                                    <FaArrowDown size={10} />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleVisibility(obj);
                                    }}
                                    className="p-1 text-gray-500 hover:text-gray-700"
                                    title={obj.visible ? "숨기기" : "보이기"}
                                >
                                    {obj.visible ? <FaEye size={12} /> : <FaEyeSlash size={12} />}
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deleteObject(obj);
                                    }}
                                    className="p-1 text-red-500 hover:text-red-700"
                                    title="삭제"
                                >
                                    <FaTrash size={10} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                {objects.length === 0 && (
                    <div className="text-sm text-gray-500 text-center py-4">
                        레이어가 없습니다
                    </div>
                )}
            </div>
        </div>
    );
}
