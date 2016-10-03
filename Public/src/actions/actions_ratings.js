import axios from 'axios'
export const ALL_RATINGS = 'all_ratings'

export function searchUser(){
	return {
		type: SEARCH_USER,
		payload: something
	}
}

export function addReview(){
	return {
		type: ADD_REVIEW,
		payload: something
	}
}

export function fetchAllRatings(){
  // url to make database call
  // let baseurl = 'api/rating'

  //return a function and it takes dispatch as an argument
	return function(dispatch){
		axios.get(baseurl).then((res)=>{
			dispatch({type: ALL_RATINGS, payload: res})//need two things for dispatch: type: ALL_RATINGS, payload: response
		}).catch((err)=>{
			console.error(err)
		})
	}
}
