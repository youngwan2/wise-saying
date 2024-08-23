import { PostIdState, UserPostState } from "@/types/store.type";
import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'

// reference: https://zustand.docs.pmnd.rs/integrations/persisting-store-data#how-do-i-use-it-with-typescript

/** 유저 게시글의 식별자를 저장 */
export const useUserPostIdStore = create<PostIdState>((set) => ({
    postId: 0,
    setPostId: (id) => set(() => ({ postId: id })),
}))


/** 유저 포스트 */
export const useUserPostWithIdStore = create<UserPostState>()(
    persist(
        (set) => ({
            post: {
                quote_id: 0,
                category: '',
                quote: '',
                author: '',
            },
            setPost: (post) => set({ post: post }),
        }),
        {
            name: 'userPost',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
)