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

	componentWillMount() {
		let house_id = sessionStorage.getItem('house_id')
		this.props.getUsers(house_id)
		.then(() => this.props.getUserRooms())
	}

	render() {
		return (
		<div className='chat-container'>
			<ChatRoomList {...this.props} />
			<Chat {...this.props}/>
		</div>
		)
	}
}

function mapStateToProps({users, chats}) {
	return { users, chats }
}


export default connect(mapStateToProps, {getUsers, createRoom, getUserRooms, updateActiveChat})(ChatContainer)