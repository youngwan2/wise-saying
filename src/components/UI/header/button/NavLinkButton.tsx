import React, { MouseEventHandler } from "react"
import { IconType } from "react-icons"

interface PropsType {
    onClick: MouseEventHandler<HTMLButtonElement>
    icon: IconType
    label: string
    path: string
    matchPath: (path: string) => boolean
  }

  const CSS_AFTER = `after:content-["현재"] after:bg-[tomato] after:text-white after:rounded-[10px] after:p-[3px] after:absolute after:top-[50%] after:translate-y-[-50%] after:right-[10px] `

  export default function NavLinkButton({ onClick, icon, label, path, matchPath }: PropsType) {
  
    const isMatch = matchPath(path) // 현재 경로와 요청 경로가 서로 일치하는가
    return (
      <button
        aria-label={label}
        onClick={onClick}
        // memo : 경로가 일치하면 메뉴 옆에 (현재) 를 표시
        className={`
        ${isMatch ? CSS_AFTER + 'a border-l-[0.5em] border-[tomato] text-[tomato]' : ''}
        lg:text-[0.75em] first:mt-[6em] text-[0.7em]  hover:bg-[#f2f1f1] py-[12px] min-w-[200px] w-full  hover:text-[tomato] transition-all  px-[5px] font-bold text-[#1f1e1ee4]  hover:cursor-pointer `}
      >
        <span className="text-[1.25em] flex items-center ">
          {icon &&
            React.createElement(icon, {
              color: 'tomato',
              className: 'max-w-[50px] w-full h-[25px] mb-[0.5em]',
            })}
          {label}
        </span>
      </button>
    )
  }
  