import React, { Component } from 'react'

export default class Logout extends Component {
	constructor (props) {
		super(props)

	}

	render () {
		return (
      <button
        onClick={event => {
	sessionStorage.clear()
	this.context.router.push('/')
}}>logout</button>
    )
	}
}

Logout.contextTypes = {
	router: React.PropTypes.object
}
