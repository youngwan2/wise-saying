'use client'
import { useRouter } from 'next/navigation'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { useEffect, useRef, useState } from 'react'
import { useUserPostIdStore } from '@/store/store'
import useHasToken from '@/custom/useHasToken'
import { logoutUser } from '@/utils/commonFunctions'

type PostType = {
  id: number
  category: string
  wise_sayings: string
  author: string
  email: string
}

export default function UpdateForm() {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const hasToken = useHasToken()

  const [post, setPost] = useState<PostType>()

  const postId = useUserPostIdStore((state) => state.postId)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // 사용자가 작성한 명언 등록 PUT
  const updateUserPost = () => {
    if (!hasToken) {
      alert('로그인 해주세요')
      router.push('/login')
    }

    const accessToken = localStorage.getItem('token')
    const headers = {
      authorization: `Bearer ${accessToken}`,
    }
    fetch(`http://localhost:3000/api/items/users/${postId}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(post),
    })
      .then(async (response) => {
        const { status, success } = await response.json()
        if (success === true) {
          alert('정상적으로 등록되었습니다.')
          router.push('/user-quotes')
          setTimeout(() => {
            location.reload()
          }, 1000)
        }
        if (success === false) {
          alert(
            '최대 로그인 가능 시간이 초과하였습니다. 로그인을 다시 시도해 주세요',
          )
          logoutUser()
        }
      })
      .catch((error) => {
        setError('데이터 요청에 실패하였습니다. 나중에 다시 시도해주세요/')
        console.error(error)
      })
  }

  // 유저가 작성한 단일 포스트 요청 GET
  const getUserPostBy = async (postId: number) => {
    setLoading(true)
    try {
      const response = await fetch(
        `http://localhost:3000/api/items/users/post?postid=${postId}`,
      )
      const { item, status, meg } = await response.json()
      if (status === 200) {
        setPost(item)
      }
      if (status !== 200) {
        alert(meg)
      }
      setLoading(false)
    } catch (error) {
      setError('데이터 요청에 실패하였습니다. 나중에 다시 시도해주세요.')
      setLoading(false)
    }
  }

  // UI 드래그 이벤트 등록 GSAP
  useEffect(() => {
    let clear: number | NodeJS.Timeout
    if (formRef.current) {
      gsap.registerPlugin(Draggable)
      clear = setTimeout(() => {
        Draggable.create(formRef.current, {
          bounds: document.querySelector('body'),
          dragClickables: false,
        })
      }, 2000)
    }
    return () => {
      clearTimeout(clear)
    }
  }, [])

  useEffect(() => {
    getUserPostBy(postId)
  }, [postId])

  if (loading)
    return (
      <h2 className="fixed left-[50%] top-[40%] translate-x-[-50%] translate-y-[-50%] text-[1.5em] p-[15px] rounded-[10px] shadow-[2px_2px_5px_0_rgba(0,0,0,0.5)]">
        데이터를 불러오는 중입니다...
      </h2>
    )
  if (error.length > 2)
    return (
      <h2 className="fixed left-[50%] top-[40%] translate-x-[-50%] translate-y-[-50%] text-[1.5em] p-[15px] rounded-[10px] shadow-[2px_2px_5px_0_rgba(0,0,0,0.5)]">
        {error}
      </h2>
    )
  if (!post)
    return (
      <h2 className="fixed left-[50%] top-[40%] translate-x-[-50%] translate-y-[-50%] text-[1.5em] p-[15px] rounded-[10px] shadow-[2px_2px_5px_0_rgba(0,0,0,0.5)]">
        포스트가 존재하지 않습니다...
      </h2>
    )
  return (
    <>
      <div className="bg-[#0000005c] fixed left-0 top-0 right-0 bottom-0 rounded-[10px]"></div>
      <form
        ref={formRef}
        className="max-w-[560px]  bg-[#fc7e54]  rounded-[10px] shadow-[inset_-2px_-2px_5px_0_rgba(0,0,0,0.5)] fixed left-[50%] top-[40%] translate-x-[-50%] translate-y-[-50%] "
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        {/* 주제(카테고리) */}
        <h2 className="text-[1.5em] mb-[1em] font-bold bg-[#333232] text-[white] p-[8px]  rounded-t-lg">
          명언 수정
        </h2>
        <article className="px-[2em]">
          <label htmlFor="subject" className="block font-bold">
            주제
          </label>
          <input
            onInput={(e) => {
              const category = e.currentTarget.value
              setPost({ ...post, category })
            }}
            type="text"
            className="min-w-[200px] w-[500px] min-h-[40px] px-[10px]"
            placeholder={'기존내용) ' + post.category || '없음'}
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
              setPost({ ...post, wise_sayings })
            }}
            placeholder={'기존내용) ' + post.wise_sayings || '없음'}
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
              setPost({ ...post, author })
            }}
            type="text"
            className="min-w-[200px] w-[500px]  px-[10px] min-h-[40px]"
            placeholder={'기존내용) ' + post.author}
          />
        </article>
        <br />
        {/* 전송버튼 */}
        <article className="p-[2em]">
          <button
            className=" bg-[#ffffff] p-[10px] mr-[1em] font-bold"
            onClick={updateUserPost}
          >
            등록하기
          </button>
          <button
            onClick={() => {
              router.push('/user-quotes')
            }}
            className="bg-[#ffffff] p-[10px] font-bold"
          >
            취소
          </button>
        </article>
      </form>
    </>
  )
}
