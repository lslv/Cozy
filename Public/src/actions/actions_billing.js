import axios from 'axios'
export const GET_BILLS = 'GET_BILLS'

export function getBills(house_id){
	const payload = axios.get('/api/billing/getBills', {params: {house_id}})

	return {
		type: GET_BILLS,
		payload: payload
	}
}
