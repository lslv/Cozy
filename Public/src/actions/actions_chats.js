import axios from 'axios'
export const ADD_CHAT_ROOM = 'ADD_CHAT_ROOM'
export const GET_USER_ROOMS = 'GET_USER_ROOMS'

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