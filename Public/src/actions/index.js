import axios from 'axios'
export const ADD_POST = 'ADD_POST'
export const GET_CHORES = 'GET_CHORES'
export const ADD_CHORE = 'ADD_CHORE'
export const DELETE_CHORE = 'DELETE_CHORE'

export function addPost (postData) {

  // Post data comes in as { title: 'title', message: 'msg' }
  // Grab user_id and house_id from local storage and attach to postData object
  // So payload should be set as { postMsg: 'User input', user_id: 1, house_id:2 }
  // Post updated postData obj to the DB
  // on return, attach postData to the payload

  // Dummy data
  // postData.username = 'Lee'
  // postData.house_id = '2'

  axios.post('/api/bulletinBoard', postData)

  return {
    type: ADD_POST,
    payload: postData
  }
}

export function getChores (house_id=1){ //harcoded in house ID
  console.log("getting a chore action")
  const payload =axios.get('http://localhost:1337/api/chores/getChores', {
    params:{house_id}}) //hardcoded in localhost
  return{
    type: GET_CHORES,
    payload: payload
  }
}

export function addChore (choreData){
  console.log("adding a chore action")
  choreData.user_turn=0 //hardcoded user with user 1
  choreData.house_id=1 //hardcoded house Id of 1
  const payload= axios.post('http://localhost:1337/api/chores/postChore', choreData) //hardcoded in local host
  return{
    type: ADD_CHORE,
    payload: payload
  }
}

export function deleteChore(choreId){
  console.log("deleting a chore action")
  console.log(choreId);
  const payload= axios.delete('http://localhost:1337/api/chores/deleteChore', {
    params:{id:choreId}}) //hardcoded in local host
  return{
    type: DELETE_CHORE,
    payload: payload
  }
}
