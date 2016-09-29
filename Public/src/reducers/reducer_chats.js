import { ADD_CHAT_ROOM } from '../actions/actions_chats'

export default function(state= [], action) {
	console.log('action', action)
	switch(action.type) {
		case ADD_CHAT_ROOM: {
			return [...state, action.payload.data]
		}
	}
	return state
}