import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUsers } from '../actions/actions_users'
import { createRoom, getUserRooms } from '../actions/actions_chats'

import ChatRoomList from '../components/ChatRoomList'
import Chat from '../components/Chat'

class ChatContainer extends Component {
	constructor(props) {
		super(props)

	}

	render() {
		console.log('props', this.props)
		return (
		<div className='chat-container'>
			<ChatRoomList {...this.props} />
			<Chat />
		</div>
		)
	}
}

function mapStateToProps({users, chats}) {
	return { users, chats }
}


export default connect(mapStateToProps, {getUsers, createRoom, getUserRooms})(ChatContainer)