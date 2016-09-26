import { ADD_POLL, GET_POLLS, DELETE_POLL } from '../actions/actions_polls'

export default function(state = [], action) {
	switch(action.type) {
	case ADD_POLL: {
		//right now only see poll on refresh
		return [...state]
	}
	case GET_POLLS: {
		let data = action.payload.data
		//always get unique polls so they doesn't duplicate on multiple calls
		let polls = data.filter((poll, i) => {
			return data.indexOf(poll) === i
		})
		//push each poll obj to array
		let allPolls = []
		for (let poll of polls) {
			allPolls.push(poll)
		}
		return allPolls
	}
	case DELETE_POLL: {
		let index = [...state].indexOf(action.payload)
		return [...state.slice(0, index), ...state.slice(index + 1)]
	}
	}
	return state
}