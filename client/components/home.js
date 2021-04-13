import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Header from './header'
import Dashboard from './dashboard'
import Main from './main'
import Profile from './profile'
import NotFound from './404'

const Home = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/dashboard" component={() => <Dashboard />} />
        <Route exact path="/dashboard/main" component={() => <Main />} />
        <Route exact path="/dashboard/profile/:user" component={() => <Profile />} />
        <Route component={() => <NotFound />} />
      </Switch>
    </div>
  )
}

Home.propTypes = {}

export default React.memo(Home)
