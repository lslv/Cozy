import {GET_QUEUE} from '../actions/index'
import _ from 'lodash'

export default function(state ={} , action) {
  switch (action.type) {
    case GET_QUEUE:
    	console.log("inside queue reducer")
    	console.log(action.payload)
      var key=action.payload.data[0].choreId
      console.log('queue chore key'+key)
    	var tempState=state
      tempState[key]=action.payload.data
      	return tempState
      	break;
    default:
    	return state
  }
  return state
}