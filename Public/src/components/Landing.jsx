import React, { Component } from 'react'
import { Link } from 'react-router'

export default class Landing extends Component {
  render () {
    return (
      <div>
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
