"use client"

import dynamic from "next/dynamic"
import { NoticeType } from "../_types/notice.types"


const NoticeDetailEditor = dynamic(() => import("./NoticeDetailEditor").then(mode => mode.default), { ssr: false })
export default function NotificationDetailClient({ notice }: Pick<NoticeType, 'notice'>) {
    return (
        <div>
            <NoticeDetailEditor notice={notice} />
        </div>
    )
}