import { ADD_CHAT_ROOM, GET_USER_ROOMS } from '../actions/actions_chats'

export default function(state= [], action) {
	switch(action.type) {
		case ADD_CHAT_ROOM: {
			return [...state, action.payload.data]
		}
		case GET_USER_ROOMS: {
			let data = action.payload.data
			let rooms = []

			for(let i = 0; i < data.length; i++) {
				for(let j = 0; j < data[i].length; j++) {
					rooms.push(data[i][j])
				}
			}
			return rooms
		}
	}
	return state
}