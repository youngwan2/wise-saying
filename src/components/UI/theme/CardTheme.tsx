"use client"
import styles from './theme.module.css'
import { useCardTheme } from "@/store/store"
import { HiViewGrid } from "react-icons/hi"

export default function CardTheme() {

    const { isCardTheme, setIsCardTheme } = useCardTheme((state) => state)

    return (
        <button onClick={() => setIsCardTheme(!isCardTheme)} className={` ${styles.theme_button} border p-[5px] text-[1.25em] absolute right-[3%] z-[10]`}><HiViewGrid color="white" /></button>
    )
}