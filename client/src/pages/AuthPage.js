import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { useHTTP } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/AuthContext'

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const mess = useMessage()
  const { loading, request, error, clearError } = useHTTP()
  const [form, setForm] = useState({ email: '', password: '' })

  useEffect(() => {
    mess(error)
    clearError()
  }, [error, mess, clearError])
  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const registrationHandler = async () => {
    try {
      const data = await request('/api/auth/registration', 'POST', { ...form })
      mess(data.message)
    } catch (e) {}
  }
  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form })
      auth.login(data.token, data.userId)
      mess(data.message)
    } catch (e) {}
  }

  return (
    <div className="row">
      <div className="col s12 m6">
        <h1>Сократи ссылку</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Authorization</span>
            <div>
              <div className="input-field">
                <input
                  placeholder="Enter email"
                  id="email"
                  type="text"
                  name="email"
                  value={form.email}
                  onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="input-field">
                <input
                  placeholder="Enter password"
                  id="password"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={changeHandler}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              onClick={loginHandler}
              disabled={loading}
              className="btn yellow darken-4"
              style={{ marginRight: 10 }}
            >
              Enter
            </button>
            <button
              onClick={registrationHandler}
              disabled={loading}
              className="btn grey lighten-1 black-text"
            >
              Registration
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
