import NoticePageContainer from "../_components/NoticePageContainer";

import { getNoticeCategories, getNotices } from "@/services/notices/notices-server.service";


export default async function NoticePage() {
    const notices = await getNotices()
    const categories = await getNoticeCategories()

    return (
        <NoticePageContainer notices={notices} categories={categories} />
    )
}

