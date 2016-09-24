import axios from 'axios'
export const ADD_POLL = 'ADD_POLL'
export const GET_POLLS = 'GET_POLLS'


export function addPoll(pollData) {
	console.log('pollData', pollData)

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