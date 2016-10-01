import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUsers } from '../actions/actions_users'
import { createRoom, getUserRooms, updateActiveChat } from '../actions/actions_chats'

import ChatRoomList from '../components/ChatRoomList'
import Chat from '../containers/Chat'

class ChatContainer extends Component {
	constructor(props) {
		super(props)

	}

	render() {
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


export default connect(mapStateToProps, {getUsers, createRoom, getUserRooms, updateActiveChat})(ChatContainer)