import React, { Component } from 'react'
import { Button } from 'react-bootstrap'

const socket = io()

export default class Chat extends Component {
	constructor(props) {
		super(props)

		this.state = { message: '' }

		this.OnInputChange = this.OnInputChange.bind(this)
	}

	OnInputChange(e) {
		this.setState({ message: e.target.value })
	}

	render() {
		console.log('socket', socket)
		return (
		<div className='chat-container'>
		<form className='chat-input'>
			<input type='text'
			className='chat-bar form-control'
			value={this.state.message}
			onChange={this.OnInputChange} 
			/>
			<Button type='submit' bsStyle='info'>
			<i className='fa fa-paper-plane' aria-hidden='true'></i>
			</Button>
		</form>
		</div>
		)
	}
}