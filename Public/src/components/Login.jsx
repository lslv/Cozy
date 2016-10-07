import React, { Component } from 'react'
import { Router, browserHistory, Link } from 'react-router'
import { Modal } from 'react-bootstrap'
import axios from 'axios'
import Navbar from './Navbar'

export default class Login extends Component {
	constructor (props) {
		super (props)

		this.state = { username: '', password: ''}

		this.onLogin = this.onLogin.bind(this)
	}

	render () {
		return (
		<div>
		  <Navbar />
	   <Modal.Dialog className='login-component'>
		  <Modal.Header>
        <Modal.Title className='login-title'>Login</Modal.Title>
      </Modal.Header>
		  <Modal.Body>
	      <form onSubmit={this.onLogin} className='login-form'>
	        <input
	          value={this.state.username}
	          placeholder="Username"
	          className='form-control'
	          required
	          onChange={event => this.onUsernameChange(event.target.value)} />
	        <input
	          value={this.state.password}
	          className='form-control'
	          placeholder="Password"
	          required
	          type="password"
	          onChange={event => this.onPasswordChange(event.target.value)} />
	       <div className='btn-group'>
	        <button className='btn btn-info'>
	        Login
	        </button>
	         <a
	          href='/api/users/login/facebook'
	          className='btn btn-primary'
	          ><span className='fa fa-facebook'></span> Facebook Login</a>
	        </div>
	      </form>
	      </Modal.Body>
	      </Modal.Dialog>
	    </div>
    )
	}

	onUsernameChange(username){
		this.setState({username})
	}

	onPasswordChange(password){
		this.setState({password})
	}

	onLogin(e){
		e.preventDefault()
		axios.post('/api/users/login',{
			username: this.state.username,
			password: this.state.password
		})
    .then((response) => {
	console.log(response.data)
      //this should be a token in the future
	sessionStorage.setItem('username', response.data.user_name)
	sessionStorage.setItem('id', response.data.id)
	sessionStorage.setItem('pay_percentage', response.data.pay_percentage)
	sessionStorage.setItem('admin', response.data.admin)
	if(response.data.house_id){
		sessionStorage.setItem('house_id', response.data.house_id)
		this.context.router.push('/dashboard')
	}else{
		this.context.router.push('/house_select')
	}
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
