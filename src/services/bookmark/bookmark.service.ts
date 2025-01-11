import { Method, fetchConfig, fetchConfigNoBody } from "@/configs/config.api"
import { toast } from 'react-hot-toast'
import apiRoute from "@/configs/config.api-route"
import { HttpError } from "@/configs/config.error"

/** GET | 북마크 조회 */
export const getBookmarkList = async (url: string) => {
    const config = fetchConfigNoBody(Method.GET)
    const response = await fetch(url, config)
    const result = await response.json()
    const { bookmarks } = result
    return bookmarks
}


/**
* POST | 북마크 추가
* @param bookmarkId 북마크에 추가할 아이템의 식별자(=>quote_id)
* @param pathName '/quotes/authors/${path}
*/
export const addBookmark = async (bookmarkId: number, path: string) => {
    const quoteUrl = location.origin + `${path}`
    const body = {
        quoteId: bookmarkId,
        url: quoteUrl,
    }

    const url = apiRoute.BOOKMARK.BOOKMARK_CREATE()
    const config = fetchConfig(Method.POST, body)

    try {
        const response = await fetch(url, config)
        const { meg, success } = await response.json();
        if (success) {
            toast.success(meg)
            return true
        }
        if (!success) {
            toast.error(meg)
            return false
        }
    } catch (error) {
        if (error instanceof Error) {
            toast.error("북마크 추가 실패: " + error.message)
            return false
        }
    }
}

/**
 * DELETE | 북마크 삭제
 * @param bookmarkId
 * @param type user | no-user
 * @returns
 */
export async function deleteBookmark(bookmarkId: number, isUserQuote: boolean) {
    const type = isUserQuote ? 'user' : 'no-user'
    const url = apiRoute.BOOKMARK.BOOKMARK_DELETE(bookmarkId, type)
    const config = fetchConfigNoBody(Method.DELETE)
    try {
        const response = await fetch(url, config)

        if (response.status === 404) throw new HttpError(response.status, response.statusText)
        const { success, meg } = await response.json();

        return { success, meg }

    } catch (error) {
        if (error instanceof HttpError) {
            return { success: false, meg: error.message }
        }
    }
}
