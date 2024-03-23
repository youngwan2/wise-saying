import ReplaceMessageCard from '@/components/UI/common/ReplaceMessageCard'
import DetailPageControlButtons from '@/components/UI/detail-quote/DetailPageControlButtons'
import Comment from '@/components/UI/comment/Comment'
import { openDB } from '@/utils/connect'
import ShareButtons from '@/components/UI/detail-quote/ShareButtons'
import Link from 'next/link'
import QuoteLikeBox from '@/components/UI/detail-quote/QuoteLikeBox'

export default async function DetailPage({
  params,
}: {
  params: { category: string; name: string; id: string }
}) {
  const { name, id } = params
  const decodeName = decodeURIComponent(name)

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
      console.error(
        '/app/(quotes)/quotes/[category]/[name]/[id]/page.tsx',
        error,
      )
      return false
    }
  }

  const item = await getQuoteDetail(id)
  if (!item) return <ReplaceMessageCard childern="데이터를 조회중 입니다.." />


  return (
    <article className="sm:p-[4em] p-[1em]  min-h-[100vh] h-full  mx-auto my-[3em]  perspective-500 flex flex-col max-w-[1300px] bg-[#0000001b]">
      <h2 className="sm:text-[1.5em] text-[1.2em]  flex justify-center items-center p-[10px]  text-center text-white">
        <span className="mx-[3px] text-[gold] font-mono">
          <Link href={`/quotes/authors/${decodeName}`}>{decodeName}</Link>
        </span>
        가라사대
      </h2>
      <QuoteLikeBox id={id} />
      {/* 명언 텍스트 영역 */}
      <blockquote
        className="
         sm:text-[1.2em]
         md:text-[1.4em] text-[1em] sm:px-[3em] p-[3.5em] min-h-[280px]  text-center  bg-[#ffffffdb] text-centermax-w-[900px] w-full mx-auto rounded-[10px] mt-[2em]
         shadow-[inset_0_5px_5px_0_rgba(0,0,0,0.5)] 
         flex items-center justify-center
            "
      >
        <p className="">{item.quote}</p>
        
      </blockquote>

      <div className="flex">
        {/* 컨트롤 버튼 */}
        <DetailPageControlButtons item={item} />
        {/* 공유 버튼 */}
        <ShareButtons />
      </div>
      {/* 댓글 영역 */}
      <Comment id={id} />
    </article>
  )
}
