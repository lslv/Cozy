import axios from 'axios'
export const ADD_POST = 'ADD_POST'
export const GET_POSTS = 'GET_POSTS'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'


export function addPost (postData) {

  // Post data comes in as { title: 'title', message: 'msg' }
  // Grab user_id and house_id from local storage and attach to postData object
  // So payload should be set as { postMsg: 'User input', user_id: 1, house_id:2 }
  // Post updated postData obj to the DB
  // on return, attach postData to the payload
  const user_id = sessionStorage.getItem('id')

  // Dummy data
  // postData.userId = 'Lee'
  // postData.house_id = '2'
	const request = axios.post('/api/bulletinBoard/addPost', {
		title: postData.title,
		message: postData.message,
		house_id: 1,
		user_id: user_id
	})
	return {
		type: ADD_POST,
		payload: request
	}
}

export function editPost (post, updatedMessage) {
	const query = '/api/bulletinBoard/editPost'
	const request = axios.put(query, {
		id: post.id,
		message: updatedMessage
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

export function getPosts () {

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