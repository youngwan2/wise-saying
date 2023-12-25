"use client"
import { useRouter } from "next/navigation"
import gsap from "gsap"
import { Draggable } from "gsap/Draggable"
import { useEffect, useRef, useState } from "react"
import useHasToken from "@/custom/useHasToken"

export default function PostForm() {

    const formRef = useRef<HTMLFormElement>(null)
    const validToken = useHasToken()
    const [userPost, setUserPost] = useState({
        category:'',
        wise_sayings:'',
        author:'',
        userEmail:''
    })

    const postUserPost=()=>{
        if(validToken){
        const accessToken = localStorage.getItem("token")
        const headers = {
            "Content-Type":"application/json",
            "Authorization":`Bearer ${accessToken}`
        }
        fetch('http://localhost:3000/api/add-post',{
            method:"POST",
            headers,
            body : JSON.stringify(userPost)
        }).then(async (response)=>{
           const {status, success} =await response.json()
           if(success === true) {
            router.push('/user-quotes')
           }
        }).catch((error)=>{
            console.error(error)
        })
    } 
        if(!validToken) {
            alert("로그인 해주세요")
            router.push('/login')
        }
    }
    useEffect(() => {
        if (formRef.current) {
            gsap.registerPlugin(Draggable)
            Draggable.create(formRef.current, {
                bounds: document.querySelector('body'),
                dragClickables: false
            })
        }
    }, [])

    useEffect(() => {
        if (localStorage.getItem("user")) {
            const userEmail = localStorage.getItem("user")
            if (userEmail) setUserPost((old)=> ({...old, userEmail}))

        }
    }, [])


    const router = useRouter()

    return (

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
                <input onInput={(e) => {
                    const category = e.currentTarget.value
                    setUserPost({...userPost, category})
                }} type="text" className="min-w-[200px] w-[500px] min-h-[40px] px-[10px]" />
            </article>
            <br />
            {/* 내용 */}
            <article className="px-[2em]">
                <label htmlFor="content" className="block font-bold">내용</label>
                <textarea name="content" id="content" className="min-w-[200px] w-[500px] p-[10px] min-h-[150px]" onInput={(e)=>{
                    const wise_sayings = e.currentTarget.value
                    setUserPost({...userPost, wise_sayings})
                }} ></textarea>
            </article>
            <br />
            {/* 작성자(닉네임) */}
            <article className="px-[2em]">
                <label htmlFor="content" className="block font-bold">작성자</label>
                <input onInput={(e)=>{
                    const author =e.currentTarget.value;
                    setUserPost({...userPost, author})
                }} type="text" className="min-w-[200px] w-[500px]  px-[10px] min-h-[40px] " />
            </article>
            <br />
            {/* 전송버튼 */}
            <article className="p-[2em]">
                <button className=" bg-[#ffffff] p-[10px] mr-[1em] font-bold" onClick={postUserPost}>등록하기</button>
                <button
                    onClick={() => {
                        router.back()
                    }}
                    className="bg-[#ffffff] p-[10px] font-bold">취소</button>
            </article>
        </form>
    )
}