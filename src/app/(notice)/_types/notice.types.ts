import { OutputData } from "@editorjs/editorjs"

export interface NoticeType {
    notices: {
        notice_id: number
        content: OutputData
        created_at: Date
        name: '점검' | '업데이트' | '이벤트' | '작업' | '서비스'
    }[]
    notice?: {
        notice_id: number
        content: OutputData
        created_at: Date
        name: '점검' | '업데이트' | '이벤트' | '작업' | '서비스'
    }

    categories: {
        name: string
        notice_category_id: number
    }[]
    category?: {
        name: string
        notice_category_id: number
    }
}

export interface DefaultNotice {
    notice_id: number
    content: OutputData
    created_at: Date
    name: '점검' | '업데이트' | '이벤트' | '작업' | '서비스'
}
