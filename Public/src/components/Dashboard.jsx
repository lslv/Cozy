import React, { Component } from 'react'
import { Link } from 'react-router'

export default class Dashboard extends Component {
  render () {
    return (
      <div>
        <p>
          In the dashboard
        </p>
        <button>
          <Link to='/bulletin_board'> Go to the bulletin board
          </Link>
        </button>
        <br />
        <button>
          <Link to='/chorelist'> Go to the chore list board
          </Link>
        </button>
        <button>
          <Link to='/chat'> Go to the chat room
          </Link>
        </button>
      </div>
    )
  }
}
