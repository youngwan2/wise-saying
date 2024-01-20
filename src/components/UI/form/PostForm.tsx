'use client'
import { useRouter } from 'next/navigation'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { useEffect, useRef, useState } from 'react'
import useHasToken from '@/custom/useHasToken'
import { logoutUser } from '@/utils/commonFunctions'

export default function PostForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const validToken = useHasToken()
  const [userPost, setUserPost] = useState({
    category: '',
    wise_sayings: '',
    author: '',
    userEmail: '',
  })

  // 유저가 작성한 포스트를 등록 요청하는 메소드
  const postUserPost = () => {
    if (validToken) {
      const accessToken = localStorage.getItem('token')
      const headers = {
        authorization: `Bearer ${accessToken}`,
      }
      fetch('http://localhost:3000/api/add-post', {
        method: 'POST',
        headers,
        body: JSON.stringify(userPost),
      })
        .then(async (response) => {
          const { status, success, meg } = await response.json()
          if (status === 201) {
            alert(meg)
            router.push('/user-quotes')
          }
          if (success === false) {
            alert(meg)
            // logoutUser()
          }
        })
        .catch((error) => {
          console.error(error)
        })
    }
    if (!validToken) {
      alert('로그인 해주세요')
      router.push('/login')
    }
  }

  // UI 드래그 이벤트 등록
  useEffect(() => {
    if (formRef.current) {
      gsap.registerPlugin(Draggable)
      Draggable.create(formRef.current, {
        bounds: document.querySelector('body'),
        dragClickables: false,
      })
    }
  }, [])

  useEffect(() => {
    const hasUserEmail = !!localStorage.getItem('user')
    if (hasUserEmail) {
      const userEmail = localStorage.getItem('user')
      if (userEmail) setUserPost((old) => ({ ...old, userEmail }))
    }
  }, [])

  const router = useRouter()

  return (
    <form
      ref={formRef}
      className="max-w-[560px] mx-auto bg-[#ffb057]  rounded-[10px] shadow-2xl"
      onSubmit={(e) => {
        e.preventDefault()
      }}
    >
      {/* 주제(카테고리) */}
      <h2 className="text-[1.5em] mb-[1em] font-bold bg-[#333232] text-[white] p-[8px]  rounded-t-lg">
        명언 등록
      </h2>
      <article className="px-[2em]">
        <label htmlFor="subject" className="block font-bold">
          주제
        </label>
        <input
          onInput={(e) => {
            const category = e.currentTarget.value
            setUserPost({ ...userPost, category })
          }}
          type="text"
          className="min-w-[200px] w-[500px] min-h-[40px] px-[10px]"
          placeholder="작성할 명언의 주제를 입력해주세요 ex) 사랑"
        />
      </article>
      <br />
      {/* 내용 */}
      <article className="px-[2em]">
        <label htmlFor="content" className="block font-bold">
          내용
        </label>
        <textarea
          name="content"
          id="content"
          className="min-w-[200px] w-[500px] p-[10px] min-h-[150px]"
          onInput={(e) => {
            const wise_sayings = e.currentTarget.value
            setUserPost({ ...userPost, wise_sayings })
          }}
          placeholder="남기고자 하는 명언을 입력해주세요. ex) 해내지 못할 것을 걱정할게 아니라 시도조차 하지 않으려는 자신을 걱정해라."
        ></textarea>
      </article>
      <br />
      {/* 작성자(닉네임) */}
      <article className="px-[2em]">
        <label htmlFor="content" className="block font-bold">
          작성자
        </label>
        <input
          onInput={(e) => {
            const author = e.currentTarget.value
            setUserPost({ ...userPost, author })
          }}
          type="text"
          className="min-w-[200px] w-[500px]  px-[10px] min-h-[40px]"
          placeholder="명언의 작성자로 표기할 이름을 입력해주세요 ex) 지나가는 고양이"
        />
      </article>
      <br />
      {/* 전송버튼 */}
      <article className="p-[2em]">
        <button
          className=" bg-[#ffffff] p-[10px] mr-[1em] font-bold"
          onClick={postUserPost}
        >
          등록하기
        </button>
        <button
          onClick={() => {
            router.push('/')
          }}
          className="bg-[#ffffff] p-[10px] font-bold"
        >
          취소
        </button>
      </article>
    </form>
  )
}
