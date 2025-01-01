import { PolicyTapState } from "@/types/store.type";
import { create } from "zustand";

/** 사이트 정책 탭 식별자 저장 */
export const usePolicyTaps = create<PolicyTapState>((set) => ({
    tapNum: 0,
    setTapNum: (tapNum) => set(() => ({ tapNum }))
  }))
  
  