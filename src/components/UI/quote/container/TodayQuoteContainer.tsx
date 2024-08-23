'use client'

import { Fragment } from 'react'

import Container from '../../common/container/Container'
import TodayQuoteList from '../list/TodayQuoteList'

import TextPlugin from 'gsap/TextPlugin'

import { HiCalendarDays } from 'react-icons/hi2'

import gsap from 'gsap'
import { toast } from 'react-toastify'
import Title from '../../common/Title/Title'


gsap.registerPlugin(TextPlugin)

export interface PropsType {
  quotes: {
    quote_id: number
    author: string
    quote: string
    job: string
    birth: string
    intro: string
  }[]
  onClick?: () => void
}

export default function TodayQuoteContainer({ quotes = [], onClick }: PropsType) {

  return (
    <Container elementName={Fragment}>
      <h2  data-testid="today-quote" className="sm:text-[1.45em] text-[1.35em] pl-[8px] flex items-center text-white max-w-[600px] mx-auto  mt-[5em] ">
        <HiCalendarDays className="mr-[5px]" /> 오늘의 명언
      </h2>
      <TodayQuoteList items={quotes} onClick={onClick ?? onClickGetCommentationInfo} />
    </Container>
  )
}

/** AI 명언 해석 요청 */
const onClickGetCommentationInfo = async (quoteId: number, isUser: boolean = false) => {
  const response = await toast.promise(fetchData(quoteId, isUser), {
    pending: '데이터를 요청 중입니다.',
    success: '성공적으로 불러왔습니다.',
    error: '데이터 요청에 실패하였습니다.'
  })
  const { success, commentationInfo, meg } = response

  if (success) {
    const { commentation } = commentationInfo
    toast.info(commentation, {
      autoClose: false,
      position: 'top-center'
    })
  } else {
    toast.error(meg)
  }
}


/** POST |  명언 해석 정보 생성 요청 */
export async function fetchData(quoteId: number, isUser: boolean = false) {
  const url = `/api/quotes/ai/commentation`
  const configs = {
    method: 'POST',
    body: JSON.stringify({ quoteId, isUser })
  }
  try {
    const response = await fetch(url, configs)
    if (!response.ok) return '명언 해석 정보를 가져오지 못했습니다.'

    return await response.json()

  } catch (error) {
    console.error(error)
    return '명언 해석 정보를 가져오지 못했습니다.'
  }
}
