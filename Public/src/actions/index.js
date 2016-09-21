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

export function getChores (choreData){
  //make an axios get request to the backend for a list of choses
  console.log("getting a chore action")
  return{
    type: GET_CHORES,
    payload: postChore
  }
}


export function addChore (choreData){
//make an axios post request to the backend to add a new chore
//eventually that will be the payload
console.log("adding a chore action")
  return{
    type: ADD_CHORE,
    payload: choreData
  }
}

export function deleteChore(choreId){
console.log("deleting a chore action")
  return{
    type: DELETE_CHORE,
    payload: choreId
  }
}