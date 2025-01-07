import { Method, defaultConfig, getDefaultConfig } from "@/configs/config.api"
import { defaultFetch } from "@/utils/fetcher"
import {toast } from 'react-hot-toast'
import { requestNewAccessToken } from "../user/jwt.service"

/**
 * * GET | 북마크 리스트 불러오기
 * @param url
 */
export const getBookmarkListFetcher = async (url: string) => {
    const config = getDefaultConfig(Method.GET, true)
    const response = await fetch(url, config)
    const results = await response.json()

    const { status, bookmarks } = results

    if (status === 200) return bookmarks
    if (status === 401) await requestNewAccessToken() // 토큰 재발급
}


/**
* POST | 북마크 아이템을 추가하는 함수
* @param itemId 북마크에 추가할 아이템의 식별자(=>quote_id)
* @param pathName '/quotes/authors/${path}
*/
export const addBookmarkItem = async (itemId: number, path: string) => {
    const quoteUrl = location.origin + `${path}`
    const postData = {
        quoteId: itemId,
        url: quoteUrl,
    }

    const url = '/api/bookmark'
    const config = defaultConfig(Method.POST, postData)
    const result = await defaultFetch(url, config)
    const { meg, success } = result
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
 * DELETE | 북마크 아이템 삭제
 * @param bookmarkId
 * @param type user | no-user
 * @returns
 */
export async function deleteBookmark(bookmarkId: number, isUserQuote:boolean) {
    const type = isUserQuote? 'user':'no-user'
    const url = `/api/bookmark/${bookmarkId}?type=`+type
    const config = defaultConfig(Method.DELETE)
    const { success, meg } = await defaultFetch(url, config)
    if (success) return toast.success(meg)
    if (!success) return toast.error(meg)
  }
  