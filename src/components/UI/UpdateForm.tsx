"use client"
import { useRouter } from "next/navigation"
import gsap from "gsap"
import { Draggable } from "gsap/Draggable"
import { useEffect, useRef, useState } from "react"
import { useUserPostIdStore } from "@/store/store"
import useHasToken from "@/custom/useHasToken"

export default function UpdateForm() {

    const router = useRouter()
    const formRef = useRef<HTMLFormElement>(null)
    const validToken = useHasToken()
    const [newUserPost, setNewUserPost] = useState({
        category: '',
        wise_sayings: '',
        author: '',
        userEmail: ''
    })

    const [oldPost, setOldPost] = useState({
        category: '',
        wise_sayings: '',
        author: '',
        userEmail: ''
    })

    const postId = useUserPostIdStore((state) => state.postId)

    // 유저가 작성한 포스트를 등록 요청하는 메소드
    const updateUserPost = () => {
        if (validToken) {
            const accessToken = localStorage.getItem("token")
            const headers = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
            fetch(`http://localhost:3000/api/items/users/${postId}`, {
                method: "PUT",
                headers,
                body: JSON.stringify(newUserPost)
            }).then(async (response) => {
                const { status, success } = await response.json()
                if (success === true) {
                    alert("정상적으로 등록되었습니다.")
                    router.push('/user-quotes')
                    setTimeout(() => {
                        location.reload()
                    }, 300)

                }
                if (success === false) {
                    alert("최대 로그인 가능 시간이 초과하였습니다. 로그인을 다시 시도해 주세요")
                    localStorage.removeItem('user')
                    localStorage.removeItem('token')
                    router.push('/login')
                }
            }).catch((error) => {
                console.error(error)
            })
        }
        if (!validToken) {
            alert("로그인 해주세요")
            router.push('/login')
        }
    }

    // 유저가 작성한 단일 포스트 데이터를 요청하는 메소드
    const getUserPostBy = async (postId: number) => {
        try {
            const response = await fetch(`http://localhost:3000/api/items/users/${postId}`)
            const item = await response.json()
            setOldPost(item[0])

        } catch (error) {
            console.error(error)
        }
    }

    // UI 드래그 이벤트 등록
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
        const hasUserEmail = !!localStorage.getItem("user")
        if (hasUserEmail) {
            const userEmail = localStorage.getItem("user")
            if (userEmail) setNewUserPost((old) => ({ ...old, userEmail }))

        }
    }, [])


    useEffect(() => {
        getUserPostBy(postId)
    }, [postId])

    // 포스트 수정 시 기본값 지정
    useEffect(()=>{
        setNewUserPost({
            category:oldPost.category,
            author:oldPost.author,
            userEmail:oldPost.userEmail,
            wise_sayings:oldPost.wise_sayings
        })
    },[oldPost])


    return (
        <form
            ref={formRef}
            className="max-w-[560px] mx-auto bg-[#ffb057]  rounded-[10px] shadow-2xl"
            onSubmit={(e) => {
                e.preventDefault()
            }}>
            {/* 주제(카테고리) */}
            <h2 className="text-[1.5em] mb-[1em] font-bold bg-[#333232] text-[white] p-[8px]  rounded-t-lg">명언 수정</h2>
            <article className="px-[2em]">
                <label htmlFor="subject" className="block font-bold">주제</label>
                <input onInput={(e) => {
                    const category = e.currentTarget.value
                    setNewUserPost({ ...newUserPost, category })
                }} type="text" className="min-w-[200px] w-[500px] min-h-[40px] px-[10px]" placeholder={"기존내용) " + oldPost.category||"없음"} />
            </article>
            <br />
            {/* 내용 */}
            <article className="px-[2em]">
                <label htmlFor="content" className="block font-bold">내용</label>
                <textarea name="content" id="content" className="min-w-[200px] w-[500px] p-[10px] min-h-[150px]" onInput={(e) => {
                    const wise_sayings = e.currentTarget.value
                    setNewUserPost({ ...newUserPost, wise_sayings })
                }} placeholder={"기존내용) "+ oldPost.wise_sayings || "없음"} ></textarea>
            </article>
            <br />
            {/* 작성자(닉네임) */}
            <article className="px-[2em]">
                <label htmlFor="content" className="block font-bold">작성자</label>
                <input onInput={(e) => {
                    const author = e.currentTarget.value;
                    setNewUserPost({ ...newUserPost, author })
                }} type="text" className="min-w-[200px] w-[500px]  px-[10px] min-h-[40px]" placeholder={"기존내용) "+ oldPost.author} />
            </article>
            <br />
            {/* 전송버튼 */}
            <article className="p-[2em]">
                <button className=" bg-[#ffffff] p-[10px] mr-[1em] font-bold" onClick={updateUserPost}>등록하기</button>
                <button
                    onClick={() => {
                        router.push('/')
                    }}
                    className="bg-[#ffffff] p-[10px] font-bold">취소</button>
            </article>
        </form>
    )
}