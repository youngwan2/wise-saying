


interface PropsType {
    setPage: (p:number) => void
    page:number
    limit:number
    pageList:number[]
}
export default function Pagination({setPage, page, limit, pageList}:PropsType) {


    return (
        <article className="flex  max-w-[600px] justify-center mx-auto items-center mt-[1.5em] rounded-[1em] p-[5px] text-[1.1em]">
            <button onClick={() => {
                setPage(Math.max(--page, 0))
            }} className={`mx-[8px] ${page <= 0 ? 'invisible opacity-0' : 'visible opacity-100'}`}>prev</button>
            {pageList.map((pageNum, i) => {
                return <button key={i} className={`border-dashed border-[3px] hover:underline px-[10px] mx-[5px] ${page ===i?'font-bold border-[tomato] rounded-full':''} ${limit >= pageNum ? 'inline-block':'hidden' }`} onClick={() => {
                    setPage(pageNum - 1)
                    console.log(pageNum-1)
                }}>{pageNum}</button>
            })}
            <button onClick={() => {
                setPage(Math.min(++page, limit))
                console.log(page, limit)
            }} className={`mx-[8px ${page === limit-1 ? 'invisible opacity-0' : 'visible opacity-100'}`}>next</button>
        </article>
    )
}