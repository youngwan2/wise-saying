'use client'
import { useEffect, useState } from 'react'

export default function useHasToken() {
  const [validToken, setValidToken] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      setValidToken(true)
    }

    if (!sessionStorage.getItem('token')) {
      setValidToken(false)
    }
  }, [])

  return validToken
}
