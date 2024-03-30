import styles from './styler.module.css'
import { MouseEventHandler } from "react"
import { HiArrowDown, HiArrowUp } from "react-icons/hi2"

interface PropsType {
    isShowStyler: boolean
    onToggle: MouseEventHandler<HTMLButtonElement>
}
export default function HideButton({ isShowStyler, onToggle }: PropsType) {

    return (
        <button onClick={onToggle} className={`${styles.styler_hide_button}  ${!isShowStyler? '':'bg-white'} hover:bg-[#4f4e4ea8] absolute left-0 text-white top-[-1.33em]  rounded-t-[10px] text-[1.55em] p-[4px] px-[10px] transition-all text-center backdrop-grayscale-[50%] w-[48.5px] `}>
            {!isShowStyler ? <HiArrowDown /> : <HiArrowUp color='black' />}
        </button>
    )
}