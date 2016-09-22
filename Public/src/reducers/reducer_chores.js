import { GET_CHORES, ADD_CHORE, DELETE_CHORE } from '../actions/index'

const INITIAL_STATE=[];

export default function(state = INITIAL_STATE , action) {
  switch (action.type) {
    case ADD_CHORE:
      return [action.payload.data, ...state]
    case GET_CHORES:
      return [...action.payload.data]
    case DELETE_CHORE:
    	var tempState=state
    	for(var i=0;i<state.length;i++)
    		if(state[i].id==action.payload.data.id){
    			tempState.splice(i,1)
    			return [...tempState]
    		}
    	break;
    default:
    	return state
  }
  return state
}
