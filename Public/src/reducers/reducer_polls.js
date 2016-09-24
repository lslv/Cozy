import { ADD_POLL } from '../actions/actions_polls'

export default function(state = [], action) {
	switch(action.type) {
		case ADD_POLL: {
			return [...state, action.payload.data]
		}
	}
	return state
}