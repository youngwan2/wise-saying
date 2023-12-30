import { ItemsType } from "@/types/items.types"

// 페이지 이동 함수
export const pageSwitch = (router:any, id: number) => {
    router.push(`/quotes-styler/auhtor/${id}`)

    return true
}

// 명언 선택 함수
export function quotesSelector(items:ItemsType[], id: number) {
    const item = items.find((item) => item.id === id)
    localStorage.setItem('selectedItem', JSON.stringify(item))
}
