import axios from 'axios'
export const GET_QUEUE = 'GET_QUEUE'


export function getQueue(choreId){
	console.log('grabbing a chore queue')
  // console.log(choreId);
	const payload= axios.get('http://localhost:1337/api/chores/getQueue', {
		params:{choreId:choreId}}) //hardcoded in local host
	return{
		type: GET_QUEUE,
		payload: payload
	}
}

export function updateQueue (choreId) {
}
