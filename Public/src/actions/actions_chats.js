import axios from 'axios'
export const ADD_CHAT_ROOM = 'ADD_CHAT_ROOM'

export function createRoom(name, list) {
	console.log('name', name)
	console.log('list', list)

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