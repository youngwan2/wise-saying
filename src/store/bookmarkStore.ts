import { BookmarkToggleState, UpdateState } from '@/types/store.type'
import { create } from 'zustand'


/** 북마크 활성화 상태 및 리스트 저장 */
export const useBookmarkStore = create<BookmarkToggleState>((set) => ({
    toggleState: false,
    bookmarkList: [],
    count: 0,
    setToggleState: (toggle) => set(() => ({ toggleState: toggle })),
    setBookmarkList: (list) => set(() => ({ bookmarkList: list })),
    setListCount: (count) => set(() => ({ count })),
  }))
  
  /** 북마크 리스트 목록 갱신 트리거 상태 저장 */
  export const useBookmarkUpdate = create<UpdateState>((set) => ({
    isUpdate: false,
    setIsUpdate: (isUpdate) => set(() => ({ isUpdate })),
  }))