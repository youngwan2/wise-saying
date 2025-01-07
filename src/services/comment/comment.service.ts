import { Method, defaultConfig } from "@/configs/config.api"
import { defaultFetch } from "@/utils/fetcher"
import { toast } from "react-toastify"

/**
 * GET | 특정 포스트에 등록된 댓글 목록 불러오기
 * @param id
 * @returns
 */
export const getCommentsFormDb = async (url: string) => {
    const response = await fetch(url)
    const { comments, totalCount } = await response.json()
    return { comments, totalCount }
}


/**
 * POST | 유저가 작성한 댓글을 등록
 * @param comment 코멘트
 * @param quoteId 명언 id
 */

export const postComment = async (
    comment: string,
    quoteId?: string | string[],
  ) => {
    if (comment.length < 2) return toast.error('2자 이상 입력해주세요.')
    if(!quoteId)  return
    const url = `/api/quotes/${quoteId}/comments`
    const config = defaultConfig(Method.POST, comment)
  
    const { success, meg } = await defaultFetch(url, config)
  
    if (success) {
      toast.success('댓글이 등록 되었습니다.')
      return true
    } else {
      toast.error(meg)
      return false
    }
  }

/**
* PATCH | 유저 댓글 수정
* @param commentId 댓글 식별자
* @param comment 댓글
* @returns
*/
export async function updateComment(commentId: number, comment: string) {
    if (comment.length < 2) return toast.error('2자 이상 입력해주세요.')

    const config = defaultConfig(Method.PATCH, comment)
    const url = `/api/quotes/${commentId}/comments`
    const { success, meg } = await defaultFetch(url, config)
    if (success) {
        toast.success('댓글이 등록되었습니다.')
        return true
    } else {
        toast.error(meg)
        return false
    }
}


/**
* DELETE | 댓글 삭제
* @param commentId 댓글 식별자
* @returns
*/
export async function deleteComment(commentId: number) {
    const isDelete = confirm('정말 삭제하시겠습니까?')
    if (!isDelete) return alert('삭제 요청을 취소하였습니다.')

    const url = `/api/quotes/${commentId}/comments`
    const config = defaultConfig(Method.DELETE)
    const { success, meg } = await defaultFetch(url, config)
    if (success) return toast.success(meg)
    if (!success) return toast.error(meg)
}


