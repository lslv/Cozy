import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import _ from 'lodash'
const socket = io()
const user = sessionStorage.getItem('username') || 'anonymous'


export default class Chat extends Component {
	constructor(props) {
		super(props)

		this.state = { 
			message: '', 
			messageList: [],
			userWhoEntered: '',
			isTyping: false,
			noActiveChat: true,
			users: []
		}

		this.OnInputChange = this.OnInputChange.bind(this)
		this.sendMessage = this.sendMessage.bind(this)
		this.displayMessages = this.displayMessages.bind(this)
		this.typingTimeout = this.typingTimeout.bind(this)
		this.showActiveChatData = this.showActiveChatData.bind(this)
		this.formatNames = this.formatNames.bind(this)

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

	componentWillReceiveProps() {
		//change the ids of the users to the user names
		const { activeChat } = this.props.chats
		const { users } = this.props
		// console.log('users', users)
		// console.log('activeChat', activeChat)
		let usersInChat = []

		if(!_.isEmpty(activeChat)) {
			activeChat.users.forEach((person, i) => {
				usersInChat.push(users[person].user_name)
			})	
		}
		// console.log('usersInChat', usersInChat)
		this.setState({ users: usersInChat })
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

	showActiveChatData() {
		const { activeChat } = this.props.chats
		const hasActiveChat = !_.isEmpty(activeChat)
		if(hasActiveChat) {
			let currentUsers = this.formatNames(this.state.users)
			return (	
			<p>Welcome to {activeChat.room}, with {currentUsers}</p>	
			)
		} else {
			return (
			<p>Select a chat room</p>
			)
		}
	}

	formatNames(names){
	  	return names.reduce(function(prev, current, index, array){
	    if (index === 0){
	      return current;
	    }
	    else if (index === array.length - 1){
	      return prev + ' & ' + current;
	    } 
	    else {
	      return prev + ', ' + current;
	    }
	  	}, '');
 	}

	render() {
		const { activeChat } = this.props.chats
		return (
			<div className='chat'>
			 <div className='active-chat-data'>
			 	{this.showActiveChatData()}
			 </div>
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
					<Button type='submit' bsStyle='info' disabled={_.isEmpty(activeChat)}>
					<i className='fa fa-paper-plane' aria-hidden='true'></i>
					</Button>
				</form>
			</div>
		)
	}
}




