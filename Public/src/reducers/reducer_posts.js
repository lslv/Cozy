import { ADD_POST, GET_POSTS, DELETE_POST, EDIT_POST } from '../actions/actions_posts'

export default function(state = [] , action) {
	switch (action.type) {
	case ADD_POST: {
		return [action.payload.data, ...state]
	}
	case GET_POSTS: {
		if (action.payload) {
			let allPosts = []
			for (let post of action.payload.data) {
				allPosts.push(post)
			}
			return [...state].concat(allPosts)
		}
	}
	case DELETE_POST: {
		let index = [...state].indexOf(action.payload)
		return [...state.slice(0, index), ...state.slice(index + 1)]
	}
	case EDIT_POST: {
		let temp
		let index

		state.forEach((obj, i) => {
        // check if the obj in state and updated obj have the same id
			if (obj.id == action.payload.data.id) {
				temp = action.payload.data
				index = i
			}
		})
		return [...state.slice(0, index), temp, ...state.slice(index + 1)]
	}
	}
	return state
}
