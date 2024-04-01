export interface ItemsType {
  id: number
  author: string
  quote: string
  job: string
  email?: string
}

export interface QuoteType {
  id: number
  author: string
  quote: string
}

export interface WeekDayCategoryType {
  category_id: number
  category: string
}

export interface CommentType {
  comment: {
    id: number
    email: string
    nickname: string | null
    profile_iamge: string | null
    comment: string
    created_at: string
  }
}

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


export interface ConsentsType {
  [key: string]: boolean
}


