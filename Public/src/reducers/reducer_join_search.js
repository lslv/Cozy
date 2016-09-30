import { GET_HOUSES, POST_HOUSEID } from '../actions/actions_join_search'

export default function(state = [], action){
	switch(action.type){

	case GET_HOUSES: {
		return[...state].concat(action.payload.data)
	}
	case POST_HOUSEID: {
		return[...state].concat(action.response.data)
	}
	}
	return state
}
