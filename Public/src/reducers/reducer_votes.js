import { VOTE, GET_VOTES } from '../actions/actions_votes'

export default function(state = [], action) {

	switch(action.type) {
		case VOTE: {
			return [...state]
		}
		case GET_VOTES: {
			return [...state].concat(action.payload.data)
		}

	}
	return state
}


