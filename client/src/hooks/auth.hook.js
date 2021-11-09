import { useState, useCallback, useEffect } from 'react'

const userSt = 'userData'
export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState(null)
  const [ready, setReady] = useState(false)

  const login = useCallback((jwtToken, id) => {
    setToken(jwtToken)
    setUserId(id)
    localStorage.setItem(
      userSt,
      JSON.stringify({ token: jwtToken, userId: id })
    )
  }, [])
  const logout = useCallback((jwtToken, id) => {
    setToken(null)
    setUserId(null)
    localStorage.removeItem(userSt)
  }, [])
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(userSt))
    if (data && data.token) {
      login(data.token, data.userId)
    }
    setReady(true)
  }, [login])
  return { login, logout, token, userId, ready }
}
