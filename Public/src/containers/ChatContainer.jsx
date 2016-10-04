import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUsers } from '../actions/actions_users'
import { createRoom, getUserRooms, updateActiveChat } from '../actions/actions_chats'

import ChatRoomList from '../components/ChatRoomList'
import Chat from '../containers/Chat'

class ChatContainer extends Component {
	constructor(props) {
		super(props)

		this.renderChatWhenActive = this.renderChatWhenActive.bind(this)
	}

	componentWillMount() {
		let house_id = sessionStorage.getItem('house_id')
		this.props.getUsers(house_id)
		.then(() => this.props.getUserRooms())
	}

	renderChatWhenActive() {
		const { activeChat } = this.props.chats

		if(_.isEmpty(activeChat)) {
			return (
				<div className='chat'>
					<h4>Please select a chat</h4>
				</div>
			)
		} else {
			return ( <Chat {...this.props} /> )
		}
	}

	render() {
		return (
		<div className='chat-container'>
			<ChatRoomList {...this.props} />
			{this.renderChatWhenActive()}
		</div>
		)
	}
}

function mapStateToProps({users, chats}) {
	return { users, chats }
}


export default connect(mapStateToProps, {getUsers, createRoom, getUserRooms, updateActiveChat})(ChatContainer)