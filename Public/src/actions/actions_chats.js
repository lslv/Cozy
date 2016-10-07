import axios from 'axios'
export const ADD_CHAT_ROOM = 'ADD_CHAT_ROOM'
export const GET_USER_ROOMS = 'GET_USER_ROOMS'
export const UPDATE_ACTIVE_CHAT = 'UPDATE_ACTIVE_CHAT'

const user_id = sessionStorage.getItem('id')

export function createRoom(name, list) {
	console.log('name', name)
	console.log('list', list)
	//get ids from list
	let user_ids = list.map((user) => user.id)
	//include the user
	user_ids = [...user_ids, user_id]

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
	const user = sessionStorage.getItem('username')

	return {
		type: UPDATE_ACTIVE_CHAT,
		payload: room
	}
}