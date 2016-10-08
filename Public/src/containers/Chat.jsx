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
			userAction: '',
			isTyping: false,
			typingUser: '',
			allMembers: [],
			activeMembers: []
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

		socket.on('joinRoom', (req) => {
			//Reset State when joining a new room
			this.setState({ 
				messageList: [], 
				userAction: `${req.user} has entered the room`,
				activeMembers: [...this.state.activeMembers, req.user] 
			})
			setTimeout(() => {
				this.setState({ userAction: ''})
			}, 3000)
		})

		socket.on('disconnect', (req) => {
			this.setState({ userAction: `${req.user} has left the room` })
			setTimeout(() => {
				this.setState({ userAction: ''})
			}, 3000)
		})

		socket.on('isTyping', (user) => {
			this.setState( { isTyping: true, typingUser: user })
			this.typingTimeout()
		})

	}

	componentWillMount() {
		//change the ids of the users to the user names
		const { activeChat } = this.props.chats
		const { users } = this.props
		let allMembers = []
		if(!_.isEmpty(activeChat)) {
			activeChat.users.forEach((person, i) => {
				allMembers.push(users[person].user_name)
			})	
			this.setState({ allMembers })
		}
		//Here, emit a join chat with room details
		socket.emit('joinRoom', {
			room: activeChat,
			user: user
		})
	}

	componentWillReceiveProps(nextProps) {
		const { activeChat } = this.props.chats
		
		//Emit that new room has been selected
		//when the active room changes
		socket.emit('joinRoom', {
			room: activeChat,
			user: user
		})
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
				this.setState({ isTyping: false, typingUser: ''})
			}, 2000)
	}

	OnInputChange(e) {
		if(!this.state.isTyping) {
			//Send msg to server that user is typing
			socket.emit('isTyping', user)
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
		return this.state.activeMembers.map((member) => {
			return (
				<div key={member}>	
					<li>{member}
					<div className='active'></div></li>
				</div>
			)		
		})
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
		const allMembers = this.formatNames(this.state.allMembers)
			return (
				<div className='chat'>
				 <div className='active-chat-data'>
				 	<p>You're in {activeChat.room}, with {allMembers}</p>
				 	<ul className='active-members'>
				 	{this.showActiveChatData()}
				 	</ul>
				 </div>
					<p>{this.state.userAction}</p>
					<div className='chat-messages'>
					<ul>{this.displayMessages()}</ul>
					</div>
					<div className='isTyping'>
					<p>{this.state.isTyping ? `${this.state.typingUser} is typing` : 'balh'}</p>
					</div>
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
