import axios from 'axios'
export const ADD_POST = 'ADD_POST'
export const GET_POSTS = 'GET_POSTS'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'


export function addPost (postData) {

	const user_id = sessionStorage.getItem('id')
	const house_id = sessionStorage.getItem('house_id') || null

	const request = axios.post('/api/bulletinBoard/addPost', {
		title: postData.title,
		message: postData.message,
		house_id: house_id,
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

  // for testing purposes, get all where house_id = 1
	const house_id = sessionStorage.getItem('house_id') || null

	const query = '/api/bulletinBoard/getPosts'
	const request = axios.get(query, {
		params: {
			house_id: house_id
		}
	})
	return {
		type: GET_POSTS,
		payload: request
	}
}