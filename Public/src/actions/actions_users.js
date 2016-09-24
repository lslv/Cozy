import axios from 'axios'
export const GET_USERS ='GET_USERS'


export function getUsers(house_id){
	console.log('getting users based on house_id ', house_id)
	const payload=axios.get('/api/users/houseIdUsers', {params:{house_id}}) //sean's endpoint

	return {
		type: GET_USERS,
		payload: payload
	}
}