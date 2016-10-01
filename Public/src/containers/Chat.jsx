import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
const socket = io()
const user = sessionStorage.getItem('username') || 'anonymous'


class Chat extends Component {
	constructor(props) {
		super(props)

		this.state = { 
			message: '', 
			messageList: [],
			userWhoEntered: '',
			isTyping: false
		}

		this.OnInputChange = this.OnInputChange.bind(this)
		this.sendMessage = this.sendMessage.bind(this)
		this.displayMessages = this.displayMessages.bind(this)
		this.typingTimeout = this.typingTimeout.bind(this)

		socket.on('message', (message) => {
			this.setState({ messageList: [...this.state.messageList, message] })
		})

		socket.on('userEntered', () => {
			this.setState({ userWhoEntered: `${user} has entered the room` })
			setTimeout(() => {
				this.setState({ userWhoEntered: ''})
			}, 3000)
		})

	}

	componentDidMount() {
		ReactDOM.findDOMNode(this.refs.chatbar).focus();
	}

	displayMessages() {
		return this.state.messageList.map((message) => {
			return (
				<li key={message} className='message'>{user}: {message}</li>
			)
		})
	}

	typingTimeout () {
		setTimeout(() => {
				this.setState({ isTyping: false})
			}, 2000)
	}

	OnInputChange(e) {
		if(!this.state.isTyping) {
			this.setState({ isTyping: true })
		} 
		this.typingTimeout()

		this.setState({ message: e.target.value })
	}

	sendMessage(e) {
		e.preventDefault()
		socket.emit('message', this.state.message)
		this.setState({ message: ''})
	}

	render() {
		console.log('chat props', this.props)
		return (
			<div className='chat'>
			 <div className='active-chat-data'></div>
				<p>{this.state.userWhoEntered}</p>
				<ul id='chat-messages'>{this.displayMessages()}</ul>
				<p className='isTyping'>{this.state.isTyping ? `${user} is typing`: ''}</p>
				<form className='chat-input' onSubmit={this.sendMessage}>
					<input type='text'
					ref='chatbar'
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

function mapStateToProps({chats}) {
	return {chats}
}

export default connect(mapStateToProps)(Chat)


