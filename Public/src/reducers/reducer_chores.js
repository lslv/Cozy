import { GET_CHORES, ADD_CHORE, DELETE_CHORE, UPDATE_CHORE } from '../actions/actions_chores'

const INITIAL_STATE=[]

export default function(state = INITIAL_STATE , action) {
	switch (action.type) {
	case UPDATE_CHORE:
		console.log(action.payload)
		for(var i=0;i<state.length;i++)
			if(state[i].id==action.payload.data.id){
				return [...state.slice(0,i),action.payload.data,...state.slice(i+1)]
			}
		break
	case ADD_CHORE:
		return [action.payload.data, ...state]
	case GET_CHORES:
		return [...action.payload.data]
	case DELETE_CHORE:
		console.log(state)
		console.log(action.payload)
		for(var i=0;i<state.length;i++)
			if(state[i].id==action.payload.data.id){
				console.log(action.payload.data)
				console.log(state[i])
				return [...state.slice(0,i),...state.slice(i+1)]
			}
		break
	default:
		return state
	}
	return state
}
