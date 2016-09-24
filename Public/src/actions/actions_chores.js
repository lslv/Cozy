import axios from 'axios'
export const GET_CHORES = 'GET_CHORES'
export const ADD_CHORE = 'ADD_CHORE'
export const DELETE_CHORE = 'DELETE_CHORE'
export const UPDATE_CHORE = 'UPDATE_CHORE'

export function addChore (choreData){
	console.log('adding a chore action', choreData)
	choreData.chore_adder='lucas' //hardcoded who 
	choreData.user_turn=0 //hardcoded user with user 0
	choreData.house_id=1 //hardcoded house Id of 1
	choreData.num_of_users=4 //hardcoded number of users to be 4, would dynamically grab from house info
	const payload= axios.post('http://localhost:1337/api/chores/postChore', choreData) //hardcoded in local host
	return{
		type: ADD_CHORE,
		payload: payload
	}
}

export function deleteChore(choreId){
	console.log('deleting a chore action')
	console.log(choreId)
	const payload= axios.delete('http://localhost:1337/api/chores/deleteChore', {
		params:{id:choreId}}) //hardcoded in local host
	return{
		type: DELETE_CHORE,
		payload: payload
	}
}

export function updateChoreTurn(choreId){
	console.log('updating chore# ' +choreId)
	const payload=axios.put('http://localhost:1337/api/chores/updateChoreTurn', {id:choreId})
	return {
		type: UPDATE_CHORE,
		payload:payload
	}
}


export function getChores (house_id=1){ //harcoded in house ID
	console.log('getting a chore action')
	const payload =axios.get('http://localhost:1337/api/chores/getChores', {
		params:{house_id}}) //hardcoded in localhost
	return{
		type: GET_CHORES,
		payload: payload
	}
}