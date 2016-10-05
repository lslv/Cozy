import React, { Component } from 'react'
import { Link } from 'react-router'

export default class Dashboard extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    //here check if the user logged in via FB auth
        //if so, save data to session storage 
      const { query } = this.props.location
      console.log('url', this.props.location.query)
      sessionStorage.setItem('id', query.id)
      sessionStorage.setItem('username', query.user_name)
      sessionStorage.setItem('pay_percentage', query.pay_percentage)
      sessionStorage.setItem('admin', query.admin)
      sessionStorage.setItem('house_id', query.house_id)
      sessionStorage.setItem('fb_pic', query.fb_picture)

  }


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
        <br />
        <button>
          <Link to='/calendar'> Go to the Calendar
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
