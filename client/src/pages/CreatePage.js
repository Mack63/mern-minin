import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHTTP } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { useHistory } from 'react-router'

const CreatePage = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)
  const mess = useMessage()
  const [link, setLink] = useState('')
  const { request, error, clearError } = useHTTP()

  useEffect(() => {
    mess(error)
    clearError()
  }, [error, mess, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])
  const pressHandler = async (event) => {
    if (event.key === 'Enter') {
      try {
        const data = await request(
          '/api/link/generate',
          'POST',
          { from: link },
          { authorization: `Bearer ${auth.token}` }
        )
        mess(data.message)
        history.push(`/detail/${data.link._id}`)
        console.log(data)
      } catch (error) {}
    }
  }

  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{ paddingTop: '2rem' }}>
        <div className="input-field">
          <input
            placeholder="Place link"
            id="link"
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            onKeyPress={pressHandler}
          />
          <label htmlFor="link">Enter link</label>
        </div>
      </div>
    </div>
  )
}

export default CreatePage
