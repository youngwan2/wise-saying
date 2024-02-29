"use client"

import useHasToken from "@/custom/useHasToken";
import navList from "@/router";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { HiMenuAlt3 } from "react-icons/hi";

export default function HomeMenu() {
    const { push, prefetch } = useRouter()
    const hasToken = useHasToken()

    return (
        <>
            <h2 className="sm:text-[1.5em] text-[1.35em] flex items-center text-white max-w-[600px] pl-[8px] mx-auto  mt-[2em] mb-[0.25em]"><HiMenuAlt3 className='mr-[5px]' /> 카테고리</h2>
            <nav className="grid sm:grid-cols-3 grid-cols-2  max-w-[600px] mx-auto ">

                {navList.filter(navItem=>navItem.path!=='/').map((navItem, index) => {
                    return (
                        <button
                            className="flex flex-col items-center h-[100px] text-white m-1 rounded-[10px] p-2 shadow-[inset_0_0_0_3px_white]  hover:bg-[#d5d5d533] mt-[0.5em] transition-all"
                            onMouseEnter={() => {
                                prefetch(navItem.path)
                            }}
                            onClick={() => {
                                if (navItem.path.startsWith('/add-wisesaying')
                                    || navItem.path.startsWith('/mypage')
                                ) {
                                  return  hasToken ? push(navItem.path) : toast.error('로그인 후 이용가능 합니다.')
                                }
                                push(navItem.path)
                            }} key={navItem.label} >
                            {React.createElement(navItem.icon, {
                                color: 'white',
                                className: 'mt-[0.5em] w-[100%] h-[30px] mb-[0.5em] inline-block',
                            })}
                            <span>{navItem.label}</span>
                        </button>
                    )
                })}
            </nav>
        </>
    )


}