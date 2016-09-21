import { GET_CHORES, ADD_CHORE } from '../actions/index'

const INITIAL_STATE=["take out trash","do dishes","walk dog"]

export default function(state = INITIAL_STATE , action) {
	console.log('inside reducer')
	// console.log(action.type)
	// console.log(action.payload)
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
