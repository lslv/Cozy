import { ADD_POST, GET_POSTS, DELETE_POST } from '../actions/index'

export default function(state = [] , action) {
  switch (action.type) {
    case ADD_POST: {
      console.log('action.payload', action.payload.data)
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
  }
  return state
}
