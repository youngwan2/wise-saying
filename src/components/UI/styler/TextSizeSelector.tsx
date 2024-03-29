
interface PropsType {
    textSizes: number[]
    isShowSelector: boolean
    onClickTextSizeSelect: (size: number) => void
    onClickDisplaySelect: (isShowSelector: boolean) => void
}
export default function TextSizeSelector({ textSizes, isShowSelector, onClickTextSizeSelect, onClickDisplaySelect }: PropsType) {

    return (
        <article aria-label='글자 크기 선택창' className={`${isShowSelector ? 'visible opacity-100' : 'invisible opacity-0'} absolute w-[120px] bg-white rounded-[10px] shadow-[0_5px_5px_2px_rgba(0,0,0,0.2)] transition z-[1000] top-[-32em]  max-h-[500px] overflow-auto`}>
                <ul onClick={(e) => {
                    if (!(e.target instanceof HTMLLIElement)) return
                    const size = Number(e.target.textContent) || null
                    size && onClickTextSizeSelect(size)
                }} >
                    {textSizes.map((size) => {
                        return <li onClick={() => onClickDisplaySelect(false)} key={size} className='p-[5px] text-center hover:bg-[rgba(0,0,0,0.2)] hover:cursor-pointer'>{size === 0 ? '닫기' : size}</li>
                    })}
                </ul>
        </article>
    )
}