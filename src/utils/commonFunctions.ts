import { ItemsType } from "@/types/items.types"

// 페이지 이동 함수
export const pageSwitch = (router: any, id: number) => {
    router.push(`/quotes-styler/auhtor/${id}`)

    return true
}

// 명언 선택 함수
export function quotesSelector(items: ItemsType[], id: number) {
    const item = items.find((item) => item.id === id)
    localStorage.setItem('selectedItem', JSON.stringify(item))
}


// 북마크 아이템을 추가하는 함수
export const postBookmarkItem = (hasToken: boolean, itemId: number, items: ItemsType[], category: string) => {
    if (!hasToken) return alert('로그인 후 이용해주시길 바랍니다.')
    const token = localStorage.getItem('token')
    const selectedItem = items.find((item) => item.id === itemId)
    const postData = {
        author: selectedItem?.author,
        wise_sayings: selectedItem?.wise_sayings,
        category
    }

    const url = '/api/bookmark'
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(async (response) => {
        const result = await response.json()
        const { meg, status } = result

        if (status === 201) {
            alert(meg)
            
        }
        if (status === 422) {
            alert(meg)
        }
        if (status === 401) {
            alert(meg)
            logoutUser()
        }
    }).catch((error) => {
        console.error(error)
    })
}

// 토큰 만료 이후 강제 로그아웃 함수
export const logoutUser = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    location.replace('/login')
}
