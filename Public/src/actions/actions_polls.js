import axios from 'axios'
export const ADD_POLL = 'ADD_POLL'
export const GET_POLLS = 'GET_POLLS'


export function addPoll(pollData) {
	const pollOptions = pollData.options.map(item => item.option)
	const request = axios.post('/api/bulletinBoard/addPoll', {
		question: pollData.question,
		options: pollOptions
	})

	return {
		type: ADD_POLL,
		payload: request
	}
}

export function getPolls() {

	//testing: get poll where question = 'how are you?'
	const request = axios.get('/api/bulletinBoard/getPolls', {
		params: {
			question: 'How are you?'
		}
		
	})

	return {
		type: GET_POLLS,
		payload: request
	}

}