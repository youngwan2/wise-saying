
import styles from './HomeMenu.module.css'
import React from 'react'

import { useRouter } from 'next/navigation'

import { hoverAnimation } from "@/utils/common-func"

import { IconType } from 'react-icons'


interface PropsType {
    navItem: {
        path: string,
        label: string,
        icon: IconType
    }
}
export default function HomeMenuButton({ navItem }: PropsType) {

    const { push, prefetch } = useRouter()

    function handlePrefetch() {
        prefetch(navItem.path)
    }

    function handleRedirectTo(path: string) {
        push(path)
    }

    function createReactElement(icon: IconType) {
        return React.createElement(icon, {
            color: 'white',
            className:
                'mt-[0.5em] w-[100%] h-[30px] mb-[0.5em] inline-block',
        })

    }

    return (
        <button
            onMouseMove={hoverAnimation}
            className={`${styles.card} flex flex-col items-center h-[100px] text-white m-1 rounded-[10px] p-2 hover:shadow-[inset_0_0_0_2px_rgba(255,255,255,0.2)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)] mt-[0.5em] transition-all relative`}
            onMouseEnter={handlePrefetch}
            onClick={() => { handleRedirectTo(navItem.path) }}
            key={navItem.label}
        >
            {createReactElement(navItem.icon)}
            <span>{navItem.label}</span>
        </button>
    )
}