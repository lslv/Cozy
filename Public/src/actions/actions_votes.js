import axios from 'axios'
export const VOTE = 'VOTE'
export const GET_VOTES = 'GET_VOTES'


export function vote(choice) {
	const user_id = sessionStorage.getItem('id')
	const request = axios.post('/api/bulletinBoard/vote', {
		pollOptionId: choice,
		user_id: user_id
	})

	return {
		type: VOTE,
		payload: choice
	}
}

export function getVotes() {

	const request = axios.get('/api/bulletinBoard/getVotes')

	return {
		type: GET_VOTES,
		payload: request
	}

}