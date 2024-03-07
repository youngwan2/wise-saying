'use client'
import { useCallback, useEffect, useState } from 'react'



const MIN_ERROR_MARGIN = 7

/**
 * TTS API 를 호출하는 커스텀 훅
 * @example
 * const [setText] = useTTL();
 * <button onClick={()=> setText('듣기할 텍스트를 전달하면 됩니다.')}>
 * 
 * @returns 해당 훅은  { text, setText, readText, progress, isPlaying } 을 반환합니다.
 * * text : 전달받은 텍스트
 * * setText : 음성합성에 사용할 텍스트는 전달하는 상태 업데이트 메서드
 * * readText : 음성합성을 통해 재생되고 있는 텍스트(재생에 따라 텍스트를 렌더링하고자 할 때 사용)
 * * progress : 음성 재생 진행률을 나타냅니다.(0~100% 까지 증가)
 * * isPlaying : 현재 음성을 재생하고 있는지를 boolean 으로 표시
 */
export default function useTTS() {
  const [text, setText] = useState('')
  const [readText, setReadText] = useState('')
  const [progress, setProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const speakText = useCallback((text: string) => {
    const synth = window.speechSynthesis
    if (synth !== null && text.length > 1) {
      const utterance = new SpeechSynthesisUtterance(text)
      const readString = utterance.text

      synth.speak(utterance)

      utterance.onstart = () => setIsPlaying(true)
      utterance.onend = () => setIsPlaying(false)

      utterance.onboundary = (event) => {
        const charIndex = event.charIndex
        const readingQuote = readString.slice(0, charIndex + 5)
        const progress = Math.min(Number(((charIndex + MIN_ERROR_MARGIN) / text.length * 100).toFixed(0)), 100)
        setProgress(progress)
        setReadText(readingQuote)
      }
      setText('')
    }
  }, [])

  useEffect(() => {
    if (window['speechSynthesis'] === undefined) return
    speakText(text)

  }, [text, speakText, readText])

  return { text, setText, readText, progress, isPlaying }
}
