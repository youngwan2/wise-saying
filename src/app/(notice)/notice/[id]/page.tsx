import ErrorMessage from "@/components/UI/message/ErrorMessage";
import NotificationDetailClient from "../../_components/NotificationDetailClient";
import { getNoticeWithId } from '@/services/notices/notices-server.service';


export default async function NoticeDetailPage({ params }: {   params: Promise<{  id: string }> }) {
    const notice = await getNoticeWithId((await params).id)
    if (!notice) return <ErrorMessage />

    return <NotificationDetailClient notice={notice} />
}
