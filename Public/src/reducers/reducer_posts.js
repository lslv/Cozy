import { ADD_POST } from '../actions/index'

export default function(state = [] , action) {
  switch (action.type) {
    case ADD_POST: {
      console.log('in reducer_posts', action)
      return [action.payload, ...state]
    }
  }
  return state
}
