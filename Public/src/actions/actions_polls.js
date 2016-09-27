import axios from 'axios'
export const ADD_POLL = 'ADD_POLL'
export const DELETE_POLL = 'DELETE_POLL'
export const GET_POLLS = 'GET_POLLS'
export const VOTE = 'VOTE'


export function addPoll(pollData) {

	// get house id from session storage
	const user_id = sessionStorage.getItem('id')
	const house_id = sessionStorage.getItem('house_id') || null


	const pollOptions = pollData.options.map(item => item.option)

	const request = axios.post('/api/bulletinBoard/addPoll', {
		question: pollData.question,
		options: pollOptions,
		user_id: user_id,
		houseId: house_id
	})
	return {
		type: ADD_POLL,
		payload: request
	}
}

export function getPolls() {

	//get house id frim

	//testing: get poll where question = 'how are you?'
	const request = axios.get('/api/bulletinBoard/getPolls', {
		params: {
			houseId: 1
		}
		
	})

	return {
		type: GET_POLLS,
		payload: request
	}

}

export function vote(choice) {
	const request = axios.post('/api/bulletinBoard/vote', {
		pollOptionId: choice
	})

	return {
		type: VOTE,
		payload: choice
	}
}

export function deletePoll(poll) {

	const request = axios.delete('/api/bulletinBoard/deletePoll', {
		params: {
			id: poll.id
		}
		
	})

	return {
		type: DELETE_POLL,
		payload: poll
	}

}