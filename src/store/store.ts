import { create } from "zustand";

interface LoginState{
    loginState: boolean
    setLoginState : (loignState: boolean) => void
}

interface PostIdState {
    postId: number
    setPostId : (id: number) => void
}


export const useLoginStateStore = create<LoginState>((set) => ({
    loginState : false,
    setLoginState : (loginState) => set(() =>({loginState : loginState}))
}))


export const useUserPostIdStore = create<PostIdState>((set) => ({
    postId : 0,
    setPostId : (id) => set(() => ({postId : id }))
}))


