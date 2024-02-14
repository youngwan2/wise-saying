'use client'
import { useRouter } from 'next/navigation'
import useHasToken from '@/custom/useHasToken'
import { postUserPost } from '@/services/user/post'
import useDraggable from '@/custom/useDraggable'
import { useRef } from 'react'
import ReplaceMessageCard from '../common/ReplaceMessageCard'

export default function AddPostForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const hasToken = useHasToken()

  // UI 드래그 이벤트 등록
  useDraggable(formRef, null)

  const router = useRouter()

  // 포스트 요청
  const addPost = async (form: FormData) => {
    const category = form.get('category') || ''
    const content = form.get('content') || ''
    const author = form.get('author') || ''

    const body = {
      category,
      content,
      author,
      isUser: true,
    }
    postUserPost(router, hasToken, body)
  }

  if (!hasToken)
    return <ReplaceMessageCard childern="로그인 후 이용해주세요." />
  return (
    <form
      ref={formRef}
      action={addPost}
      className="max-w-[560px] mx-auto bg-[#ff8957]  mt-[2em] rounded-[10px] shadow-[inset_-2px_-2px_5px_rgba(0,0,0,0.5)]"
    >
      {/* 주제(카테고리) */}
      <h2 className="text-[1.5em] mt-[-4px] mb-[1em] font-bold bg-[#333232] text-[white] p-[8px]  rounded-t-lg shadow-[inset_-2px_0px_5px_rgba(0,0,0,0.5)] ">
        명언 등록
      </h2>
      <article className="px-[2em]">
        <label htmlFor="category" className="block font-bold">
          주제
        </label>
        <input
          id="category"
          type="text"
          name="category"
          maxLength={3}
          minLength={0}
          className="min-w-[200px] w-full max-w-[500px] min-h-[40px] px-[10px] rounded-[5px] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.5)]"
          placeholder="2자 이상 3자 이하의 명언의 주제 ex) 사랑"
        />
      </article>
      <br />
      {/* 내용 */}
      <article className="px-[2em]">
        <label htmlFor="content" className="block font-bold">
          내용
        </label>
        <textarea
          id="content"
          name="content"
          className="min-w-[200px] w-full max-w-[500px] p-[10px] min-h-[150px] rounded-[5px] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.5)]"
          placeholder="최소 3자 이상 ex) 해내지 못할 것을 걱정할게 아니라 시도조차 하지 않으려는 자신을 걱정해라."
        ></textarea>
      </article>
      <br />
      {/* 작성자(닉네임) */}
      <article className="px-[2em]">
        <label htmlFor="author" className="block font-bold">
          작성자
        </label>
        <input
          id="author"
          type="text"
          name="author"
          maxLength={8}
          minLength={2}
          className="min-w-[200px] w-full max-w-[500px]  px-[10px] min-h-[40px] rounded-[5px] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.5)]"
          placeholder="최소 2자 이상 8자 이하 ex) 지나가는 고양이"
        />
      </article>
      <br />
      {/* 버튼 */}
      <article className="p-[2em]">
        <button className="bg-[#ffffff] p-[10px] mr-[1em] font-bold hover:bg-[#162557] hover:text-white rounded-[5px]">
          등록하기
        </button>
        <button
          type="reset"
          onClick={() => {
            router.push('/')
          }}
          className="bg-[#ffffff] p-[10px] font-bold hover:bg-[#162557] hover:text-white rounded-[5px]"
        >
          취소
        </button>
      </article>
    </form>
  )
}