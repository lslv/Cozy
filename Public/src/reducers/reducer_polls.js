import { ADD_POLL, GET_POLLS, DELETE_POLL } from '../actions/actions_polls'

export default function(state = [], action) {
	switch(action.type) {
	case ADD_POLL: {
		//right now only see poll on refresh
		return [...state]
	}
	case GET_POLLS: {
		let allPolls = []
		for (let poll of action.payload.data) {
			allPolls.push(poll)
		}
		return [...state].concat(allPolls)
	}
	case DELETE_POLL: {
		let index = [...state].indexOf(action.payload)
		return [...state.slice(0, index), ...state.slice(index + 1)]
	}
	}
	return state
}