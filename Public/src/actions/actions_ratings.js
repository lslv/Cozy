import axios from 'axios'
export const ALL_RATINGS = 'all_ratings'
export const ADD_REVIEW = 'add_review'

export function postRating(data) {
	let baseurl = 'api/ratings/rate_user'

	return axios.post(baseurl, {body: {data}})
	.then( (payload) =>
		return {
			type: ADD_REVIEW,
			payload: payload
		}
	})
}

export function fetchAllRatings(username){
  // url to make database call
  // console.log('+++line 20 actions_ratings fetchAllRatings on user_name: ' , username)

  let baseurl = 'api/ratings/find_user_ratings'

  return axios.get(baseurl,{params:{username}})
    .then((payload)=>{
      return {
        type: ALL_RATINGS,
        payload: payload
      }
    })


  //return a function and it takes dispatch as an argument
}








// return function(dispatch){
//
//     axios.get(baseurl,{params:username}).then((res)=>{
// 		dispatch({type: ALL_RATINGS, payload: res})//need two things for dispatch: type: ALL_RATINGS, payload: responses
// 	}).catch((err)=>{
// 		console.error(err)
// 	})
// }
