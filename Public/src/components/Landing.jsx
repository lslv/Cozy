import React, { Component } from 'react'
import { Link } from 'react-router'
import Navbar from './Navbar'


export default class Landing extends Component {
  render () {
    return (
      <div>
       <Navbar />
        <button>
          <Link to='/logout'>Logout</Link>
        </button>
        <br />
        <button>
          <Link to='/dashboard'> Go to the dashboard
          </Link>
        </button>


      </div>
    )
  }
}
