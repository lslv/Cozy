import { combineReducers } from 'redux'
import PostReducer from './reducer_posts'
import ChoreReducer from './reducer_chores'

const rootReducer = combineReducers({
  posts: PostReducer,
  chores: ChoreReducer
})

export default rootReducer
