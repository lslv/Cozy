import React, { Component } from 'react'

export default class Logout extends Component {
	constructor (props) {
		super(props)

	}

	render () {
		return (
      <button
        onClick={event => {
	sessionStorage.removeItem('user')
	sessionStorage.removeItem('id')
}
      }
      >logout</button>
    )
	}
}
