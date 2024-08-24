import { create } from 'zustand'
import type {
  MypageTapsState,
  CardZoomInOutState,
  UpdateState,
  PolicyTapState,
  CardThemeState,

} from '../types/store.type'



/**  이페이지 메뉴 탭의 id 저장 */
export const useMypageTapsStore = create<MypageTapsState>((set) => ({
  tapId: 0,
  setTapId: (tapId) => set(() => ({ tapId })),
}))



/** 명언 카드 확대(클로즈 업) 관련 상태 저장 */
export const useCardZoomInOutStore = create<CardZoomInOutState>((set) => ({
  isZoomIn: false,
  cardIndex: 0,
  setIsZoomIn: (isZoomIn) => set(() => ({ isZoomIn })),
  setCardIndex: (cardIndex) => set(() => ({ cardIndex })),
}))



/** 글목록  갱신 트리거 상태 저장 */
export const useCommentUpdate = create<UpdateState>((set) => ({
  isUpdate: false,
  setIsUpdate: (isUpdate) => set(() => ({ isUpdate }))
}))

/** 사이트 정책 탭 식별자 저장 */
export const usePolicyTaps = create<PolicyTapState>((set) => ({
  tapNum: 0,
  setTapNum: (tapNum) => set(() => ({ tapNum }))
}))


/** 카드 디자인 테마 설정 */
export const useCardTheme = create<CardThemeState>((set) => ({
  isCardTheme: false,
  setIsCardTheme: (isCardTheme) => set(() => ({ isCardTheme }))
}))


