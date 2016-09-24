import React, { Component } from 'react'
import axios from 'axios'

export default class Login extends Component{
	constructor (props) {
		super(props)

		this.state = { username: '', password: ''}
	}

	render () {
		return (
      <div>
        <input
          value={this.state.username}
          placeholder="Username"
          onChange={event => this.onUsernameChange(event.target.value)} />
        <input
          value={this.state.password}
          placeholder="Password"
          type="password"
          onChange={event => this.onPasswordChange(event.target.value)} />
        <button
          onClick={event => this.onLogin()}
        >login</button>
      </div>
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
    .then((response)=>{
	console.log(response)
      //this should be a token in the future
	sessionStorage.setItem('username', response.data.user_name)
	sessionStorage.setItem('id', response.data.id)
	console.log(sessionStorage.getItem('user'))
})
    .catch((error)=>{
	console.log(error)
})
	}
}
