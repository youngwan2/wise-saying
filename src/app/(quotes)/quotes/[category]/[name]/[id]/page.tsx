import ReplaceMessageCard from "@/components/UI/common/ReplaceMessageCard"
import DetailPageControlButtons from "@/components/UI/button/DetailPageControlButtons"
import CommentList from "@/components/UI/comment/CommentList"
import { openDB } from "@/utils/connect"
import ShareButtons from "@/components/UI/button/ShareButtons"

export default async function DetailPage({ params }: { params: { category: string, name: string, id: string } }) {

    const { name, id } = params

    async function getQuoteDetail(id: string) {
        'use server'
        try {
            const db = await openDB()
            const query = `
            SELECT quote_id AS id, quote, author, job, created_at AS create_date
            FROM quotes
            WHERE quote_id = $1 AND author = $2
        `
            const result = await db.query(query, [id, decodeURIComponent(name)])
            const item = result.rows[0]
            return item
        } catch (error) {
            console.error('/app/(quotes)/quotes/[category]/[name]/[id]/page.tsx')
            return false
        }
    }

    const item = await getQuoteDetail(id)

    if (!item) return <ReplaceMessageCard childern='데이터를 조회중 입니다..' />
    return (
        <div className="min-h-[100vh] h-full  mx-auto my-[3em] p-[4em] perspective-500 flex flex-col max-w-[900px] bg-[#0000001b]">
            <h2 className="flex justify-center items-center text-[1.5em] p-[10px]  text-center text-white">
                <span className="mx-[3px] text-[gold] font-mono">{decodeURIComponent(name)}</span> 가라사대
            </h2>
            {/* 명언 텍스트 영역 */}
            <article className="bg-[white] text-center p-[5em] max-w-[900px] w-full mx-auto rounded-[10px] mt-[2em]
            shadow-[inset_0_5px_5px_0_rgba(0,0,0,0.5)]
            ">
                <p className="text-[1.25em]">{item.quote}</p>

            </article>
            <div className="flex">
                {/* 컨트롤 버튼 */}
                <DetailPageControlButtons item={item} />
                {/* 공유 버튼 */}
                <ShareButtons />
            </div>

            {/* 댓글 영역 */}
            <CommentList id={id} />
        </div>
    )
}