import { Method, defaultConfig } from "@/configs/config.api"
import { defaultFetch } from "@/utils/fetcher"
import { toast } from "react-toastify"

/**
 * POST | 특정 댓글에 대한 대댓글 등록 요청
 * @param commentId
 * @param content 대댓글
 * @returns
 */
export const postReply = async (commentId: number, content: string) => {
    const url = `/api/quotes/0/comments/reply?comment-id=${commentId}`
    const config = defaultConfig(Method.POST, content)
    const { success, meg } = await defaultFetch(url, config)
    if (success) {
      toast.success('댓글이 등록되었습니다.')
      return true
    }
    if (!success) {
      toast.error(meg)
      return false
    }
  }
  