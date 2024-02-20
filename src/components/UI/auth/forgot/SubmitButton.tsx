import React from 'react'

export default function SubmitButton({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <button
      type="submit"
      className="w-full bg-[tomato] text-white font-bold p-[0.7em] mt-[1em] rounded-[5px] focus:outline-none focus:bg-blue-700 hover:bg-gradient-to-br from-[tomato] to-[#f54d2f]  transition-all"
    >
      {children}
    </button>
  )
}
