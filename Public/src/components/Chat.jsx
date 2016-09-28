import React, { Component } from 'react'
import { Button } from 'react-bootstrap'

const socket = io()

export default class Chat extends Component {
	constructor(props) {
		super(props)

		this.state = { 
			message: '', 
			messageList: []
		}

		this.OnInputChange = this.OnInputChange.bind(this)
		this.sendMessage = this.sendMessage.bind(this)
		this.displayMessages = this.displayMessages.bind(this)

		socket.on('message', (message) => {
			console.log('message on client', message)
			this.setState({ messageList: [...this.state.messageList, message] })
		})
	}

	displayMessages() {
		return this.state.messageList.map((message) => {
			return (
				<li>{message}</li>
			)
		})
	}

	OnInputChange(e) {
		this.setState({ message: e.target.value })
	}

	sendMessage(e) {
		e.preventDefault()
		socket.emit('message', this.state.message)
		this.setState({ message: ''})
	}

	render() {
		return (
		<div className='chat-container'>
		<ul id='chat-messages'>{this.displayMessages()}</ul>
		<form className='chat-input' onSubmit={this.sendMessage}>
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