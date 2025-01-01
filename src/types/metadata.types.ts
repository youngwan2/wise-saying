// 메타데이터 요청 타입
export enum Target {
    USER_QUOTE_CATEGORY_ALL = 'USER_QUOTE_CATEGORY', // 명언 카테고리 메타데이터
    USER_QUOTE = 'USER_QUOTE',
    QUOTE_AUTHOR = 'QUOTE_AUTHOR',
    QUOTE_AUTHOR_CATEGORY_ALL = 'QUOTE_AUTHOR_CATEGORY_ALL',
    QUOTE_TOPIC = 'QUOTE_TOPIC',
    QUOTE_TOPIC_CATEGORY_ALL = 'QUOTE_TOPIC_CATEGORY_ALL',

}
export type QuoteMetaDataType = {
    type: Target
    category?: string
    totalLimit?: number
};