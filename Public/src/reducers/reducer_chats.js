import { ADD_CHAT_ROOM, GET_USER_ROOMS } from '../actions/actions_chats'

export default function(state= [], action) {
	switch(action.type) {
		case ADD_CHAT_ROOM: {
			return [...state, action.payload.data]
		}
		case GET_USER_ROOMS: {
			return action.payload.data
		}
	}
	return state
}