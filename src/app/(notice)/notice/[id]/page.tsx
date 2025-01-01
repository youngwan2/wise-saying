import ErrorMessage from "@/components/UI/message/ErrorMessage";
import { getNoticeWithId } from '@/services/notices/notices-server.service';
import NotificationDetailClient from "../../_components/NotificationDetailClient";

export default async function NoticeDetailPage({ params }: { params: { id: string } }) {
    const notice = await getNoticeWithId(params.id)
    if (!notice) return <ErrorMessage />

    return <NotificationDetailClient notice={notice} />
}
