import React, { Component } from 'react'
import { Router, Route, hashHistory } from 'react-router'
import Landing from './Landing'
import BulletinBoard from '../containers/BulletinBoard'
import Dashboard from './Dashboard'
import ChoreList from '../containers/ChoreList'
import Signup from './Signup'
import Login from './Login'
import Logout from './Logout'
import ChatContainer from '../containers/ChatContainer'
import HouseSelect from './HouseSelect'
import CreateHouse from './CreateHouse'
import JoinHouse from './JoinHouse'
import Profile from './Profile'

export default class App extends Component {
  render () {
    return (
      // Set up routes
      <Router history={hashHistory}>
        <Route path='/' component={Landing} />
        <Route path='/bulletin_board' component={BulletinBoard} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/chorelist' component={ChoreList} />
        <Route path='/signup' component={Signup} />
        <Route path='/login' component={Login} />
        <Route path='/logout' component={Logout} />
        <Route path='/profile' component={Profile} />
        <Route path='/chat' component={ChatContainer} />
      </Router>
    )
	}
}
