import React, { Component } from 'react'
import { Router, Route, hashHistory } from 'react-router'
import Landing from './Landing'
import BulletinBoard from './BulletinBoard'
import Dashboard from './Dashboard'

export default class App extends Component {
  render () {
    return (
      // Set up routes
      <Router history={hashHistory}>
        <Route path='/' component={Landing} />
        <Route path='/bulletin_board' component={BulletinBoard} />
        <Route path='/dashboard' component={Dashboard} />
      </Router>
    )
  }
}
