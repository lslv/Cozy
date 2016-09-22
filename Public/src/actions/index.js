import axios from 'axios'

export const ADD_POST = 'ADD_POST'
export const GET_POSTS = 'GET_POSTS'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
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

  const request = axios.post('/api/bulletinBoard/addPost', {
    title: postData.title,
    message: postData.message
  })

  return {
    type: ADD_POST,
    payload: request
  }
}

export function getChores (choreData) {
  // make an axios get request to the backend for a list of choses
  console.log('getting a chore action')
  return {
    type: GET_CHORES,
    payload: postChore
  }
}

export function addChore (choreData) {
  // make an axios post request to the backend to add a new chore
  // eventually that will be the payload
  console.log('adding a chore action')
  return {
    type: ADD_CHORE,
    payload: choreData
  }
}

export function deleteChore (choreId) {
  console.log('deleting a chore action')
  return {
    type: DELETE_CHORE,
    payload: choreId
  }
}

export function updatePosts () {

  // Here, do a get request to post DB to get all posts in the house
  // use this to update the props

  // for testing purposes, get all where title = title
  // Eventually, get all where house_id matches the user's house_id

  const testQuery = '/api/bulletinBoard/getPosts'
  const request = axios.get(testQuery, {
    params: {
      title: 'title'
    }
  })
  return {
    type: GET_POSTS,
    payload: request
  }
}

export function editPost (post, updatedMessage) {
  console.log('post', post)
  console.log('updatedMessage', updatedMessage)
  const query = `/api/bulletinBoard/editPost`
  const request = axios.put(query, {
    id: post.id,
    message: post.message
  })
  return {
    type: EDIT_POST,
    payload: request
  }
}

export function deletePost (post) {
  const query = `/api/bulletinBoard/deletePost?id=${post.id}`
  const request = axios.delete(query)
  return {
    type: DELETE_POST,
    payload: post
  }
}
