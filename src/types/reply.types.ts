export interface ReplyInfoType {
    replies: {
        id: number
        content: string
        nickname: string
        email: string
        created_at: string
    }[]
    totalCount?: number
}

export interface ReplyType {
    reply: {
        id: number
        content: string
        nickname: string
        email: string
        created_at: string
    }
}
