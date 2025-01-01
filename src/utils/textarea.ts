import { KeyboardEvent, RefObject } from 'react'

export function textareaAutoResize(e: KeyboardEvent<HTMLTextAreaElement | null>) {
  const target = e.currentTarget

  target.style.height = 'auto'
  target.style.cssText = `
        transition:1s;
        height:${target.scrollHeight}px
      `
}

export function clearTextarea(textareaRef: RefObject<HTMLTextAreaElement | null>) {
  if (textareaRef.current) {
    textareaRef.current.value = ''
  }
}
