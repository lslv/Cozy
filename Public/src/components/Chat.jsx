import React, { Component } from 'react'
import { Button } from 'react-bootstrap'

const socket = io()
const user = sessionStorage.getItem('username') || 'anonymous'

export default class Chat extends Component {
	constructor(props) {
		super(props)

		this.state = { 
			message: '', 
			messageList: [],
			user: ''
		}

		this.OnInputChange = this.OnInputChange.bind(this)
		this.sendMessage = this.sendMessage.bind(this)
		this.displayMessages = this.displayMessages.bind(this)

		socket.on('message', (message) => {
			this.setState({ messageList: [...this.state.messageList, message] })
		})

		socket.on('userEntered', () => {
			this.setState({ user: `${user} has entered the room` })
			setTimeout(() => {
				this.setState({ user: ''})
			}, 3000)

		})
	}

	displayMessages() {
		return this.state.messageList.map((message) => {
			return (
				<li key={message} className='message'>{user}: {message}</li>
			)
		})
	}

	OnInputChange(e) {
		//emit that the user is typing here 


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
		{/*This appears on a timeout when user connects to chat*/}
		<p>{this.state.user}</p>
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