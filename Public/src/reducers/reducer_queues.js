import {GET_QUEUE} from '../actions/index'

export default function(state ={} , action) {
  switch (action.type) {
    case GET_QUEUE:
    	// console.log("inside queue reducer")
      // return {12:'FUCKKKK'}
    	// console.log(action.payload)
      var key=action.payload.data[0].choreId
      // console.log('queue chore key'+key)
    	var tempState={}
      tempState[key]=action.payload.data
      return {...state, ...tempState}
        // return state;
      	break;
    default:
    	return state
  }
  return state
}