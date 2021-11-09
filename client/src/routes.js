import React from 'react'
import { Switch, Redirect, Route } from 'react-router'
import { LinksPage } from './pages/LinksPage'
import CreatePage from './pages/CreatePage'
import DetailPage from './pages/DetailPage'
import { AuthPage } from './pages/AuthPage'

const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/links" exact>
          <LinksPage />
        </Route>
        <Route path="/create" exact>
          <CreatePage />
        </Route>
        <Route path="/detail/:id">
          <DetailPage />
        </Route>
        <Redirect to="/create" />
      </Switch>
    )
  }
  return (
    <Switch>
      <Route path="/">
        <AuthPage />
      </Route>

      <Redirect to="/" />
    </Switch>
  )
}

export default useRoutes
