import {ALL_RATINGS} from '../actions/actions_ratings'

const INITIAL_STATE = {ratingList: []}

export default function(state=INITIAL_STATE, action){
	switch(action.type){
	case ADD_REVIEW:
		return {...state, ratingList: action.payload }
	case ALL_RATINGS:
		return {...state,ratingList: action.payload}
	default:
		return state
	}
}
