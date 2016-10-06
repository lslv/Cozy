import axios from 'axios'
export const GET_USERS ='GET_USERS'
export function getUsers(house_id){
	const payload=axios.get('/api/users/houseIdUsers', {params:{house_id}})

	return {
		type: GET_USERS,
		payload: payload
	}
}