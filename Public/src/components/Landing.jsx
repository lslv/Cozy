import React, { Component } from 'react'
import { Link } from 'react-router'
import Login from './login'

export default class Landing extends Component {
  render () {
    return (
      <div>
        <div>
          <Login />
        </div>
        <p>
          In the landing page
        </p>
        <button>
          <Link to='/dashboard'> Go to the dashboard
          </Link>
        </button>
      </div>
    )
  }
}
