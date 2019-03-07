import React, { Component } from 'react'
import LoginPage from './components/LoginPage/LoginPage'
import Register from './components/Register/register'
import Dashboard from './components/Dashboard/dashboard'
import { Route, Switch, Redirect } from 'react-router-dom'
import { getJwt } from './helpers/jwt'
import eventsPage from './components/subComponents/eventsPage'


class App extends Component {

  render() {
    const jwt = getJwt()
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Register} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/dashboard" render={() => (
            jwt ? ( <Dashboard /> ) : (<Redirect to="/" />)
          )} />
          <Route exact component={Register} />
        </Switch>
      </div>
    );
  }
}

export default App;
