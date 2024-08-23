"use client"
import { useRouter } from 'next/navigation';
import React from 'react';

interface PropsType {
    title?: string
    message?: string

}
export default function ErrorMessage({ title='네트워크 문제', message='현재 네트워크 불안정으로 데이터에 실패하였습니다. 나중에 다시시도 해주세요.' }: PropsType) {
    const { back, refresh } = useRouter()

    return (
        <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg fixed top-[25%] left-[50%] translate-x-[-50%] w-full max-w-[612px] min-w-[250px]">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <svg className="w-6 h-6 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-xl font-bold">{title}</h3>
                </div>

            </div>
            <p className="text-gray-300 mt-4">{message}</p>
            <div className="flex space-x-3 mt-2">
                <button className="text-gray-400 hover:text-white p-1" onClick={refresh}>
                    새로고침
                </button>
                <button className="text-gray-400 hover:text-white p-1" onClick={back}>
                    뒤로가기
                </button>
            </div>
        </div>
    );
};
