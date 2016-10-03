import axios from 'axios'
export const ADD_CHAT_ROOM = 'ADD_CHAT_ROOM'
export const GET_USER_ROOMS = 'GET_USER_ROOMS'
export const UPDATE_ACTIVE_CHAT = 'UPDATE_ACTIVE_CHAT'

export function createRoom(name, list) {
	//get ids from list
	const user_ids = list.map((user) => user.id)

	const request = axios.post('/api/chat/createRoom', {
		room_name: name,
		user_id_list: user_ids
	})

	return {
		type: ADD_CHAT_ROOM,
		payload: request
	}

}

export function getUserRooms() {

	const user_id = sessionStorage.getItem('id')

	const request = axios.get('./api/chat/getUserRooms', {
		params: {
			user_id: user_id
		}
	})
	return {
		type: GET_USER_ROOMS,
		payload: request
	}
}

export function updateActiveChat(room) {
	console.log(' active room', room)
	const user = sessionStorage.getItem('username')
	const socket = io()
	//Here, emit a join chat with room details
	socket.emit('joinRoom', {
		room: room,
		user: user
	})



	return {
		type: UPDATE_ACTIVE_CHAT,
		payload: room
	}
}