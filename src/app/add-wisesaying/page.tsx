"use client"
import { useRouter } from "next/navigation"
import gsap from "gsap"
import { Draggable } from "gsap/Draggable"
import { useEffect, useRef } from "react"

export default function AddWisesayingPage() {


    const formRef = useRef<HTMLFormElement>(null)
    useEffect(()=>{
        if(formRef.current) {
            gsap.registerPlugin(Draggable)
                Draggable.create(formRef.current,{
                    bounds: document.querySelector('body'),
                    dragClickables:false
                })
        }
    },[])

    const router = useRouter()
    return (
        <section className="absolute left-0 right-0 top-0 bottom-0 bg-[#00000065] p-[10px] rounded-[10px]">
            

            <form
                ref={formRef}
                className="max-w-[560px] mx-auto bg-[#ffb057]  rounded-[10px] shadow-2xl"
                onSubmit={(e) => {
                    e.preventDefault()
                }}>
                {/* 주제(카테고리) */}
                <h2 className="text-[1.5em] mb-[1em] font-bold bg-[#333232] text-[white] p-[8px]  rounded-t-lg">명언 등록</h2>
                <article className="px-[2em]">
                    <label htmlFor="subject" className="block font-bold">주제</label>
                    <input type="text" className="min-w-[200px] w-[500px] min-h-[40px] px-[10px]" />
                </article>
                <br />
                {/* 내용 */}
                <article className="px-[2em]">
                    <label htmlFor="content" className="block font-bold">내용</label>
                    <textarea name="content" id="content" className="min-w-[200px] w-[500px] p-[10px] min-h-[150px]" ></textarea>
                </article>
                <br />
                {/* 작성자(닉네임) */}
                <article className="px-[2em]">
                    <label htmlFor="content" className="block font-bold">작성자</label>
                    <input type="text" className="min-w-[200px] w-[500px]  px-[10px] min-h-[40px] " />
                </article>
                <br />
                {/* 전송버튼 */}
                <article className="p-[2em]">
                <button className=" bg-[#ffffff] p-[10px] mr-[1em] font-bold">등록하기</button>
                <button 
                onClick={()=>{
                    router.back()
                }}
                className="bg-[#ffffff] p-[10px] font-bold">취소</button>
                </article>
            </form>
        </section>
    )
}