import { HiOutlineSearch } from 'react-icons/hi'
import Label from '../common/Label'
import Input from '../common/Input'

export default function SearchInput() {
  return (
    <div className="flex items-center">
      <Label
        className=" text-[20px] p-[5px] py-[10px] min-w-[30px] m-[0] rounded-l-[5px] shadow-[2px_0_5px_0_rgba(0,0,0,0.3)] z-[10] "
        htmlFor="search"
      >
        <HiOutlineSearch color="white" />
      </Label>
      <Input
        className="p-[5px] py-[10px] w-[100%] rounded-[5px] shadow-[inset_-2px_2px_5px_0_rgba(0,0,0,0.5)]"
        type="search"
        id="search"
        name="search"
        placeholder="키워드를 입력해주세요(인물 이름, 명언 키워드 등)"
      />
    </div>
  )
}
