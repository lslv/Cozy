import axios from 'axios'
export const ADD_POST = 'ADD_POST'
export const GET_POSTS = 'GET_POSTS'
export const DELETE_POST = 'DELETE_POST'
export const GET_CHORES = 'GET_CHORES'
export const ADD_CHORE = 'ADD_CHORE'
export const DELETE_CHORE = 'DELETE_CHORE'
export const GET_QUEUE = 'GET_QUEUE'

export function addPost (postData) {

  // Post data comes in as { title: 'title', message: 'msg' }
  // Grab user_id and house_id from local storage and attach to postData object
  // So payload should be set as { postMsg: 'User input', user_id: 1, house_id:2 }
  // Post updated postData obj to the DB
  // on return, attach postData to the payload

  // Dummy data
  // postData.username = 'Lee'
  // postData.house_id = '2'
  const request = axios.post('/api/bulletinBoard/addPost', {
    title: postData.title,
    message: postData.message
  })
  return {
    type: ADD_POST,
    payload: request
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

export function getQueue(choreId){
  console.log("grabbing a chore queue")
  console.log(choreId);
  const payload= axios.get('http://localhost:1337/api/chores/getQueue', {
    params:{choreId:choreId}}) //hardcoded in local host
  return{
    type: GET_QUEUE,
    payload: payload
  }
}

export function updatePosts () {

  // Here, do a get request to post DB to get all posts in the house
  // use this to update the props

  // for testing purposes, get all where title = title
  // Eventually, get all where house_id matches the user's house_id

  const testQuery = '/api/bulletinBoard/getPosts?title=title'

  const request = axios.get(testQuery)

  return {
    type: GET_POSTS,
    payload: request
  }
}

export function deletePost (post) {
  console.log('postId', post.id)

  const query = `/api/bulletinBoard/deletePost?id=${post.id}`

  const request = axios.delete(query)
  console.log('request', request)

  return {
    type: DELETE_POST,
    payload: post
  }
}
