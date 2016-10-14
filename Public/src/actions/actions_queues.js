import axios from 'axios'
export const GET_QUEUE = 'GET_QUEUE'
export const GET_QUEUES = 'GET_QUEUES'


export function getQueue(choreId){
	console.log('grabbing a chore queue')
	const payload= axios.get('/api/chores/getQueue', {
		params:{choreId}}) //hardcoded in local host
	return{
		type: GET_QUEUE,
		payload: payload
	}
}
// export function getQueues(houseId=1){ //hardcoded in houseId 1
// 	console.log('grabbing a chore queue')
// 	const payload= axios.get('http://localhost:1337/api/chores/getQueues', {
// 		params:{houseId}}) //hardcoded in local host
// 	return{
// 		type: GET_QUEUES,
// 		payload: payload
// 	}
// }
