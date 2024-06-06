import Label from '../common/Label'
import Input from '../common/Input'


import Container from '../common/container/Container'

import { PostType } from './QuoteEditForm'

interface PropsType {
  post?: PostType
  name: string
  placeholder?: string
}

export default function QuoteAuthorInput({
  post,
  name,
  placeholder,
}: PropsType) {


  const author = post?.author

  return (
    <Container className='px-[2em]' elementName='div'>
      <Label htmlFor='content' className='block pb-[7px] pl-[2px]'>작성자</Label>
      <Input
        autoComplete='on'
        name={name}
        placeholder={placeholder}
        type='text'
        maxLength={8}
        minLength={2}
        defaultValue={author}
        className='hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)] min-w-[200px] bg-transparent max-w-[500px] w-full px-[10px] min-h-[40px] rounded-[5px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] outline-none focus:bg-[#ffffff0e]'
      />
    </Container>
  )
}
