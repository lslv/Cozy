import axios from 'axios'
export const ALL_RATINGS = 'all_ratings'
export const ADD_REVIEW = 'add_review'

export function postRating(data) {
	let baseurl = 'api/ratings/rate_user'

	return axios.post(baseurl, data)
	.then( (payload) => {
		return {
			type: ADD_REVIEW,
			payload: payload
		}
	})
}

export function fetchAllRatings(username) {
  let baseurl = 'api/ratings/find_user_ratings'
  return axios.get( baseurl, { params: {username} })
    .then( (payload) => {
      return {
        type: ALL_RATINGS,
        payload: payload
      }
    })
}
