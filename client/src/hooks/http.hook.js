import { useState, useCallback } from 'react'
export const useHTTP = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const request = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      setLoading(true)
      try {
        if (body) {
          body = JSON.stringify(body)
          headers['Content-Type'] = 'application/json'
        }
        const resp = await fetch(url, { method, body, headers })
        let data = await resp.json()
        if (!resp.ok) {
          throw new Error(data.message || 'Ошибка получения данных')
        }
        setLoading(false)
        return data
      } catch (e) {
        setLoading(false)
        setError(e.message)
        throw e
      }
    },
    []
  )
  const clearError = useCallback(() => setError(null), [])

  return { loading, request, error, clearError }
}
