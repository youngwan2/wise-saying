
import { ChangeEvent, useEffect, useRef } from 'react'

import Input from '../common/Input'
import Label from '../common/Label'

import { onSubmit } from '@/utils/common-func'

interface PropsType {
  setSort: (value: string) => void
}
export default function CommentSortSelect({ setSort }: PropsType) {
  const inputRef = useRef<HTMLInputElement>(null)
  function onChangeSort(e: ChangeEvent<HTMLInputElement>) {
    const value = e.currentTarget.value
    setSort(value)
    e.currentTarget.checked = true
  }

  useEffect(() => {
    if (inputRef.current) inputRef.current.checked = true
  }, [])

  return (
    <form
      className="sm:text-[15px] text-[14.5px]  flex mt-[2em] justify-end"
      onSubmit={onSubmit}
    >
      <div className="mx-[5px]">
        <Input
          id="recent"
          type="radio"
          value="DESC"
          name="sort"
          onChange={onChangeSort}
          ref={inputRef} />
        <Label className="text-white mx-[5px]" htmlFor="recent">최근 순</Label>
      </div>
      <div className="mx-[5px]">
        <Input
          id="old"
          type="radio"
          value="ASC"
          name="sort"
          onChange={onChangeSort} />
        <Label className="text-white mx-[5px]" htmlFor="old">오래된순</Label>
      </div>
    </form>
  )
}
