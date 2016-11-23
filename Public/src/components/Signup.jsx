import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import axios from 'axios'

import Navbar from '../components/Navbar'

export default class Signup extends Component{
	constructor(props){
		super(props)

		this.state = {
			Firstname: '',
			Lastname: '',
			Username: '',
			Email: '',
			Password: ''
		}
		this.onSignup = this.onSignup.bind(this)
		this.onFirstnameChange = this.onFirstnameChange.bind(this)
		this.onLastnameChange = this.onLastnameChange.bind(this)
		this.onUsernameChange = this.onUsernameChange.bind(this)
		this.onEmailChange = this.onEmailChange.bind(this)
		this.onPasswordChange = this.onPasswordChange.bind(this)
	}
	render () {
		return (
	<div>
	  <Navbar />
      <Modal.Dialog className='signup-component'>
		  <Modal.Header>
        <Modal.Title className='signup-title'>Sign Up</Modal.Title>
      </Modal.Header>
		<Modal.Body>
	      <form className='signup-form' onSubmit={this.onSignup}>
        	<input
				value={this.state.Firstname}
				placeholder="First name"
				required
				className='form-control'
				onChange={event => this.onFirstnameChange(event.target.value)}
     		/>
        	<input
				value={this.state.Lastname}
				placeholder="Last name"
				className='form-control'
				required
				onChange={event => this.onLastnameChange(event.target.value)}
        	/>
        	<input
				value={this.state.Username}
				placeholder="User name"
				className='form-control'
				required
				onChange={event => this.onUsernameChange(event.target.value)}
        	/>
        	<input
				value={this.state.Email}
				placeholder="Email"
				type="email"
				className='form-control'
				required
				onChange={event => this.onEmailChange(event.target.value)}
        	/>
        	<input
				value={this.state.Password}
				placeholder="Password"
				className='form-control'
				required
				type="password"
				onChange={event => this.onPasswordChange(event.target.value)}
       		 />
	        <button type='submit' className='btn btn-info'>
	        Submit
	        </button>
      	  </form>
	    </Modal.Body>
	    </Modal.Dialog>
     </div>
    )
	}

	onFirstnameChange(Firstname){
		this.setState({Firstname})
	}
	onLastnameChange(Lastname){
		this.setState({Lastname})
	}
	onUsernameChange(Username){
		this.setState({Username})
	}
	onEmailChange(Email){
		this.setState({Email})
	}
	onPasswordChange(Password){
		this.setState({Password})
	}

	onSignup(e){
		e.preventDefault()
		axios.post('/api/users/signup',{
			firstname: this.state.Firstname,
			lastname: this.state.Lastname,
			username: this.state.Username,
			email: this.state.Email,
			password: this.state.Password

		})
    .then((response)=>{
	console.log(response.data)
	sessionStorage.setItem('username', response.data.user_name)
	sessionStorage.setItem('id', response.data.id)
	sessionStorage.setItem('pay_percentage', response.data.pay_percentage)
	sessionStorage.setItem('admin', response.data.admin)
	console.log(sessionStorage.getItem('username'))
	this.context.router.push('/house_select')
})
    .catch((error)=>{console.log(error)})
	}

}

Signup.contextTypes = {
	router: React.PropTypes.object
}
