import Link from 'next/link'
 
export default function NotFound() {
  return (
    <article className=' text-center animate-bounce-y-2 pl-[10px] max-w-[500px] w-full fixed left-[50%] top-[30%] translate-x-[-50%] translate-y-[-50%] bg-white shadow-[inset_-2px_-2px_5px_0_rgba(0,0,0,0.8)] p-[15px] rounded-[10px]'>
      <h2 className='text-[tomato] text-[2em]'>Not Found(404)</h2>
      <p className='text-[black] mt-[0.5em] mb-[1.3em] text-[1.25em]'>요청한 자료(경로)를 찾을 수 없습니다.</p>
      <Link href="/" className='bg-[#162557] px-[10px] p-[5px] mt-[1em] text-white hover:bg-[tomato] hover:text-[white] rounded-[5px]'>홈(Hone)으로</Link>
    </article>
  )
}