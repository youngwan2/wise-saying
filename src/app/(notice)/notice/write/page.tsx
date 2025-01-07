"use client"
import dynamic from 'next/dynamic'

const NoticeEditor = dynamic(() => import("../../_components/NoticeEditor"), { ssr: false })

export default function NoticeWritePage() {
    return <NoticeEditor/>
}