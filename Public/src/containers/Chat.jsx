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
			userWhoLeft: '',
			isTyping: false,
			noActiveChat: true,
			members: []
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

		socket.on('userEntered', (req) => {
			this.setState({ userWhoEntered: `${req.user} has entered the room` })
			setTimeout(() => {
				this.setState({ userWhoEntered: ''})
			}, 3000)
		})

		socket.on('userLeft', (req) => {
			this.setState({ userWhoLeft: `${req.user} has left the room` })
			setTimeout(() => {
				this.setState({ userWhoLeft: ''})
			}, 3000)
		})

	}

	componentWillReceiveProps() {
		//change the ids of the users to the user names
		const { activeChat } = this.props.chats
		const { users } = this.props
		let members = []
		if(!_.isEmpty(activeChat)) {
			activeChat.users.forEach((person, i) => {
				members.push(users[person].user_name)
			})	
		}

		this.setState({ members })
	}

	componentDidMount() {
		const { activeChat } = this.props.chats
		if(!_.isEmpty(activeChat)) {
			ReactDOM.findDOMNode(this.refs.chatbar).focus();
		}
	}

	displayMessages() {
		return this.state.messageList.map((message, i) => {
			return (
				<li key={i} className='message'>{message.user}: {message.text}</li>
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
		const userMessage = { user: user, text: this.state.message }
		socket.emit('message', userMessage)
		this.setState({ message: ''})
	}

	showActiveChatData() {
		const { activeChat } = this.props.chats
		const hasActiveChat = !_.isEmpty(activeChat)
		if(hasActiveChat) {
			let members = this.formatNames(this.state.members)
			return (	
			<p>Welcome to {activeChat.room}, with {members}</p>	
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

		if(_.isEmpty(activeChat)) {
			return (
				<div className='chat'>
					<h4>Please select a chat</h4>
				</div>
			)
		} else {
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
						<Button type='submit' bsStyle='info'>
						<i className='fa fa-paper-plane' aria-hidden='true'></i>
						</Button>
					</form>
				</div>
			)
		}
	}
}




