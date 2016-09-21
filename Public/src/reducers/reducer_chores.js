import { GET_CHORES, ADD_CHORE, DELETE_CHORE } from '../actions/index'

const INITIAL_STATE=[{title:"take out trash", time:"every wednesday", id:1},{title:"do dishes", time:"every tuesday", id:2},{title:"walk dog", time:"everyday", id:3}]

export default function(state = INITIAL_STATE , action) {
  switch (action.type) {
    case ADD_CHORE:
      return [action.payload, ...state]
    case GET_CHORES:
      return [...state] //for the time being just do this even tho is redundant
    case DELETE_CHORE:
    	var tempState=state
    	console.log('deleting chore' +action.payload)
    	for(var i=0;i<state.length;i++)
    		if(state[i].id==action.payload){
    			console.log('found the one to delete')
    			console.log(tempState)
    			tempState.splice(i,1)
    			console.log(tempState)
    			return [...tempState]
    		}
    	break;
    default:
    	return state
  }
  return state
}
