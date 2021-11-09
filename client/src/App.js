import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import useRoutes from './routes'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'
import NavBar from './components/NavBar'
import 'materialize-css'
import Loader from './components/Loader'

function App() {
  const { login, logout, token, userId, ready } = useAuth()
  const isAuthed = !!token
  const routes = useRoutes(isAuthed)

  if (!ready) {
    <Loader />
  }
  return (
    <AuthContext.Provider value={{ login, logout, token, userId, isAuthed }}>
      <BrowserRouter>
        {isAuthed && <NavBar />}
        <div className="container">{routes}</div>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App
