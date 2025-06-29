import { MouseEvent } from "react";

interface PropsType {
    textSizes: number[];
    isShowSelector: boolean;
    onClickTextSizeSelect: (size: number) => void;
    onClickDisplaySelect: (isShowSelector: boolean) => void;
}

export default function TextSizeList({
    textSizes,
    isShowSelector,
    onClickTextSizeSelect,
    onClickDisplaySelect,
}: PropsType) {

    function handleSetTextSize(e: MouseEvent<HTMLUListElement>) {
        if (!(e.target instanceof HTMLLIElement)) return;

        const size = Number(e.target.dataset.size);

        if (size === 0) {
            onClickDisplaySelect(false);
        } else if (size) {
            onClickTextSizeSelect(size);
            onClickDisplaySelect(false);
        }
    } return (
        <article
            aria-label="글자 크기 선택창"
            className={`${isShowSelector ? 'visible opacity-100' : 'invisible opacity-0'
                } absolute w-full bg-white rounded-lg border border-gray-200 shadow-lg transition-all duration-200 z-[100000000002] top-full mt-2 max-h-[300px] overflow-auto`}
        >
            <ul onClick={handleSetTextSize}>
                {textSizes.map((size) => (
                    <li
                        data-size={size}
                        key={size}
                        className="p-3 text-center text-gray-700 hover:bg-gray-100 hover:cursor-pointer transition-colors duration-150 border-b border-gray-100 last:border-b-0"
                    >
                        {size === 0 ? '닫기' : size}
                    </li>
                ))}
            </ul>
        </article>
    );
}
