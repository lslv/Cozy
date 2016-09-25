import React, { Component } from 'react'
import { Router, browserHistory, Link } from 'react-router'
import axios from 'axios'

export default class Login extends Component {
	constructor (props) {
		super (props)

		this.state = { username: '', password: ''}
	}

	render () {
		return (
      <form>
        <input
          value={this.state.username}
          placeholder="Username"
          required
          onChange={event => this.onUsernameChange(event.target.value)} />
        <input
          value={this.state.password}
          placeholder="Password"
          required
          type="password"
          onChange={event => this.onPasswordChange(event.target.value)} />

        <input
          onClick={event => this.onLogin()}
          value="Login"
          type="submit"
        />
      </form>
    )
	}

	onUsernameChange(username){
		this.setState({username})
	}

	onPasswordChange(password){
		this.setState({password})
	}

	onLogin(){
		axios.post('/api/users/login',{
			username: this.state.username,
			password: this.state.password
		})
    .then((response) => {
	console.log(response)
      //this should be a token in the future
	sessionStorage.setItem('username', response.data.user_name)
	sessionStorage.setItem('id', response.data.id)
	this.context.router.push('/house_select')
	console.log(sessionStorage.getItem('user'))
})
    .catch((error) => {
	console.error(error)
})
	}
}

Login.contextTypes = {
	router: React.PropTypes.object
}
