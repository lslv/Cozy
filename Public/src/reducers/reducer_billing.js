import {GET_BILLS} from '../actions/actions_billing'

export default function (state=[], action){
	switch(action.type){
	case GET_BILLS:
		var newState = []
		action.payload.data.forEach(bill =>{
			newState.push(bill)
		})
		return {...state, ...newState}
	default:
		return state
	}
}
