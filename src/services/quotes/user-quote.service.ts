import { Method, defaultConfig } from '@/configs/config.api'
import { config } from '@/configs/config.url'
import { UserContentType } from '@/types/user-quote.types'
import { defaultFetch } from '@/utils/fetcher'
import { toast } from 'react-toastify'
import { mutate } from 'swr'


/**
 * GET | 유저가 작성한 게시글의 카테고리 목록을 반환
 * @param path 경로
 * @returns 카테고리 목록 반환
 */
export const getCategoryUserFromDb = async (path: string) => {
    const transformUrl = config.apiPrefix + config.apiHost + path
    const response = await fetch(transformUrl, {
        next: { tags: ['user'] },
    })
    const { status, items: categories } = await response.json()
    if (status === 200) return categories
    return []
}

/**
 * POST | 유저가 작성한 포스트를 등록 요청하는 메소드
 * @param userPost
 */
export const postUserPost = async (userPost: {
    category: string
    content: string
    author: string
    isUser: boolean
  }) => {
    const { category, content, author } = userPost
  
    // 유효성 검증
    if (!(category && content && author))
      return toast.error('모든 빈칸을 채워주세요.')
    if (category.toString().length < 1 || category.toString().length > 3)
      return toast.error('주제를 최소 2자 이상~ 3자 이하로 적어 주세요.')
    if (content.toString().length < 3)
      return toast.error('내용을 최소 3자 이상 적어 주세요.')
    if (author.toString().length < 2)
      return toast.error('작성자를 최소 2자 이상 적어주세요.')
  
    const url = '/api/quotes/users/post'
    const config = defaultConfig(Method.POST, userPost)
    const { success, meg } = await defaultFetch(url, config)
    if (success) {
      toast.success(meg)
      return true
    }
    if (!success) {
      toast.error(meg)
      return false
    }
  }
  


/**
* PATCH | 유저가 작성한 명언 수정 요청
* @param postId
* @param hasToken
* @param router
* @param userPost
* @returns
*/
export const updateUserPost = async (
    postId: number,
    userPost: UserContentType,
) => {
    const { category, content, author } = userPost
    if (category.toString().length <= 1)
        return toast.error(`주제를 최소 2자 이상 적어 주세요.`)
    if (content.toString().length < 3)
        return toast.error(`내용을 최소 3자 이상 적어 주세요.`)
    if (author.toString().length <= 1)
        return toast.error('작성자를 최소 2자 이상 적어주세요.')

    const config = defaultConfig(Method.PATCH, userPost)
    const url = `/api/quotes/users/post/${postId}`
    const { success, meg } = await defaultFetch(url, config)
    if (success) {
        toast.success('수정하였습니다.')
        return true
    }
    if (!success) {
        toast.error(meg)
        return false
    }
}



/**
 * DELETE | 유저가 선택한 명언 아이템 삭제
 * @param id 해당 카드의 식별자
 */
export const deleteUserQuote = async (id: number) => {
    const isDelete = confirm('정말로 삭제 하시겠습니까?')
    if (!isDelete) return alert('삭제 요청을 취소하였습니다.')

    const config = defaultConfig(Method.DELETE)
    const url = `/api/quotes/users/post/${id}`
    const { success, meg } = await defaultFetch(url, config)
    if (success) {
        toast.success(meg)
        mutate(`/api/quotes/users/post/categories/0`)
        return true
    } else {
        return false
    }
}
