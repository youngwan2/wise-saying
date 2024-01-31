import { MouseEventHandler } from "react"

interface PropsType {
    page: number
    maxPage: number
    minPage: number
    onClickPrev: MouseEventHandler<HTMLButtonElement>
    onClickNext: MouseEventHandler<HTMLButtonElement>
}
export default function CommentLoadMoreButtons({ page, maxPage, minPage, onClickPrev, onClickNext }: PropsType) {

    function pageCloser() {
        let copyPage = 0
        return function (page: number) {
            copyPage = page
            return copyPage + 1
        }
    }

    return (
        <article aria-label="이전과 다음 페이지 이동 버튼 컨테이너" className="relative left-[50%] translate-x-[-50%] inline-block text-white">
            <button onClick={onClickPrev} className={`bg-[tomato] m-[5px] rounded-[5px] p-[5px] mt-[1em] ${minPage === page ? 'invisible' : 'visible'}`}>이전</button>
            <span className="mx-[1em]">{pageCloser()(page)}/{maxPage}</span>
            <button onClick={onClickNext} className={`bg-[tomato] m-[5px] rounded-[5px] p-[5px] mt-[1em] ${maxPage === pageCloser()(page) ? 'invisible' : 'visible'}`}>다음</button>
        </article>
    )
}