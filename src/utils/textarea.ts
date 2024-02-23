import { KeyboardEvent, RefObject } from 'react'

export function TextareaAutoResize(e: KeyboardEvent<HTMLTextAreaElement>) {
  const target = e.currentTarget

  target.style.height = 'auto'
  target.style.cssText = `
        transition:1s;
        height:${target.scrollHeight}px
      `
}

export function clearTextarea(textareaRef: RefObject<HTMLTextAreaElement>) {
  if (textareaRef.current) {
    textareaRef.current.value = ''
  }
}
