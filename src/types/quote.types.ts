export interface QuoteType {
  quote_id: number
  author: string
  quote: string
  view?: number
  job?: string
  intro?: string
  birth?: string
  email?: string
  created_at?: string
  updated_at?: string
  profile_img?: string
  category?: string
}


export type UserPostType = Pick<QuoteType, 'author' | 'category' | 'quote_id' | 'quote'>
export interface UserQuotesType {
  quote_id: number
  quote: string
  author: string
  category: string
  email: string
}


