import { ADD_POST, GET_POSTS } from '../actions/index'

export default function(state = [] , action) {
  switch (action.type) {
    case ADD_POST: {
      return [action.payload, ...state]
    }
    case GET_POSTS: {
      if (action.payload) {
        console.log('action payload in get posts', action.payload)
        let allPosts = []
        for (let post of action.payload.data) {
          allPosts.push(post)
        }
        return allPosts.concat(...state)
      }
    }
  }
  return state
}
