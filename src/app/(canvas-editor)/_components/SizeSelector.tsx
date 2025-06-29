"use client"

// SizeSelector 컴포넌트
// ------------------
// 다양한 캔버스 사이즈(디바이스/용도별)를 아이콘+타이틀 형태로 선택할 수 있는 UI 컴포넌트입니다.
// handleSizeChange: (platform: string) => void - 선택 시 호출되는 콜백

import React from 'react';
import { FaMobileAlt, FaTabletAlt, FaImage, FaUserCircle, FaDesktop, FaTv, FaSquare, FaFileAlt, FaRegWindowMaximize, FaInstagram, FaFacebook, FaYoutube, FaBook, FaClone } from 'react-icons/fa';

const sizeOptions = [
    { key: 'mobile', icon: <FaMobileAlt size={24} />, label: '모바일' },
    { key: 'tablet', icon: <FaTabletAlt size={24} />, label: '태블릿' },
    { key: 'desktop', icon: <FaDesktop size={24} />, label: '데스크톱' },
    { key: 'wideScreen', icon: <FaTv size={24} />, label: '와이드' },
    { key: 'thumbnail', icon: <FaImage size={24} />, label: '썸네일' },
    { key: 'profile', icon: <FaUserCircle size={24} />, label: '프로필' },
    { key: 'cardNews', icon: <FaSquare size={24} />, label: '카드뉴스' },
    { key: 'poster', icon: <FaFileAlt size={24} />, label: '포스터' },
    { key: 'banner', icon: <FaRegWindowMaximize size={24} />, label: '배너' },
    { key: 'instagram', icon: <FaInstagram size={24} />, label: '인스타그램' },
    { key: 'facebook', icon: <FaFacebook size={24} />, label: '페이스북' },
    { key: 'youtube', icon: <FaYoutube size={24} />, label: '유튜브' },
    { key: 'story', icon: <FaBook size={24} />, label: '스토리' },
    { key: 'square', icon: <FaSquare size={24} />, label: '정사각형' },
    { key: 'landscape', icon: <FaClone size={24} />, label: '가로형' },
    { key: 'portrait', icon: <FaBook size={24} />, label: '세로형' },
];

const sizeDescriptions: Record<string, string> = {
    mobile: '모바일 디바이스에 최적화된 크기입니다.',
    tablet: '태블릿 디바이스에 최적화된 크기입니다.',
    thumbnail: '작은 썸네일 이미지에 적합한 크기입니다.',
    profile: '프로필 사진에 적합한 크기입니다.',
    desktop: '데스크톱 화면에 최적화된 크기입니다.',
    wideScreen: '와이드 스크린 디스플레이에 적합한 크기입니다.',
    cardNews: '카드 뉴스 형식에 적합한 정사각형 크기입니다.',
    poster: '포스터 디자인에 적합한 크기입니다.',
    banner: '배너 디자인에 적합한 크기입니다.',
    instagram: '인스타그램 피드/스토리용 이미지',
    facebook: '페이스북 포스트/커버용 이미지',
    youtube: '유튜브 썸네일/커버용 이미지',
    story: '스토리(세로형) 콘텐츠',
    square: '정사각형(1:1) 콘텐츠',
    landscape: '가로형(16:9 등) 콘텐츠',
    portrait: '세로형(9:16 등) 콘텐츠',
};

interface SizeSelectorProps {
    handleSizeChange: (platform: string) => void;
}

export default function SizeSelector({ handleSizeChange }: SizeSelectorProps) {
    return (
        <div className="w-full grid grid-cols-4 gap-4">

            {sizeOptions.map(({ key, icon, label }) => (
                <button
                    key={key}
                    onClick={() => handleSizeChange(key)}
                    className="flex flex-col items-center justify-center bg-gray-100 hover:bg-blue-100 rounded-lg p-2 transition-colors border border-gray-200"
                    title={sizeDescriptions[key]}
                >
                    {icon}
                    <span className="mt-1 text-xs text-gray-700 font-medium whitespace-nowrap">{label}</span>
                </button>
            ))}
        </div>
    );
}
