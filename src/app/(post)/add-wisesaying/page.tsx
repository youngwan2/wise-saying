import PostForm from '@/components/UI/form/PostForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '명언 등록 | My wise saying',
  description: '사용자가 명언을 등록하는 화면을 표시하는 페이지 입니다.',
}

export default function AddWisesayingPage() {
  return (
    <section className="z-[1000] fixed left-0 right-0 top-0 bottom-0 bg-[#00000065] ">
      <PostForm />
    </section>
  )
}
