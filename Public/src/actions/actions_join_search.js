import axios from 'axios'

export const GET_HOUSES = 'GET_HOUSES'
export const POST_HOUSEID = 'POST_HOUSEID'

export function getResults(searchTerm){
	const query = '/api/houses/search'
	const request = axios.get(query,{
		params: {
			search: searchTerm
		}
	})

	return{
		type: GET_HOUSES,
		payload: request
	}
}

export function postHouseId(houseId){
	const query = '/api/users/addHouseId'
	const request = axios.put(query, {
		user_id: sessionStorage.getItem('id'),
		house_id: houseId,
		admin: false
	})

	return{
		type: POST_HOUSEID,
		response: request
	}
}
