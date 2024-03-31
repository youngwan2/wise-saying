import styles from './styler.module.css'
import { MouseEventHandler } from "react"
import { HiArrowDown, HiArrowUp } from "react-icons/hi2"

interface PropsType {
    isShowStyler: boolean
    onToggle: MouseEventHandler<HTMLButtonElement>
}
export default function HideButton({ isShowStyler, onToggle }: PropsType) {

    return (
        <button onClick={onToggle} className={`${styles.styler_hide_button}  ${!isShowStyler? '':'bg-white hover:bg-[#e7e4e4] text-[#162557] '} bg-[tomato] hover:bg-[#f77e69] absolute left-[-0.8px] text-white top-[-1.36em]  rounded-t-[10px] text-[1.55em] p-[4px] px-[10px] transition-all text-center backdrop-grayscale-[50%] w-[48.5px] border-x border-t `}>
            {!isShowStyler ? <HiArrowDown /> : <HiArrowUp color='black' />}
        </button>
    )
}