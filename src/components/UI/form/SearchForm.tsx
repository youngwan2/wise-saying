'use client'

import { onSubmit } from '@/utils/commonFunctions'
import { HiOutlineSearch } from 'react-icons/hi'

export default function SearchForm() {
  return (
    <form
      className="rounded-[10px] my-[2em] border-2 max-w-[500px] min-w-[200px] mx-auto "
      onSubmit={onSubmit}
    >
      <article className="flex items-center">
        <label
          className="text-4xl p-[5px] min-w-[50px] bg-[#E76F51]"
          htmlFor="search"
        >
          <HiOutlineSearch />
        </label>
        <input
          className="p-[10px] w-[100%]"
          type="search"
          id="search"
          placeholder="키워드를 입력해주세요(인물 이름, 명언 키워드 등)"
        />
      </article>
    </form>
  )
}
