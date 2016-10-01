import { ADD_CHAT_ROOM, GET_USER_ROOMS, UPDATE_ACTIVE_CHAT } from '../actions/actions_chats'

const INITIAL_STATE = { chatList: [], activeChat: {} }

export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
		case ADD_CHAT_ROOM: {
			let temp = {}
			temp.chatList = [...state.chatList, ...action.payload.data]
			return {...state, ...temp}
			}
		case GET_USER_ROOMS: {
			let temp = {}
			temp.chatList = [...action.payload.data]
			return {...state, ...temp}
		}
		case UPDATE_ACTIVE_CHAT: {
			let temp = {}
			temp.activeChat = action.payload
			return {...state, ...temp}
		}
	}
	return state
}