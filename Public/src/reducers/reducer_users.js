import {GET_USERS} from '../actions/actions_users'

export default function(state={}, action){
	switch(action.type){
	case GET_USERS:
		// console.log(action.payload.data)
		var newState={}
		action.payload.data.forEach(user=>{
			newState[user.id]=user
		})
		return {...state, ...newState}
	default:
		return state
	}
}