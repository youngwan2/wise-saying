import { BodyOverflowState, HeaderSearchFormDisplayState, NavDisplayState } from "@/types/store.type"
import { create } from "zustand"


/** 네비게이션 메뉴 온오프 상태 저장 */
export const useNavDisplayStateStore = create<NavDisplayState>((set) => ({
    isDisplay: false,
    setIsDisplay: (display) => set(() => ({ isDisplay: display })),
}))

/** 헤더 검색창 온오프 상태 저장 */
export const useHeaderSearchFormStateStore =
    create<HeaderSearchFormDisplayState>((set) => ({
        isDisplay: false,
        setIsDisplay: (display) => set(() => ({ isDisplay: display })),
    }))

/** body 태그 오버플로우 속성 활성화 상태 저장 */
export const useBodyOverflowStore = create<BodyOverflowState>((set) => ({
    isHidden: false,
    setIsHidden: (isHidden) => set(() => ({ isHidden })),
}))
