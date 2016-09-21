import { GET_CHORES, ADD_CHORE } from '../actions/index'

const INITIAL_STATE=[{title:"take out trash", time:"every wednesday"},{title:"do dishes", time:"every tuesday"},{title:"walk dog", time:"everyday"}]

export default function(state = INITIAL_STATE , action) {
  switch (action.type) {
    case ADD_CHORE:
      return [action.payload, ...state]
    case GET_CHORES:
      return [...state] //for the time being just do this even tho is redundant
    default:
    	return state
  }
  return state
}
