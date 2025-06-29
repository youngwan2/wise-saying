"use client"

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import EditorCanvas from '../_components/EditorCanvas';

function ExitButton({ handleExit }: { handleExit: () => void }) {
    return (
        <button
            onClick={handleExit}
            className="bg-red-500 text-white px-4 py-2 rounded absolute top-4 right-4 z-50"
        >
            나가기
        </button>
    );
}

export default function Page() {
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);

    const handleExit = () => {
        router.back();
    };

    useEffect(() => {
        setIsMounted(true);
        window.document.body.style.overflow = 'hidden';
        return () => {
            window.document.body.style.overflow = 'auto';
        };
    }, []);

    if (!isMounted) return null;

    return createPortal(
        <div className="fixed inset-0 bg-white z-[999999] overflow-auto">
            <ExitButton handleExit={handleExit} />
            <EditorCanvas />
        </div>,
        document.body
    );
}


