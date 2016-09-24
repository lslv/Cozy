import {GET_QUEUE} from '../actions/index'

export default function(state ={} , action) {
	switch (action.type) {
	case GET_QUEUE:
		if(action.payload.data[0]){
			var key=action.payload.data[0].choreId
			var tempState={}
			tempState[key]=action.payload.data
			// console.log({...state, ...tempState})
			return {...state, ...tempState}
		}
		else
        return state
		break
	default:
		return state
	}
	return state
}