import { deleteNoticeAction } from "@/actions/notice/delete-notice.action"
import { updateNoticeAction } from "@/actions/notice/update-notice.action"

import { type DefaultNotice } from "@/app/(notice)/_types/notice.types"
import { type OutputData } from "@editorjs/editorjs"

import { getFetcher } from "@/utils/fetcher"



interface NoticeUploadProps {
    category: string, post?: OutputData, token?: string | null, notice?: DefaultNotice
}

// 공지사항 수정 요청
export async function noticeUpload({ category, post, token, notice }: NoticeUploadProps) {
    const response = await updateNoticeAction(category, post, token || '', notice?.notice_id)
    const { message, success: isSuccess } = response

    return { message, isSuccess }

}

// 공지사항 삭제
export async function noticeDelete(token?: string | null, notice?: DefaultNotice) {
    const isDelete = confirm('정말로 삭제하시겠습니까? 삭제 시 복구가 불가능합니다')
    if (!isDelete) return {message:'취소하였습니다.', isSuccess:false}

    const response = await deleteNoticeAction(token || '', notice?.notice_id)
    const { message, success: isSuccess } = response

    return { message, isSuccess }

}

// 공지사항 전체 조회
export async function getNotices(url:string, page: number, category: string) {
    return getFetcher(url, false)
}