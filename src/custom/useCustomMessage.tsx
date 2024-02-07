import { useEffect, useState } from 'react'

export default function useCustomMessage(message: string) {
  const [display, setDisplay] = useState(false)

  useEffect(() => {
    let timerId: NodeJS.Timeout
    setDisplay(true)
    if (display) {
      const span = document.createElement('span')
      span.textContent = message
      document.body.appendChild(span)
      span.style.cssText = `
                transition:1s ;
                display:inline-block;
                position: fixed;
                top:3em;
                z-index:1000000;
                left:50%;
                visibility: visible;
                opacity: 100;
                transform:tranlate(-50%);
                padding: 5px 15px;
                font-size: 1.15em;
                background: white;
                box-shadow : inset -2px -2px 5px 0 rgba(0,0,0,0.5);
                color: white;
                `

      timerId = setTimeout(() => {
        span.style.cssText = `
                visibility: hidden;
                opacity: 0;
                `
        setDisplay(false)
        document.body.removeChild(span)
      }, 2000)
    }

    return () => {
      clearTimeout(timerId)
      setDisplay(false)
    }
  }, [display, message])
}
